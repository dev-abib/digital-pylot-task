/**
 * Telegram Notification Automation Utility
 * Dispatches real-time booking and lead qualification alerts to a configured Telegram channel/bot.
 */

export interface LeadPayload {
  customerName: string;
  customerEmail: string;
  phone?: string;
  carName?: string;
  carPrice?: number;
  pickupDate?: string;
  returnDate?: string;
  totalPrice?: number;
  source: 'storefront_booking' | 'ai_concierge' | 'auth_signup' | 'contact_form' | 'pos_walkin';
  notes?: string;
}

export async function sendTelegramNotification(
  payload: LeadPayload
): Promise<{ success: boolean; simulated?: boolean; live?: boolean; error?: string; messageId?: number }> {
  let botToken = (process.env.TELEGRAM_BOT_TOKEN || '').trim().replace(/^["']|["']$/g, '');
  let chatId = (process.env.TELEGRAM_CHAT_ID || '').trim().replace(/^["']|["']$/g, '');

  const formattedDate = new Date().toLocaleString('en-GB', { timeZone: 'UTC' });

  // Rich formatted reservation ticket
  const message = `
🚗 *NEW LUXURY RENTAL RESERVATION*
━━━━━━━━━━━━━━━━━━━━
👤 *Customer:* ${payload.customerName || 'Valued Guest'}
📧 *Email:* ${payload.customerEmail || 'N/A'}
${payload.phone ? `📞 *Phone:* ${payload.phone}\n` : ''}
🚘 *Vehicle:* ${payload.carName || 'General Inquiry'}
${payload.carPrice ? `💵 *Daily Rate:* $${payload.carPrice}/day\n` : ''}
${payload.pickupDate ? `📅 *Pick-up Date:* ${payload.pickupDate}\n` : ''}
${payload.returnDate ? `📅 *Return Date:* ${payload.returnDate}\n` : ''}
${payload.totalPrice ? `💰 *Total Estimated:* $${payload.totalPrice.toFixed(2)}\n` : ''}
🏷 *Channel Source:* \`${payload.source}\`
${payload.notes ? `📝 *Notes:* _${payload.notes}_\n` : ''}
⏱ *Timestamp:* ${formattedDate} UTC
━━━━━━━━━━━━━━━━━━━━
⚡ _Automated Lead & Dispatch Pipeline by Best Auto_
  `.trim();

  // Validate if real Telegram bot credentials are provided
  const isRealBotConfigured =
    botToken &&
    chatId &&
    botToken !== 'your_telegram_bot_token_here' &&
    chatId !== 'your_telegram_chat_id_here' &&
    botToken.includes(':');

  if (isRealBotConfigured) {
    try {
      console.log(`[Telegram Bot] Sending live alert to chat ${chatId}...`);
      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: 'Markdown',
        }),
      });

      const data = await response.json();
      if (data.ok) {
        console.log(`[Telegram Bot] Live message delivered successfully! ID: ${data.result?.message_id}`);
        return { success: true, live: true, simulated: false, messageId: data.result?.message_id };
      } else {
        console.warn('[Telegram Bot API Error]:', data.description);
        return { success: false, live: false, simulated: false, error: data.description };
      }
    } catch (err: any) {
      console.error('[Telegram Bot Network Error]:', err?.message || err);
      return { success: false, live: false, simulated: false, error: String(err) };
    }
  }

  // Development Fallback Simulator (When no real Telegram bot is connected)
  console.log('--------------------------------------------------');
  console.log('🤖 [SIMULATED TELEGRAM AUTOMATION PIPELINE]');
  console.log(message);
  console.log('--------------------------------------------------');

  return {
    success: true,
    simulated: true,
    live: false,
  };
}
