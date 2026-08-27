import { NextResponse } from 'next/server';
import { MOCK_CARS } from '@/data/mockData';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const search = searchParams.get('search')?.toLowerCase() || '';
  const category = searchParams.get('category') || '';
  const maxPrice = searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : null;

  let filtered = MOCK_CARS;

  if (category && category !== 'All') {
    filtered = filtered.filter((c) => c.category === category);
  }

  if (search) {
    filtered = filtered.filter(
      (c) =>
        c.name.toLowerCase().includes(search) ||
        c.type.toLowerCase().includes(search) ||
        c.category.toLowerCase().includes(search)
    );
  }

  if (maxPrice) {
    filtered = filtered.filter((c) => c.price <= maxPrice);
  }

  return NextResponse.json({
    success: true,
    total: filtered.length,
    vehicles: filtered,
  });
}
