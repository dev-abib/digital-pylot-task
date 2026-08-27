'use client';

import React from 'react';
import Image from 'next/image';

interface BestSellerItem {
  id: string;
  name: string;
  price: string;
  sales: number;
  image: string;
}

const BEST_SELLERS: BestSellerItem[] = [
  {
    id: '1',
    name: 'Range Rover',
    price: '$260',
    sales: 6547,
    image: '/car_full_1.jpg',
  },
  {
    id: '2',
    name: 'Audi S3',
    price: '$1474',
    sales: 3474,
    image: '/car_full_2.jpg',
  },
  {
    id: '3',
    name: 'Blue Nissan',
    price: '$8784',
    sales: 1478,
    image: '/car_rush.jpg',
  },
  {
    id: '4',
    name: 'Toyota Corolla',
    price: '$3240',
    sales: 987,
    image: '/why_choose_us_car.jpg',
  },
  {
    id: '5',
    name: 'Compact car',
    price: '$597',
    sales: 784,
    image: '/promo_banner_1.jpg',
  },
];

export function BestSeller() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs font-jakarta flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-50 mb-4">
        <h3 className="text-base font-bold text-gray-900">Best Seller</h3>
        <button
          type="button"
          className="text-xs font-medium text-gray-500 hover:text-gray-900 border border-gray-200 rounded-lg px-2.5 py-1 hover:bg-gray-50 transition-colors"
        >
          View All
        </button>
      </div>

      {/* List of 5 Best Sellers */}
      <div className="space-y-4">
        {BEST_SELLERS.map((car) => (
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
