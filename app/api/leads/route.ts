import { NextRequest, NextResponse } from 'next/server';
import { MOCK_LEADS } from '@/lib/mock-data';
import { Lead } from '@/lib/types';
import { sendLeadNotification } from '@/lib/telegram';

export async function GET() {
  return NextResponse.json({
    success: true,
    data: MOCK_LEADS,
    total: MOCK_LEADS.length
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, preferredCategory, targetVehicleId, targetVehicleName, startDate, endDate, message, source } = body;

    if (!name || (!email && !phone)) {
      return NextResponse.json(
        { success: false, error: 'Name and either email or phone are required.' },
        { status: 400 }
      );
    }

    const newLead: Lead = {
      id: `lead-${Date.now()}`,
      name,
      email: email || '',
      phone: phone || '',
      preferredCategory,
      targetVehicleId,
      targetVehicleName,
      startDate,
      endDate,
      message,
      source: source || 'website_form',
      status: 'new',
      createdAt: new Date().toISOString()
    };

    // Store in mock leads array
    MOCK_LEADS.unshift(newLead);

    // Trigger Automation Workflow (Telegram bot dispatch / logging webhook)
    const notificationResult = await sendLeadNotification({
      leadId: newLead.id,
      name: newLead.name,
      email: newLead.email,
      phone: newLead.phone,
      vehicleName: newLead.targetVehicleName,
      preferredCategory: newLead.preferredCategory,
      startDate: newLead.startDate,
      endDate: newLead.endDate,
      message: newLead.message,
      source: newLead.source
    });

    return NextResponse.json({
      success: true,
      data: newLead,
      automation: {
        channel: notificationResult.channel,
        status: notificationResult.success ? 'dispatched' : 'failed',
        message: notificationResult.message
      }
    }, { status: 201 });
  } catch {
    return NextResponse.json({
      success: false,
      error: 'Failed to process lead submission'
    }, { status: 500 });
  }
}
