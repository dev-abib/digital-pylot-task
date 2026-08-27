'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Vehicle } from '@/lib/types';
import { Button } from '@/components/ui/button';

export default function VehicleDetailPage() {
  const params = useParams();
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    if (params?.id) {
      fetch(`/app/api/vehicles/${params.id}`)
        .then((res) => res.json())
        .then((data) => {
          if (!ignore && data.data) {
            setVehicle(data.data);
          }
        })
        .finally(() => {
          if (!ignore) setLoading(false);
        });
    }
    return () => {
      ignore = true;
    };
  }, [params?.id]);

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <Link href="/vehicles">
        <Button variant="ghost" size="sm">← Back to Vehicles</Button>
      </Link>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading vehicle...</p>
      ) : vehicle ? (
        <div className="border rounded-xl p-6 space-y-4">
          <h1 className="text-2xl font-bold">{vehicle.name}</h1>
          <p className="text-sm text-muted-foreground">{vehicle.description}</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div><span className="font-semibold">Category:</span> {vehicle.category}</div>
            <div><span className="font-semibold">Price:</span> ${vehicle.pricePerDay}/day</div>
            <div><span className="font-semibold">Transmission:</span> {vehicle.transmission}</div>
            <div><span className="font-semibold">Fuel:</span> {vehicle.fuelType}</div>
          </div>
        </div>
      ) : (
        <p className="text-sm text-red-500">Vehicle not found.</p>
      )}
    </div>
  );
}
