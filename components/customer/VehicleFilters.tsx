'use client';

import React from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface VehicleFiltersProps {
  search: string;
  category: string;
  maxPrice: number;
  transmission: string;
  fuelType: string;
  onSearchChange: (val: string) => void;
  onCategoryChange: (val: string) => void;
  onMaxPriceChange: (val: number) => void;
  onTransmissionChange: (val: string) => void;
  onFuelTypeChange: (val: string) => void;
  onReset: () => void;
}

const categories = ['All', 'SUV', 'Electric', 'Sports', 'Luxury', 'Van', 'Sedan'];

export function VehicleFilters({
  search,
  category,
  maxPrice,
  transmission,
  fuelType,
  onSearchChange,
  onCategoryChange,
  onMaxPriceChange,
  onTransmissionChange,
  onFuelTypeChange,
  onReset
}: VehicleFiltersProps) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
          <Filter className="w-4 h-4 text-amber-500" />
          <span>Filter Fleet</span>
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={onReset}
          className="text-xs h-7 text-slate-500 hover:text-amber-500"
        >
          Reset All
        </Button>
      </div>

      {/* Search Input */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Keyword Search</label>
        <div className="relative">
          <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
          <Input
            type="text"
            placeholder="Search make or model..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8 text-xs h-9 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
          />
        </div>
      </div>

      {/* Category Pills */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Category Class</label>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => {
            const isActive = category.toLowerCase() === cat.toLowerCase();
            return (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`text-xs px-2.5 py-1 rounded-lg font-medium transition ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Max Price Range Slider */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <label className="font-semibold text-slate-700 dark:text-slate-300">Max Daily Rate</label>
          <span className="font-bold text-amber-500">${maxPrice}/day</span>
        </div>
        <input
          type="range"
          min="100"
          max="400"
          step="10"
          value={maxPrice}
          onChange={(e) => onMaxPriceChange(Number(e.target.value))}
          className="w-full accent-amber-500 cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-slate-400">
          <span>$100</span>
          <span>$400+</span>
        </div>
      </div>

      {/* Fuel Type */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Powertrain / Fuel</label>
        <select
          value={fuelType}
          onChange={(e) => onFuelTypeChange(e.target.value)}
          className="w-full h-9 text-xs px-3 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
        >
          <option value="All">All Fuel Types</option>
          <option value="Electric">Pure Electric</option>
          <option value="Hybrid">Hybrid</option>
          <option value="Gasoline">Gasoline</option>
          <option value="Diesel">Diesel</option>
        </select>
      </div>

      {/* Transmission */}
      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Transmission</label>
        <select
          value={transmission}
          onChange={(e) => onTransmissionChange(e.target.value)}
          className="w-full h-9 text-xs px-3 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
        >
          <option value="All">All Transmissions</option>
          <option value="Automatic">Automatic</option>
          <option value="Manual">Manual</option>
        </select>
      </div>
    </div>
  );
}
