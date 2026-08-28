import { NextResponse } from 'next/server';
import { sendTelegramNotification, LeadPayload } from '@/lib/telegram';

export interface LeadItem extends LeadPayload {
  id: string;
  createdAt: string;
  status: 'Qualified' | 'Contacted' | 'New' | 'Converted';
}

// Rich initial seed inquiries so the CRM is never empty
const SEED_LEADS: LeadItem[] = [
  {
    id: 'LEAD-9041',
    customerName: 'Alexander Hayes',
    customerEmail: 'alex.hayes@mayfairpartners.co.uk',
    phone: '+44 7700 900142',
    carName: 'Range Rover Velar R-Dynamic',
    carPrice: 120,
    pickupDate: '2026-09-02',
    returnDate: '2026-09-06',
    totalPrice: 480,
    source: 'ai_concierge',
    notes: 'Requested London Heathrow VIP airport terminal handover and zero-excess coverage.',
    status: 'Qualified',
    createdAt: new Date(Date.now() - 1000 * 60 * 18).toISOString(), // 18 mins ago
  },
  {
    id: 'LEAD-9040',
    customerName: 'Sophia Montgomery',
    customerEmail: 'sophia.m@vanguardcap.com',
    phone: '+44 7700 900881',
    carName: 'All New Rush',
    carPrice: 72,
    pickupDate: '2026-09-10',
    returnDate: '2026-09-14',
    totalPrice: 288,
    source: 'storefront_booking',
    notes: 'Family holiday rental with GPS navigation and child safety seat.',
    status: 'Contacted',
    createdAt: new Date(Date.now() - 1000 * 60 * 65).toISOString(), // 1 hour ago
  },
  {
    id: 'LEAD-9039',
    customerName: 'Marcus Sterling',
    customerEmail: 'm.sterling@sterlingmotors.de',
    phone: '+49 1522 349102',
    carName: 'Red Toyota Executive',
    carPrice: 85,
    pickupDate: '2026-09-05',
    returnDate: '2026-09-12',
    totalPrice: 595,
    source: 'ai_concierge',
    notes: 'Interested in weekly executive corporate rate and additional driver policy.',
    status: 'Qualified',
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(), // 3 hours ago
  },
  {
    id: 'LEAD-9038',
    customerName: 'Elena Rostova',
    customerEmail: 'elena.rostova@genevawealth.ch',
    phone: '+41 78 901 2233',
    carName: 'Mercedes-Benz S-Class',
    carPrice: 150,
    pickupDate: '2026-09-15',
    returnDate: '2026-09-20',
    totalPrice: 750,
    source: 'contact_form',
    notes: 'Chauffeur service inquiry for London Fashion Week event transport.',
    status: 'Converted',
    createdAt: new Date(Date.now() - 1000 * 60 * 360).toISOString(), // 6 hours ago
  },
  {
    id: 'LEAD-9037',
    customerName: 'David Chen',
    customerEmail: 'dchen@techventures.sg',
    phone: '+65 9123 4567',
    carName: 'Tesla Model S Plaid',
    carPrice: 130,
    pickupDate: '2026-09-08',
    returnDate: '2026-09-11',
    totalPrice: 390,
    source: 'ai_concierge',
    notes: 'Inquired about Supercharging network access and cross-city charging ports.',
    status: 'New',
    createdAt: new Date(Date.now() - 1000 * 60 * 600).toISOString(), // 10 hours ago
  },
];

const IN_MEMORY_LEADS: LeadItem[] = [...SEED_LEADS];

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

    const newLead: LeadItem = {
      id: `LEAD-${Date.now().toString().slice(-4)}`,
      customerName,
      customerEmail,
      phone: body.phone || '',
      carName: body.carName || 'Selected Fleet Model',
      carPrice: body.carPrice || 0,
      pickupDate: body.pickupDate || new Date().toISOString().split('T')[0],
      returnDate: body.returnDate || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      totalPrice: body.totalPrice || 0,
      source: body.source === 'ai_concierge' ? 'ai_concierge' : 'storefront_booking',
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
      lead: newLead,
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
