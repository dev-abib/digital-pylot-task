'use client';

import React from 'react';
import Link from 'next/link';
import { Users, Fuel, Gauge, Star, Zap, Check, ArrowRight } from 'lucide-react';
import { Vehicle } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface VehicleCardProps {
  vehicle: Vehicle;
  onBookNow?: (vehicle: Vehicle) => void;
}

export function VehicleCard({ vehicle, onBookNow }: VehicleCardProps) {
  return (
    <Card className="group overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
      {/* Image container */}
      <div className="relative h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={vehicle.imageUrl}
          alt={vehicle.name}
          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Category Badge */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge className="bg-slate-950/80 text-white backdrop-blur-md border border-white/10 text-xs font-semibold">
            {vehicle.category}
          </Badge>
          {vehicle.featured && (
            <Badge className="bg-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1">
              <Zap className="w-3 h-3 fill-slate-950" /> Featured
            </Badge>
          )}
        </div>

        {/* Rating */}
        <div className="absolute top-3 right-3 bg-slate-950/80 text-white backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-bold flex items-center gap-1 border border-white/10">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>{vehicle.rating}</span>
          <span className="text-[10px] text-slate-400">({vehicle.reviewCount})</span>
        </div>
      </div>

      <CardContent className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Title & Brand */}
          <div className="flex items-start justify-between gap-2">
            <div>
              <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                {vehicle.brand} • {vehicle.year}
              </span>
              <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white group-hover:text-amber-500 transition line-clamp-1">
                {vehicle.name}
              </h3>
            </div>
            <div className="text-right shrink-0">
              <div className="text-xl font-black text-slate-900 dark:text-white">
                ${vehicle.pricePerDay}
              </div>
              <div className="text-[10px] text-slate-400 font-medium -mt-0.5">per day</div>
            </div>
          </div>

          {/* Quick Specs Grid */}
          <div className="mt-4 grid grid-cols-3 gap-2 py-3 border-y border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-1.5">
              <Users className="w-3.5 h-3.5 text-amber-500" />
              <span>{vehicle.seats} Seats</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Gauge className="w-3.5 h-3.5 text-amber-500" />
              <span className="truncate">{vehicle.transmission}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Fuel className="w-3.5 h-3.5 text-amber-500" />
              <span className="truncate">{vehicle.fuelType}</span>
            </div>
          </div>

          {/* Features pills */}
          <div className="mt-3 flex flex-wrap gap-1.5">
            {vehicle.features.slice(0, 3).map((feat, idx) => (
              <span
                key={idx}
                className="text-[11px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center gap-1"
              >
                <Check className="w-2.5 h-2.5 text-amber-500" />
                {feat}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-5 pt-3 flex items-center gap-2">
          <Link href={`/vehicles/${vehicle.id}`} className="flex-1">
            <Button variant="outline" size="sm" className="w-full text-xs font-semibold border-slate-300 dark:border-slate-700">
              Details
            </Button>
          </Link>
          <Button
            size="sm"
            onClick={() => onBookNow?.(vehicle)}
            className="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs gap-1 shadow-sm"
          >
            <span>Book Now</span>
            <ArrowRight className="w-3 h-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
