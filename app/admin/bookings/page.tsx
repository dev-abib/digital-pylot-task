'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Booking } from '@/lib/types';
import { Button } from '@/components/ui/button';

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    fetch('/app/api/bookings')
      .then((res) => res.json())
      .then((data) => {
        if (!ignore && data.data) {
          setBookings(data.data);
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
          <h1 className="text-2xl font-bold">Bookings Manifest Scaffold</h1>
          <p className="text-sm text-muted-foreground">Connected to /app/api/bookings</p>
        </div>
        <Link href="/admin"><Button variant="outline" size="sm">Back to Dashboard</Button></Link>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading bookings...</p>
      ) : (
        <ul className="divide-y border rounded-lg">
          {bookings.map((b) => (
            <li key={b.id} className="p-3 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold">{b.bookingNumber}</span> — {b.customerName} ({b.vehicleName})
                <div className="text-muted-foreground">{b.startDate} to {b.endDate} • ${b.totalPrice}</div>
              </div>
              <span className="capitalize px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded font-semibold">{b.status}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
