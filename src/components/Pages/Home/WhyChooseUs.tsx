import React from 'react';
import Image from 'next/image';

interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const FEATURES: FeatureItem[] = [
  {
    id: 'support',
    title: 'Customer Support',
    description: 'Extremely responsive customer support provided by the team at best car rental UK.',
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
        />
      </svg>
    ),
  },
  {
    id: 'price',
    title: 'Best Price Guarantted',
    description: 'Extremely best prices for all category people offered at the best car rental UK.',
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
        />
      </svg>
    ),
  },
  {
    id: 'location',
    title: 'Many Location',
    description: 'Extremely the best location and available near the big cities. Just visit best car rental UK.',
    icon: (
      <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  },
];

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="w-full py-10 sm:py-16 lg:py-24 bg-[#F3F3F3] font-jakarta">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14 lg:mb-20">
          <h2 className="font-rubik text-3xl sm:text-4xl lg:text-[40px] font-bold text-[#131825] tracking-tight leading-tight">
            Why choose us
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#4b5563] leading-relaxed max-w-lg mx-auto font-jakarta">
            A high-performing web-based car rental system for any rent-a-car company and website
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 lg:gap-16 items-center">
          {/* Left Media / Image Column */}
          <div className="lg:col-span-6 flex justify-center">
            <div className="relative w-full aspect-square max-w-[500px] rounded-[10px] overflow-hidden shadow-sm bg-[#cbd0d8] group border border-black/5">
              <Image
                src="/why_choose_us_car.jpg"
                alt="Luxury Car Rental"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 500px"
                className="object-cover rounded-[10px] group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-40 pointer-events-none rounded-[10px]" />
            </div>
          </div>

          {/* Right Features List Column */}
          <div className="lg:col-span-6 flex flex-col space-y-4 sm:space-y-8">
            {FEATURES.map((feature) => (
              <div
                key={feature.id}
                className="flex items-start gap-5 p-3 sm:p-4 rounded-[10px] hover:bg-white/80 transition-colors duration-200 cursor-pointer"
              >
                {/* Feature Icon Badge */}
                <div className="w-12 h-12 rounded-[10px] bg-[#c2c6cd] flex items-center justify-center shrink-0 shadow-xs transition-transform duration-200 group-hover:scale-105">
                  {feature.icon}
                </div>

                {/* Feature Text */}
                <div className="flex-1">
                  <h3 className="font-rubik font-bold text-lg sm:text-xl text-[#131825] leading-snug">
                    {feature.title}
                  </h3>
                  <p className="mt-1.5 text-sm sm:text-base text-[#4b5563] leading-relaxed font-jakarta">
                    {feature.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
