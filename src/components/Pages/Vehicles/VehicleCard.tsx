'use client';

import React from 'react';
import Image from 'next/image';
import { Users, Fuel, Gauge, Star, Heart } from 'lucide-react';
import { CarItem } from '@/data/mockData';

interface VehicleCardProps {
  car: CarItem;
  isFavorited: boolean;
  onToggleWishlist: (id: string, e: React.MouseEvent) => void;
  onRentNow: (car: CarItem) => void;
}

export function VehicleCard({
  car,
  isFavorited,
  onToggleWishlist,
  onRentNow,
}: VehicleCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-black/5 p-4 sm:p-5 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      {/* Card Header: Title & Wishlist */}
      <div>
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h3 className="font-bold text-[#1A202C] text-base sm:text-lg font-jakarta group-hover:text-[#3563E9] transition-colors truncate">
              {car.name}
            </h3>
            <span className="text-xs font-semibold text-[#90A3BF] block truncate">
              {car.type}
            </span>
          </div>

          <button
            type="button"
            onClick={(e) => onToggleWishlist(car.id, e)}
            aria-label="Add to wishlist"
            className={`p-2 rounded-full transition-all shrink-0 cursor-pointer ${
              isFavorited
                ? 'text-red-500 bg-red-50'
                : 'text-[#90A3BF] hover:text-red-500 hover:bg-gray-50'
            }`}
          >
            <Heart
              className="w-5 h-5"
              fill={isFavorited ? 'currentColor' : 'none'}
            />
          </button>
        </div>

        {/* Vehicle Image */}
        <div className="relative w-full h-36 sm:h-44 my-3 sm:my-4 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
          <Image
            src={car.image}
            alt={car.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {car.isPopular && (
            <span className="absolute top-2 left-2 bg-[#FF9F43] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
              Popular
            </span>
          )}
        </div>

        {/* Vehicle Specs Bar */}
        <div className="grid grid-cols-3 gap-1 sm:gap-2 py-2.5 sm:py-3 border-t border-b border-gray-100 text-xs text-[#596780] font-medium my-2">
          <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#90A3BF] shrink-0" />
            <span className="truncate">{car.seats} Seats</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
            <Gauge className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#90A3BF] shrink-0" />
            <span className="truncate">{car.transmission}</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5 min-w-0">
            <Fuel className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#90A3BF] shrink-0" />
            <span className="truncate">{car.fuel}</span>
          </div>
        </div>

        {/* Rating Row */}
        <div className="flex items-center gap-1.5 mt-1 text-xs text-[#596780]">
          <Star className="w-3.5 h-3.5 fill-[#FF9F43] text-[#FF9F43] shrink-0" />
          <span className="font-bold text-[#1A202C]">{car.rating.toFixed(1)}</span>
          <span className="text-[#90A3BF]">({car.reviewsCount} reviews)</span>
        </div>
      </div>

      {/* Card Footer: Price & Rent Now CTA */}
      <div className="flex items-center justify-between pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-gray-100">
        <div>
          <span className="text-base sm:text-xl font-extrabold text-[#1A202C] font-jakarta">
            ${car.price.toFixed(2)}
          </span>
          <span className="text-[11px] sm:text-xs text-[#90A3BF] font-normal"> / day</span>
        </div>

        <button
          type="button"
          onClick={() => onRentNow(car)}
          className="bg-[#3563E9] text-white px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs font-bold hover:bg-[#274ec8] active:scale-95 transition-all shadow-xs hover:shadow-md cursor-pointer"
        >
          Rent Now
        </button>
      </div>
    </div>
  );
}
