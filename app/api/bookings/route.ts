import { NextRequest, NextResponse } from 'next/server';
import { MOCK_BOOKINGS, MOCK_VEHICLES } from '@/lib/mock-data';
import { Booking } from '@/lib/types';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const status = searchParams.get('status');

  let list = [...MOCK_BOOKINGS];
  if (status && status !== 'all') {
    list = list.filter(b => b.status.toLowerCase() === status.toLowerCase());
  }

  return NextResponse.json({
    success: true,
    data: list,
    total: list.length
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { vehicleId, customerName, customerEmail, customerPhone, startDate, endDate, pickupLocation, dropoffLocation } = body;

    const vehicle = MOCK_VEHICLES.find(v => v.id === vehicleId);

    const start = new Date(startDate || Date.now());
    const end = new Date(endDate || Date.now() + 86400000 * 3);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const totalDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    const totalPrice = (vehicle?.pricePerDay || 150) * totalDays;

    const newBooking: Booking = {
      id: `bk-${Date.now()}`,
      bookingNumber: `BK-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      vehicleId: vehicleId || 'veh-001',
      vehicleName: vehicle ? vehicle.name : 'Selected Vehicle',
      vehicleCategory: vehicle ? vehicle.category : 'SUV',
      customerName,
      customerEmail,
      customerPhone,
      startDate: startDate || new Date().toISOString().split('T')[0],
      endDate: endDate || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      totalDays,
      totalPrice,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      pickupLocation: pickupLocation || 'Downtown Hub',
      dropoffLocation: dropoffLocation || 'Downtown Hub'
    };

    MOCK_BOOKINGS.unshift(newBooking);

    return NextResponse.json({
      success: true,
      data: newBooking,
      message: 'Booking created successfully'
    }, { status: 201 });
  } catch {
    return NextResponse.json({
      success: false,
      error: 'Invalid booking data payload'
    }, { status: 400 });
  }
}
