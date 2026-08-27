import { NextRequest, NextResponse } from 'next/server';
import { filterVehicles } from '@/lib/mock-data';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const category = searchParams.get('category') || undefined;
  const search = searchParams.get('search') || undefined;
  const minPrice = searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined;
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined;
  const seats = searchParams.get('seats') ? Number(searchParams.get('seats')) : undefined;
  const transmission = searchParams.get('transmission') || undefined;
  const fuelType = searchParams.get('fuelType') || undefined;

  const result = filterVehicles({
    category,
    search,
    minPrice,
    maxPrice,
    seats,
    transmission,
    fuelType
  });

  return NextResponse.json({
    success: true,
    data: result.vehicles,
    total: result.total
  });
}
