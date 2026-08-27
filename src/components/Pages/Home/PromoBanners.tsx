'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MOCK_CARS, CarItem } from '@/data/mockData';
import { BookingModal } from '@/components/Cards/BookingModal';

export function PromoBanners() {
  const [selectedCar, setSelectedCar] = useState<CarItem | null>(null);

  const banner1Car = MOCK_CARS[2]; // Aston Martin Vantage
  const banner2Car = MOCK_CARS[4]; // Range Rover Sport

  return (
    <section className="w-full py-10 sm:py-16 bg-[#F3F3F3] font-jakarta flex justify-center items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col lg:flex-row items-center justify-center gap-6 sm:gap-8">
        {/* Banner Card 1 */}
        <div
          onClick={() => setSelectedCar(banner1Car)}
          className="relative w-full max-w-[640px] h-[260px] sm:h-[320px] lg:h-[360px] rounded-[10px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-black/5 bg-white flex justify-end items-center"
        >
          <Image
            src="/promo_banner_1.jpg"
            alt="Escape The Ordinary - Sports Car Rental Promo"
            fill
            sizes="(max-width: 1024px) 100vw, 640px"
            className="object-cover rounded-[10px] group-hover:scale-105 transition-transform duration-700"
          />
          {/* Interactive Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none rounded-[10px]" />
        </div>

        {/* Banner Card 2 */}
        <div
          onClick={() => setSelectedCar(banner2Car)}
          className="relative w-full max-w-[640px] h-[260px] sm:h-[320px] lg:h-[360px] rounded-[10px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-black/5 bg-white flex justify-end items-center"
        >
          <Image
            src="/promo_banner_2.jpg"
            alt="Coastal Scenic Drive - Luxury SUV Rental Promo"
            fill
            sizes="(max-width: 1024px) 100vw, 640px"
            className="object-cover rounded-[10px] group-hover:scale-105 transition-transform duration-700"
          />
          {/* Interactive Hover Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none rounded-[10px]" />
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        car={selectedCar}
        isOpen={!!selectedCar}
        onClose={() => setSelectedCar(null)}
      />
    </section>
  );
}
