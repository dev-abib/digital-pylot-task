import { NextResponse } from 'next/server';
import { sendTelegramNotification } from '@/lib/telegram';

export async function POST(req: Request) {
  try {
    const result = await sendTelegramNotification({
      customerName: 'Test Booking Operator',
      customerEmail: 'admin@bestauto.co.uk',
      phone: '+44 7700 900123',
      carName: 'Mercedes S-Class (Test Notification)',
      carPrice: 120,
      pickupDate: new Date().toISOString().split('T')[0],
      returnDate: new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      totalPrice: 360,
      source: 'storefront_booking',
      notes: 'Automated test dispatch from Best Auto Admin Control Panel',
    });

    return NextResponse.json({
      success: result.success,
      details: result,
      env: {
        hasToken: !!process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_BOT_TOKEN !== 'your_telegram_bot_token_here',
        hasChatId: !!process.env.TELEGRAM_CHAT_ID && process.env.TELEGRAM_CHAT_ID !== 'your_telegram_chat_id_here',
      },
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
