'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Vehicle } from '@/lib/types';
import { Button } from '@/components/ui/button';

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    fetch('/app/api/vehicles')
      .then((res) => res.json())
      .then((data) => {
        if (!ignore && data.data) {
          setVehicles(data.data);
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
          <h1 className="text-2xl font-bold">Vehicles Catalog Scaffold</h1>
          <p className="text-sm text-muted-foreground">Connected to /app/api/vehicles</p>
        </div>
        <Link href="/">
          <Button variant="outline" size="sm">Back Home</Button>
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading fleet data...</p>
      ) : (
        <ul className="divide-y border rounded-lg">
          {vehicles.map((v) => (
            <li key={v.id} className="p-4 flex items-center justify-between">
              <div>
                <p className="font-semibold">{v.name}</p>
                <p className="text-xs text-muted-foreground">{v.category} • ${v.pricePerDay}/day • {v.seats} seats</p>
              </div>
              <Link href={`/vehicles/${v.id}`}>
                <Button size="sm" variant="secondary">View Details</Button>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
