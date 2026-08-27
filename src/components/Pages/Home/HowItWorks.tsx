'use client';

import React from 'react';

interface StepItem {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

const STEPS: StepItem[] = [
  {
    id: 1,
    title: 'Choose Location',
    description:
      'Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices, orci vitae convallis mattis.',
    icon: (
      <svg className="w-8 h-8 sm:w-9 sm:h-9 text-[#8f96a3]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
      </svg>
    ),
  },
  {
    id: 2,
    title: 'Pick-up Date',
    description:
      'Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices, orci vitae convallis mattis.',
    icon: (
      <svg className="w-8 h-8 sm:w-9 sm:h-9 text-[#8f96a3]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V10h14v10zm0-12H5V6h14v2z" />
      </svg>
    ),
  },
  {
    id: 3,
    title: 'Book your car',
    description:
      'Aliquam erat volutpat. Integer malesuada turpis id fringilla suscipit. Maecenas ultrices, orci vitae convallis mattis.',
    icon: (
      <svg className="w-8 h-8 sm:w-9 sm:h-9 text-[#8f96a3]" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.92 6.01C18.72 5.42 18.16 5 17.5 5h-11c-.66 0-1.21.42-1.42 1.01L3 12v8c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-1h12v1c0 .55.45 1 1 1h1c.55 0 1-.45 1-1v-8l-2.08-5.99zM6.85 7h10.29l1.04 3H5.81l1.04-3zM19 17H5v-4.66l.12-.34h13.77l.11.34V17z" />
        <circle cx="7.5" cy="14.5" r="1.5" />
        <circle cx="16.5" cy="14.5" r="1.5" />
      </svg>
    ),
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-work" className="w-full py-10 sm:py-16 lg:py-24 bg-white font-jakarta">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-14 lg:mb-20">
          <h2 className="font-rubik text-2xl sm:text-3xl lg:text-[40px] font-bold text-[#131825] tracking-tight leading-tight">
            How it works
          </h2>
          <p className="mt-4 text-sm sm:text-base text-[#4b5563] leading-relaxed max-w-lg mx-auto font-jakarta">
            A high-performing web-based car rental system for any rent-a-car company and website
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative">
          {/* Curved connecting line between icons on Desktop */}
          <div
            className="hidden md:block absolute top-12 left-0 right-0 h-16 pointer-events-none z-0"
            aria-hidden="true"
          >
            <svg
              className="w-full h-full"
              viewBox="0 0 1000 60"
              fill="none"
              preserveAspectRatio="none"
            >
              {/* Curve 1 (Step 1 to Step 2) */}
              <path
                d="M 210 38 C 300 45, 360 -5, 450 12"
                stroke="#8f96a3"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              {/* Curve 2 (Step 2 to Step 3) */}
              <path
                d="M 550 38 C 640 45, 700 -5, 790 12"
                stroke="#8f96a3"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 lg:gap-14 relative z-10">
            {STEPS.map((step) => (
              <div
                key={step.id}
                className="flex flex-col items-center text-center group cursor-pointer"
              >
                {/* Squircle Icon Badge */}
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-[#f0f2f5] flex items-center justify-center mb-6 shadow-xs group-hover:scale-105 group-hover:shadow-md group-hover:bg-[#e4e7ec] transition-all duration-300">
                  {step.icon}
                </div>

                {/* Step Title */}
                <h3 className="font-rubik font-bold text-lg sm:text-xl text-[#131825] mb-2.5">
                  {step.title}
                </h3>

                {/* Step Description */}
                <p className="text-xs sm:text-sm text-[#6b7280] leading-relaxed max-w-[290px] font-jakarta">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
