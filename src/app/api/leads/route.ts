import { NextResponse } from 'next/server';
import { sendTelegramNotification, LeadPayload } from '@/lib/telegram';

// In-memory store for development/demo inquiries
const IN_MEMORY_LEADS: (LeadPayload & { id: string; createdAt: string; status: string })[] = [];

export async function GET() {
  return NextResponse.json({
    success: true,
    count: IN_MEMORY_LEADS.length,
    leads: IN_MEMORY_LEADS,
  });
}

export async function POST(req: Request) {
  try {
    let body: any = {};
    try {
      body = await req.json();
    } catch {
      body = {};
    }

    const customerName = body.customerName || 'Valued Guest';
    const customerEmail = body.customerEmail || 'guest@bestauto.com';

    const newLead = {
      id: `LEAD-${Date.now()}`,
      customerName,
      customerEmail,
      phone: body.phone || '',
      carName: body.carName || '',
      carPrice: body.carPrice || 0,
      pickupDate: body.pickupDate || '',
      returnDate: body.returnDate || '',
      totalPrice: body.totalPrice || 0,
      source: body.source || 'storefront_booking',
      notes: body.notes || '',
      status: 'Qualified',
      createdAt: new Date().toISOString(),
    };

    IN_MEMORY_LEADS.unshift(newLead);

    // Trigger Telegram automation pipeline
    const telegramResult = await sendTelegramNotification(newLead);

    return NextResponse.json({
      success: true,
      message: 'Lead registered and automated notification dispatched',
      leadId: newLead.id,
      automation: telegramResult,
    });
  } catch (error) {
    console.error('Lead processing error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
