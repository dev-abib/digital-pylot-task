'use client';

import React from 'react';
import Image from 'next/image';
import { CarItem } from '@/data/mockData';

export interface VehicleCardProps {
  car: CarItem;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  onRentNow?: (car: CarItem) => void;
}

export function VehicleCard({
  car,
  isFavorite = false,
  onToggleFavorite,
  onRentNow,
}: VehicleCardProps) {
  return (
    <div className="relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[3/4] p-3 sm:p-5 flex flex-col justify-between group shadow-xs hover:shadow-xl transition-all duration-300 bg-[#c2c6cd]">
      {/* Full-bleed Car Image */}
      <Image
        src={car.image}
        alt={car.name}
        fill
        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
        className="object-cover group-hover:scale-105 transition-transform duration-500"
      />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/10 to-black/80 pointer-events-none" />

      {/* Card Header: Name + Heart Button */}
      <div className="relative z-10 flex items-start justify-between gap-1.5">
        <div className="min-w-0 flex-1">
          <h3 className="font-rubik font-bold text-xs sm:text-base lg:text-lg text-white drop-shadow-sm truncate">
            {car.name}
          </h3>
          <span className="text-[10px] sm:text-xs text-gray-200 block font-normal truncate">
            {car.type}
          </span>
        </div>

        {onToggleFavorite && (
          <button
            type="button"
            onClick={() => onToggleFavorite(car.id)}
            aria-label={`Favorite ${car.name}`}
            className="p-1 sm:p-2 rounded-full bg-black/30 backdrop-blur-xs text-white hover:scale-110 active:scale-95 cursor-pointer transition-transform shrink-0"
          >
            <svg
              className={`w-3.5 h-3.5 sm:w-5 sm:h-5 transition-colors duration-200 ${
                isFavorite
                  ? 'fill-red-500 text-red-500'
                  : 'fill-none stroke-current stroke-2'
              }`}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </button>
        )}
      </div>

      {/* Card Bottom: Price + Rent Now */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 sm:pt-4">
        <div className="font-rubik text-white drop-shadow-sm">
          <span className="font-bold text-xs sm:text-base lg:text-lg">
            ${car.price.toFixed(2)}
          </span>
          <span className="text-[10px] sm:text-xs text-gray-200 font-normal">/ day</span>
        </div>

        {onRentNow && (
          <button
            type="button"
            onClick={() => onRentNow(car)}
            className="bg-white text-[#131825] px-2.5 sm:px-5 py-1.5 sm:py-2.5 rounded-[4px] text-[11px] sm:text-xs font-bold shadow-md hover:bg-gray-100 active:scale-95 cursor-pointer transition-all border border-black/5 text-center"
          >
            Rent Now
          </button>
        )}
      </div>
    </div>
  );
}

export default VehicleCard;
