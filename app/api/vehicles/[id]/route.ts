import { NextRequest, NextResponse } from 'next/server';
import { MOCK_VEHICLES } from '@/lib/mock-data';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const vehicle = MOCK_VEHICLES.find(v => v.id === id);

  if (!vehicle) {
    return NextResponse.json(
      { success: false, error: 'Vehicle not found' },
      { status: 404 }
    );
  }

  return NextResponse.json({
    success: true,
    data: vehicle
  });
}
