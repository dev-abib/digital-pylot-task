'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { DashboardStats } from '@/lib/types';
import { Button } from '@/components/ui/button';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    fetch('/app/api/dashboard/stats')
      .then((res) => res.json())
      .then((data) => {
        if (!ignore && data.data) {
          setStats(data.data);
        }
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <div className="border-b pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard Scaffold</h1>
          <p className="text-sm text-muted-foreground">Connected to /app/api/dashboard/stats</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/vehicles"><Button size="sm" variant="outline">Vehicles</Button></Link>
          <Link href="/admin/bookings"><Button size="sm" variant="outline">Bookings</Button></Link>
          <Link href="/admin/leads"><Button size="sm" variant="outline">Leads</Button></Link>
        </div>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading stats...</p>
      ) : stats ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 border rounded-lg">
            <div className="text-xs text-muted-foreground">Total Revenue</div>
            <div className="text-xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="text-xs text-muted-foreground">Active Bookings</div>
            <div className="text-xl font-bold">{stats.activeBookings}</div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="text-xs text-muted-foreground">Available Fleet</div>
            <div className="text-xl font-bold">{stats.availableVehicles} / {stats.totalFleetCount}</div>
          </div>
          <div className="p-4 border rounded-lg">
            <div className="text-xs text-muted-foreground">Leads Count</div>
            <div className="text-xl font-bold">{stats.newLeadsCount}</div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
