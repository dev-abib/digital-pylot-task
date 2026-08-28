'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { MOCK_CARS, CarItem } from '@/data/mockData';
import { BookingModal } from '@/components/Cards/BookingModal';

const TABS = ['Popular', 'Large Car', 'Small Car', 'Exclusive Car'] as const;

export function PopularDeals() {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]>('Popular');
  const [favorites, setFavorites] = useState<Record<string, boolean>>({});
  const [visibleCount, setVisibleCount] = useState<number>(8);
  const [selectedCarForBooking, setSelectedCarForBooking] = useState<CarItem | null>(null);

  // Filter cars based on selected category tab
  const filteredCars = useMemo(() => {
    if (activeTab === 'Popular') {
      return MOCK_CARS.filter((c) => c.isPopular || c.category === 'Popular');
    }
    return MOCK_CARS.filter((c) => c.category === activeTab);
  }, [activeTab]);

  // Display based on visibleCount
  const displayedCars = useMemo(() => {
    return filteredCars.slice(0, visibleCount);
  }, [filteredCars, visibleCount]);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleShowMore = () => {
    if (visibleCount >= filteredCars.length) {
      // Reset back to 8 if all are shown
      setVisibleCount(8);
    } else {
      // Load more
      setVisibleCount((prev) => prev + 4);
    }
  };

  return (
    <section id="rental-details" className="w-full py-10 sm:py-16 lg:py-24 bg-white font-jakarta">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 lg:mb-16">
          <h2 className="font-rubik text-2xl sm:text-3xl lg:text-[40px] font-bold text-[#131825] tracking-tight leading-tight">
            Most popular car rental deals
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-[#4b5563] leading-relaxed max-w-lg mx-auto font-jakarta">
            A high-performing web-based car rental system for any rent-a-car company and website
          </p>
        </div>

        {/* Categories Tab Navigation */}
        <div className="border-b border-[#e2e8f0] mb-8 sm:mb-12 overflow-x-auto no-scrollbar">
          <div className="flex sm:grid sm:grid-cols-4 min-w-[360px] sm:min-w-0 w-full">
            {TABS.map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab);
                    setVisibleCount(8);
                  }}
                  className={`flex-1 pb-3 sm:pb-4 pt-2 text-center text-xs sm:text-base cursor-pointer transition-colors relative whitespace-nowrap ${
                    isActive
                      ? 'text-[#131825] font-bold'
                      : 'text-[#8f96a3] hover:text-[#131825] font-medium'
                  }`}
                >
                  {tab}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[3px] bg-[#131825]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Cars Grid: 2 Columns on Mobile, 4 Columns on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6 lg:gap-7">
          {displayedCars.map((car) => {
            const isFav = !!favorites[car.id];
            return (
              <div
                key={car.id}
                className="relative rounded-xl sm:rounded-2xl overflow-hidden aspect-[3/4] p-3 sm:p-5 flex flex-col justify-between group shadow-xs hover:shadow-xl transition-all duration-300 bg-[#c2c6cd]"
              >
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

                  <button
                    type="button"
                    onClick={() => toggleFavorite(car.id)}
                    aria-label={`Favorite ${car.name}`}
                    className="p-1 sm:p-2 rounded-full bg-black/30 backdrop-blur-xs text-white hover:scale-110 active:scale-95 cursor-pointer transition-transform shrink-0"
                  >
                    <svg
                      className={`w-3.5 h-3.5 sm:w-5 sm:h-5 transition-colors duration-200 ${
                        isFav
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
                </div>

                {/* Card Bottom: Price + Rent Now */}
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2 sm:pt-4">
                  <div className="font-rubik text-white drop-shadow-sm">
                    <span className="font-bold text-xs sm:text-base lg:text-lg">
                      ${car.price.toFixed(2)}
                    </span>
                    <span className="text-[10px] sm:text-xs text-gray-200 font-normal">/ day</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedCarForBooking(car)}
                    className="bg-white text-[#131825] px-2.5 sm:px-5 py-1.5 sm:py-2.5 rounded-[4px] text-[11px] sm:text-xs font-bold shadow-md hover:bg-gray-100 active:scale-95 cursor-pointer transition-all border border-black/5 text-center"
                  >
                    Rent Now
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Bar: Show More Car + Total Car Count matching Figma wireframe */}
        <div className="mt-8 sm:mt-12 lg:mt-16 flex flex-col sm:flex-row items-center justify-center relative gap-3 sm:gap-4">
          <button
            type="button"
            onClick={handleShowMore}
            className="bg-white text-[#131825] px-6 sm:px-8 py-2.5 sm:py-3 rounded-[4px] text-xs sm:text-sm font-semibold shadow-sm hover:shadow hover:bg-gray-50 active:scale-95 cursor-pointer transition-all border border-black/10"
          >
            {visibleCount >= filteredCars.length ? 'Show less' : 'Show more car'}
          </button>

          <span className="sm:absolute sm:right-0 text-xs sm:text-sm font-medium text-[#6b7280]">
            120 Car
          </span>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        car={selectedCarForBooking}
        isOpen={!!selectedCarForBooking}
        onClose={() => setSelectedCarForBooking(null)}
      />
    </section>
  );
}
