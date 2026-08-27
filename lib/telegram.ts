/**
 * Telegram Bot & Webhook Notification Helper
 * Implements the automation workflow for lead and booking submissions.
 */

export interface NotificationPayload {
  leadId?: string;
  name: string;
  email: string;
  phone: string;
  vehicleName?: string;
  preferredCategory?: string;
  startDate?: string;
  endDate?: string;
  message?: string;
  source: string;
}

export async function sendLeadNotification(payload: NotificationPayload): Promise<{
  success: boolean;
  channel: 'telegram' | 'console_mock';
  message: string;
}> {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const formattedText = `
🚗 *NEW CAR RENTAL LEAD / INQUIRY*
━━━━━━━━━━━━━━━━━━━━
👤 *Customer:* ${payload.name}
📧 *Email:* ${payload.email}
📱 *Phone:* ${payload.phone}
${payload.vehicleName ? `🚘 *Vehicle:* ${payload.vehicleName}\n` : ''}${payload.preferredCategory ? `🏷️ *Category:* ${payload.preferredCategory}\n` : ''}${payload.startDate ? `📅 *Dates:* ${payload.startDate} → ${payload.endDate || 'TBD'}\n` : ''}📍 *Source:* ${payload.source}
${payload.message ? `💬 *Notes:* ${payload.message}\n` : ''}━━━━━━━━━━━━━━━━━━━━
⏰ *Received:* ${new Date().toISOString()}
`.trim();

  // If credentials exist, dispatch real telegram message
  if (botToken && chatId) {
    try {
      const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
      const res = await fetch(telegramUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: formattedText,
          parse_mode: 'Markdown'
        })
      });

      if (res.ok) {
        return {
          success: true,
          channel: 'telegram',
          message: 'Telegram notification delivered successfully'
        };
      }
    } catch (err) {
      console.error('[Automation] Telegram dispatch failed:', err);
    }
  }

  // Graceful fallback for local development & mock testing
  console.log('[Automation Notification Mock Dispatch]:\n', formattedText);
  return {
    success: true,
    channel: 'console_mock',
    message: 'Notification logged to console (configure TELEGRAM_BOT_TOKEN to send to real channel)'
  };
}
