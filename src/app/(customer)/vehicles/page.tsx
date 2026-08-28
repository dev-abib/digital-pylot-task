'use client';

import React, { useState, useMemo } from 'react';
import { MOCK_CARS, CarItem } from '@/data/mockData';
import { VehicleCard } from '@/components/Pages/Vehicles/VehicleCard';
import { BookingModal } from '@/components/Cards/BookingModal';
import { Search, SlidersHorizontal } from 'lucide-react';

const CATEGORIES = ['All', 'Popular', 'Large Car', 'Small Car', 'Exclusive Car'] as const;

export default function VehiclesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc' | 'rating-desc'>('default');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [selectedCarForBooking, setSelectedCarForBooking] = useState<CarItem | null>(null);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredAndSortedCars = useMemo(() => {
    let result = [...MOCK_CARS];

    // Filter by Category
    if (selectedCategory !== 'All') {
      if (selectedCategory === 'Popular') {
        result = result.filter((c) => c.isPopular || c.category === 'Popular');
      } else {
        result = result.filter((c) => c.category === selectedCategory);
      }
    }

    // Filter by Search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.type.toLowerCase().includes(q) ||
          c.fuel.toLowerCase().includes(q)
      );
    }

    // Sort
    if (sortBy === 'price-asc') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating-desc') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <main className="min-h-screen bg-gray-50/50 py-10 sm:py-16 font-jakarta">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="mb-8 sm:mb-12 text-center max-w-2xl mx-auto">
          <h1 className="font-rubik text-3xl sm:text-4xl lg:text-[42px] font-bold text-[#131825] tracking-tight leading-tight">
            Explore Our Luxury Fleet
          </h1>
          <p className="mt-3 text-sm sm:text-base text-gray-500 font-normal">
            Find and book the perfect vehicle for your journey with top tier comfort and performance.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-5 shadow-xs mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by model, brand, or type..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-gray-800 focus:outline-none focus:border-[#FF9F43] transition-colors"
            />
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 no-scrollbar">
            {CATEGORIES.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#131825] text-white shadow-xs'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <SlidersHorizontal className="w-4 h-4 text-gray-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-gray-50 border border-gray-200 text-gray-700 text-xs sm:text-sm rounded-xl px-3 py-2 focus:outline-none focus:border-[#FF9F43] cursor-pointer"
            >
              <option value="default">Default Sort</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating-desc">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Vehicles Grid */}
        {filteredAndSortedCars.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
            <h3 className="text-lg font-bold text-gray-800 mb-1">No vehicles found</h3>
            <p className="text-sm text-gray-500 mb-4">Try adjusting your search criteria or filter categories.</p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
                setSortBy('default');
              }}
              className="px-4 py-2 bg-[#131825] text-white text-xs font-bold rounded-lg hover:bg-black cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-7">
            {filteredAndSortedCars.map((car) => (
              <VehicleCard
                key={car.id}
                car={car}
                isFavorite={!!favorites[car.id]}
                onToggleFavorite={toggleFavorite}
                onRentNow={(selected) => setSelectedCarForBooking(selected)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Booking Modal */}
      <BookingModal
        car={selectedCarForBooking}
        isOpen={!!selectedCarForBooking}
        onClose={() => setSelectedCarForBooking(null)}
      />
    </main>
  );
}
