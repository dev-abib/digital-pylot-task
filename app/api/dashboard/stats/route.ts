import { NextRequest, NextResponse } from 'next/server';
import { getMockDashboardStats } from '@/lib/mock-data';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const dateRange = searchParams.get('dateRange') || '7d';
  const category = searchParams.get('category') || 'All';

  const data = getMockDashboardStats(dateRange, category);

  return NextResponse.json({
    success: true,
    data,
    filters: {
      dateRange,
      category
    }
  });
}
