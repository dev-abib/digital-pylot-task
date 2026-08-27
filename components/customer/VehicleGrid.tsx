'use client';

import React from 'react';
import { Vehicle } from '@/lib/types';
import { VehicleCard } from './VehicleCard';
import { Car } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface VehicleGridProps {
  vehicles: Vehicle[];
  isLoading?: boolean;
  onBookNow?: (vehicle: Vehicle) => void;
  onResetFilters?: () => void;
}

export function VehicleGrid({ vehicles, isLoading, onBookNow, onResetFilters }: VehicleGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-8">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div
            key={n}
            className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 space-y-4 animate-pulse"
          >
            <div className="h-48 bg-slate-100 dark:bg-slate-800 rounded-xl" />
            <div className="space-y-2">
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/3" />
              <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
            </div>
            <div className="h-10 bg-slate-100 dark:bg-slate-800 rounded-lg" />
          </div>
        ))}
      </div>
    );
  }

  if (vehicles.length === 0) {
    return (
      <div className="text-center py-16 px-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm my-6">
        <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mx-auto mb-3">
          <Car className="w-6 h-6" />
        </div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white">No vehicles found</h3>
        <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
          We couldn&apos;t find any vehicles matching your selected criteria. Try adjusting your filters or price threshold.
        </p>
        {onResetFilters && (
          <Button
            onClick={onResetFilters}
            variant="outline"
            size="sm"
            className="mt-4 text-xs font-semibold"
          >
            Reset Filters
          </Button>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {vehicles.map((vehicle) => (
        <VehicleCard
          key={vehicle.id}
          vehicle={vehicle}
          onBookNow={onBookNow}
        />
      ))}
    </div>
  );
}
