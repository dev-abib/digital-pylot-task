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
      // 1. Parse all configured chat IDs (supports comma-separated list or group chat IDs)
      const targetChatIds = new Set<string>();
      chatId
        .split(',')
        .map((id) => id.trim())
        .filter(Boolean)
        .forEach((id) => targetChatIds.add(id));

      // 2. Dynamically discover any other users who sent /start to the bot via getUpdates
      try {
        const updatesRes = await fetch(`https://api.telegram.org/bot${botToken}/getUpdates?limit=50&timeout=2`);
        const updatesData = await updatesRes.json();
        if (updatesData.ok && Array.isArray(updatesData.result)) {
          updatesData.result.forEach((update: any) => {
            const updateChatId = update?.message?.chat?.id || update?.channel_post?.chat?.id;
            if (updateChatId) {
              targetChatIds.add(String(updateChatId));
            }
          });
        }
      } catch (discErr) {
        console.warn('[Telegram Bot] Subscriber discovery notice:', discErr);
      }

      console.log(`[Telegram Bot] Broadcasting live alert to ${targetChatIds.size} recipient(s)...`);

      // 3. Dispatch to all recipient chats concurrently
      const sendPromises = Array.from(targetChatIds).map(async (targetId) => {
        try {
          const res = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: targetId,
              text: message,
              parse_mode: 'Markdown',
            }),
          });
          const resData = await res.json();
          return { chatId: targetId, ok: resData.ok, error: resData.description, messageId: resData.result?.message_id };
        } catch (err: any) {
          return { chatId: targetId, ok: false, error: err?.message || String(err) };
        }
      });

      const results = await Promise.allSettled(sendPromises);
      const successful = results.filter((r) => r.status === 'fulfilled' && r.value.ok);

      if (successful.length > 0) {
        console.log(`[Telegram Bot] Successfully delivered to ${successful.length}/${targetChatIds.size} recipient(s)!`);
        return { success: true, live: true, simulated: false };
      } else {
        console.warn('[Telegram Bot Error] Failed delivering to any chat ID.');
        return { success: false, live: false, simulated: false, error: 'Failed to deliver to configured chat IDs' };
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
