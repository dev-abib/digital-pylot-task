'use client';

import React from 'react';

export const CATEGORIES = [
  'All',
  'Popular',
  'Large Car',
  'Small Car',
  'Exclusive Car',
] as const;

export const FUEL_TYPES = [
  'All',
  'Gasoline',
  'Hybrid',
  'Electric',
  'Diesel',
  'Premium Gas',
] as const;

export const TRANSMISSIONS = ['All', 'Automatic', 'Manual'] as const;

export const SEAT_OPTIONS = [
  'All',
  '2 Seats',
  '4-5 Seats',
  '7-8 Seats',
] as const;

interface VehicleFiltersProps {
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  maxPrice: number;
  onMaxPriceChange: (price: number) => void;
  selectedFuel: string;
  onSelectFuel: (fuel: string) => void;
  selectedTransmission: string;
  onSelectTransmission: (trans: string) => void;
  selectedSeatRange: string;
  onSelectSeatRange: (seats: string) => void;
}

export function VehicleFilters({
  selectedCategory,
  onSelectCategory,
  maxPrice,
  onMaxPriceChange,
  selectedFuel,
  onSelectFuel,
  selectedTransmission,
  onSelectTransmission,
  selectedSeatRange,
  onSelectSeatRange,
}: VehicleFiltersProps) {
  return (
    <div className="space-y-6 font-jakarta text-xs">
      {/* Category Section */}
      <div>
        <h4 className="text-xs font-bold text-[#90A3BF] uppercase tracking-wider mb-3">
          Type / Category
        </h4>
        <div className="space-y-2">
          {CATEGORIES.map((cat) => (
            <label
              key={cat}
              className="flex items-center gap-2.5 cursor-pointer text-gray-700 hover:text-gray-900 font-medium select-none"
            >
              <input
                type="radio"
                name="category"
                checked={selectedCategory === cat}
                onChange={() => onSelectCategory(cat)}
                className="w-4 h-4 text-[#3563E9] focus:ring-[#3563E9] accent-[#3563E9]"
              />
              <span>{cat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Max Price Slider */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h4 className="text-xs font-bold text-[#90A3BF] uppercase tracking-wider">
            Max Daily Rate
          </h4>
          <span className="font-bold text-[#1A202C] text-xs">${maxPrice}.00</span>
        </div>
        <input
          type="range"
          min="50"
          max="550"
          step="10"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
          className="w-full accent-[#3563E9] cursor-pointer"
        />
        <div className="flex justify-between text-[11px] text-[#90A3BF] mt-1">
          <span>$50</span>
          <span>$550+</span>
        </div>
      </div>

      {/* Transmission Type */}
      <div>
        <h4 className="text-xs font-bold text-[#90A3BF] uppercase tracking-wider mb-3">
          Transmission
        </h4>
        <div className="space-y-2">
          {TRANSMISSIONS.map((trans) => (
            <label
              key={trans}
              className="flex items-center gap-2.5 cursor-pointer text-gray-700 hover:text-gray-900 font-medium select-none"
            >
              <input
                type="radio"
                name="transmission"
                checked={selectedTransmission === trans}
                onChange={() => onSelectTransmission(trans)}
                className="w-4 h-4 text-[#3563E9] focus:ring-[#3563E9] accent-[#3563E9]"
              />
              <span>{trans}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Capacity / Seats */}
      <div>
        <h4 className="text-xs font-bold text-[#90A3BF] uppercase tracking-wider mb-3">
          Seating Capacity
        </h4>
        <div className="space-y-2">
          {SEAT_OPTIONS.map((seats) => (
            <label
              key={seats}
              className="flex items-center gap-2.5 cursor-pointer text-gray-700 hover:text-gray-900 font-medium select-none"
            >
              <input
                type="radio"
                name="seats"
                checked={selectedSeatRange === seats}
                onChange={() => onSelectSeatRange(seats)}
                className="w-4 h-4 text-[#3563E9] focus:ring-[#3563E9] accent-[#3563E9]"
              />
              <span>{seats}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Fuel Type */}
      <div>
        <h4 className="text-xs font-bold text-[#90A3BF] uppercase tracking-wider mb-3">
          Fuel &amp; Powertrain
        </h4>
        <div className="space-y-2">
          {FUEL_TYPES.map((fuel) => (
            <label
              key={fuel}
              className="flex items-center gap-2.5 cursor-pointer text-gray-700 hover:text-gray-900 font-medium select-none"
            >
              <input
                type="radio"
                name="fuel"
                checked={selectedFuel === fuel}
                onChange={() => onSelectFuel(fuel)}
                className="w-4 h-4 text-[#3563E9] focus:ring-[#3563E9] accent-[#3563E9]"
              />
              <span>{fuel}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
