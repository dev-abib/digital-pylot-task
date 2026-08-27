import { NextResponse } from 'next/server';

const IN_MEMORY_BOOKINGS = [
  {
    id: 'BK-1099',
    customerName: 'Mike Witzel',
    carName: 'Range Rover Velar',
    pickupDate: '2026-09-01',
    returnDate: '2026-09-05',
    status: 'Confirmed',
    totalPrice: 1040.0,
    paymentMethod: 'Paypal',
    createdAt: '2026-08-27T10:30:00Z',
  },
  {
    id: 'BK-1098',
    customerName: 'Sarah Jenkins',
    carName: 'Mercedes S-Class',
    pickupDate: '2026-09-03',
    returnDate: '2026-09-07',
    status: 'Confirmed',
    totalPrice: 480.0,
    paymentMethod: 'Apple Pay',
    createdAt: '2026-08-27T12:45:00Z',
  },
  {
    id: 'BK-1097',
    customerName: 'David Zhang',
    carName: 'Aston Martin Vantage',
    pickupDate: '2026-09-02',
    returnDate: '2026-09-04',
    status: 'Pending',
    totalPrice: 390.0,
    paymentMethod: 'Stripe',
    createdAt: '2026-08-27T14:15:00Z',
  },
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get('status');

  let list = IN_MEMORY_BOOKINGS;
  if (status && status !== 'all') {
    list = list.filter((b) => b.status.toLowerCase() === status.toLowerCase());
  }

  return NextResponse.json({
    success: true,
    count: list.length,
    bookings: list,
  });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const newBooking = {
      id: `BK-${Date.now().toString().slice(-4)}`,
      customerName: body.customerName || 'Valued Guest',
      carName: body.carName,
      pickupDate: body.pickupDate,
      returnDate: body.returnDate,
      status: 'Confirmed',
      totalPrice: body.totalPrice || 0,
      paymentMethod: body.paymentMethod || 'Credit Card',
      createdAt: new Date().toISOString(),
    };

    IN_MEMORY_BOOKINGS.unshift(newBooking);

    return NextResponse.json({
      success: true,
      message: 'Booking created successfully',
      booking: newBooking,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create booking' }, { status: 500 });
  }
}
