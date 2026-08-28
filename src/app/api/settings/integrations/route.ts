import { NextResponse } from 'next/server';
import { sendTelegramNotification } from '@/lib/telegram';
import OpenAI from 'openai';

export async function GET() {
  const telegramToken = process.env.TELEGRAM_BOT_TOKEN || '';
  const telegramChatId = process.env.TELEGRAM_CHAT_ID || '';
  const openaiKey = process.env.OPENAI_API_KEY || '';

  const isTelegramConfigured =
    telegramToken &&
    telegramToken !== 'your_telegram_bot_token_here' &&
    telegramChatId &&
    telegramChatId !== 'your_telegram_chat_id_here' &&
    telegramToken.includes(':');

  const isOpenAiConfigured =
    openaiKey &&
    openaiKey !== 'your_openai_api_key_here' &&
    openaiKey.length > 15;

  return NextResponse.json({
    success: true,
    integrations: {
      telegram: {
        configured: !!isTelegramConfigured,
        botTokenMasked: isTelegramConfigured ? `${telegramToken.slice(0, 5)}••••••••${telegramToken.slice(-4)}` : '',
        chatId: isTelegramConfigured ? telegramChatId : '',
      },
      openai: {
        configured: !!isOpenAiConfigured,
        model: process.env.OPENAI_MODEL || 'gpt-4o',
        keyMasked: isOpenAiConfigured ? `sk-••••••••${openaiKey.slice(-4)}` : '',
      },
    },
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { action, telegramToken, telegramChatId, openaiKey } = body;

    // Test Telegram Connection / Pipeline
    if (action === 'test_telegram') {
      const token = (telegramToken || process.env.TELEGRAM_BOT_TOKEN || '').trim();
      const chatId = (telegramChatId || process.env.TELEGRAM_CHAT_ID || '').trim();

      const isReal =
        token &&
        chatId &&
        token !== 'your_telegram_bot_token_here' &&
        chatId !== 'your_telegram_chat_id_here' &&
        token.includes(':');

      if (isReal) {
        process.env.TELEGRAM_BOT_TOKEN = token;
        process.env.TELEGRAM_CHAT_ID = chatId;
      }

      const result = await sendTelegramNotification({
        customerName: 'Best Auto Operations Admin',
        customerEmail: 'admin@bestauto.co.uk',
        phone: '+44 20 7946 0912',
        carName: 'Aston Martin Vantage (Automated Test)',
        carPrice: 195,
        pickupDate: new Date().toISOString().split('T')[0],
        returnDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
        totalPrice: 585,
        source: 'storefront_booking',
        notes: 'Verification test dispatched from Admin Settings Control Panel',
      });

      return NextResponse.json({
        success: true,
        live: result.live,
        simulated: result.simulated,
        message: result.live
          ? 'Live Telegram message delivered to your connected chat!'
          : 'Telegram pipeline verified! Test lead formatted and logged to server queue (Simulation Mode).',
        result,
      });
    }

    // Test OpenAI Connection
    if (action === 'test_openai') {
      const key = (openaiKey || process.env.OPENAI_API_KEY || '').trim();

      if (!key || key === 'your_openai_api_key_here' || key.length < 15) {
        return NextResponse.json({
          success: true,
          simulated: true,
          message: 'AI Concierge domain engine active! (Enter live sk-... API key for GPT-4o live streaming).',
        });
      }

      try {
        const openai = new OpenAI({ apiKey: key });
        const testModel = (process.env.OPENAI_MODEL?.trim() || 'gpt-4o').replace(/^["']|["']$/g, '');
        const res = await openai.chat.completions.create({
          model: testModel,
          messages: [{ role: 'user', content: 'Say "OpenAI live connection verified!" in 5 words.' }],
          max_tokens: 20,
        });

        process.env.OPENAI_API_KEY = key;

        return NextResponse.json({
          success: true,
          live: true,
          reply: res.choices?.[0]?.message?.content || 'Connected',
          message: `Live OpenAI API verified! Response: "${res.choices?.[0]?.message?.content}"`,
        });
      } catch (err: any) {
        return NextResponse.json({
          success: false,
          error: err?.message || 'Failed to authenticate with OpenAI API',
        });
      }
    }

    // Save Keys into Process Runtime
    if (action === 'save_keys') {
      if (telegramToken && telegramToken !== 'your_telegram_bot_token_here') {
        process.env.TELEGRAM_BOT_TOKEN = telegramToken.trim();
      }
      if (telegramChatId && telegramChatId !== 'your_telegram_chat_id_here') {
        process.env.TELEGRAM_CHAT_ID = telegramChatId.trim();
      }
      if (openaiKey && openaiKey !== 'your_openai_api_key_here') {
        process.env.OPENAI_API_KEY = openaiKey.trim();
      }

      return NextResponse.json({
        success: true,
        message: 'Integration credentials saved into active server runtime!',
      });
    }

    return NextResponse.json({ success: false, error: 'Unknown action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
