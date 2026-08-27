'use client';

import React, { useState } from 'react';
import Image from 'next/image';

export interface BestSellerItem {
  id: string;
  name: string;
  price: string;
  sales: number;
  image: string;
}

const ALL_BEST_SELLERS: BestSellerItem[] = [
  { id: '1', name: 'Range Rover', price: '$260', sales: 6547, image: '/car_full_1.jpg' },
  { id: '2', name: 'Audi S3', price: '$1474', sales: 3474, image: '/car_full_2.jpg' },
  { id: '3', name: 'Blue Nissan', price: '$8784', sales: 1478, image: '/car_rush.jpg' },
  { id: '4', name: 'Toyota Corolla', price: '$3240', sales: 987, image: '/why_choose_us_car.jpg' },
  { id: '5', name: 'Compact car', price: '$597', sales: 784, image: '/promo_banner_1.jpg' },
  { id: '6', name: 'Mercedes AMG C63', price: '$420', sales: 692, image: '/car_full_2.jpg' },
  { id: '7', name: 'BMW M4 Competition', price: '$510', sales: 580, image: '/car_full_1.jpg' },
];

export function BestSeller() {
  const [showAll, setShowAll] = useState(false);

  const displayedList = showAll ? ALL_BEST_SELLERS : ALL_BEST_SELLERS.slice(0, 5);

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs font-jakarta flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-50 mb-4">
        <h3 className="text-base font-bold text-gray-900">Best Seller</h3>
        <button
          type="button"
          onClick={() => setShowAll(!showAll)}
          className="text-xs font-semibold text-[#FF8A00] hover:text-[#FF9F43] border border-[#FFE6D4] bg-[#FFF4EC] rounded-lg px-2.5 py-1 transition-all cursor-pointer"
        >
          {showAll ? 'Show Top 5' : 'View All'}
        </button>
      </div>

      {/* List of Best Sellers */}
      <div className="space-y-4">
        {displayedList.map((car) => (
          <div key={car.id} className="flex items-center justify-between group">
            {/* Left: Car Thumbnail + Name + Price */}
            <div className="flex items-center gap-3">
              <div className="relative w-12 h-10 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                <Image
                  src={car.image}
                  alt={car.name}
                  fill
                  sizes="48px"
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-900 leading-snug group-hover:text-[#FF9F43] transition-colors">
                  {car.name}
                </p>
                <p className="text-[11px] text-gray-400 font-medium">{car.price}</p>
              </div>
            </div>

            {/* Right: Sales Count */}
            <div className="text-right">
              <p className="text-[10px] text-gray-400 font-medium">Sales</p>
              <p className="text-xs font-bold text-gray-800">{car.sales}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
