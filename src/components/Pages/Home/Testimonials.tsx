'use client';

import React, { useState, useRef } from 'react';
import { MOCK_TESTIMONIALS } from '@/data/mockData';

export function Testimonials() {
  const [startIndex, setStartIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const totalReviews = MOCK_TESTIMONIALS.length;

  // In desktop we show 3 items, in tablet 2, mobile 1
  const visibleReviews = [
    MOCK_TESTIMONIALS[startIndex % totalReviews],
    MOCK_TESTIMONIALS[(startIndex + 1) % totalReviews],
    MOCK_TESTIMONIALS[(startIndex + 2) % totalReviews],
  ];

  const handlePrev = () => {
    setStartIndex((prev) => (prev === 0 ? totalReviews - 1 : prev - 1));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % totalReviews);
  };

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrev();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section id="testimonial" className="w-full py-10 sm:py-16 lg:py-24 bg-white font-jakarta">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 lg:mb-16">
          <h2 className="font-rubik text-2xl sm:text-3xl lg:text-[40px] font-bold text-[#131825] tracking-tight leading-tight sm:leading-snug">
            Trusted by Thousands of
            <br />
            Happy Customer
          </h2>
          <p className="mt-3 sm:mt-4 text-xs sm:text-sm md:text-base text-[#4b5563] leading-relaxed max-w-lg mx-auto font-jakarta">
            A high-performing web-based car rental system for any rent-a-car company and website
          </p>
        </div>

        {/* Testimonials Carousel Container (Responsive: 1 on Mobile, 2 on Tablet, 3 on Desktop) */}
        <div
          className="relative overflow-hidden select-none"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {visibleReviews.map((item, index) => (
              <div
                key={`${item.id}-${startIndex}-${index}`}
                className={`bg-[#c2c6cd] rounded-2xl p-6 sm:p-7 flex-col justify-between hover:shadow-lg transition-all duration-300 min-h-[220px] animate-in fade-in duration-300 ${
                  index === 0
                    ? 'flex'
                    : index === 1
                    ? 'hidden md:flex'
                    : 'hidden lg:flex'
                }`}
              >
                {/* Top: User info + Rating */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3.5 sm:gap-4">
                    {/* Avatar with initials */}
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-[#dde1e6] flex items-center justify-center flex-shrink-0 font-bold text-xs sm:text-sm text-[#131825] shadow-xs">
                      {item.avatarText}
                    </div>
                    <div>
                      <h3 className="font-rubik font-bold text-sm sm:text-base text-[#131825] leading-snug">
                        {item.name}
                      </h3>
                      <p className="text-[11px] sm:text-xs text-[#4b5563] font-jakarta">
                        {item.location}
                      </p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center gap-1.5 font-rubik font-semibold text-xs sm:text-sm text-[#131825]">
                    <span>{item.rating}</span>
                  </div>
                </div>

                {/* Review Text */}
                <p className="mt-4 sm:mt-5 text-xs sm:text-sm leading-relaxed text-[#131825] font-normal font-jakarta">
                  &ldquo;{item.review}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Carousel Controls: Pagination Dots & Navigation Arrows */}
        <div className="mt-8 sm:mt-12 lg:mt-16 flex items-center justify-between">
          {/* Pagination Indicators */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {MOCK_TESTIMONIALS.map((item, dotIndex) => {
              const isActive = startIndex % totalReviews === dotIndex;
              return (
                <button
                  key={item.id}
                  onClick={() => setStartIndex(dotIndex)}
                  aria-label={`Go to slide ${dotIndex + 1}`}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    isActive
                      ? 'w-8 sm:w-10 h-2.5 sm:h-3.5 bg-[#131825]'
                      : 'w-2.5 sm:w-3.5 h-2.5 sm:h-3.5 bg-[#cbd0d8] hover:bg-[#9ca3af]'
                  }`}
                />
              );
            })}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              type="button"
              onClick={handlePrev}
              aria-label="Previous testimonial"
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-[#131825] text-[#131825] flex items-center justify-center hover:bg-[#131825] hover:text-white active:scale-95 cursor-pointer transition-all duration-200"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
            </button>

            <button
              type="button"
              onClick={handleNext}
              aria-label="Next testimonial"
              className="w-9 h-9 sm:w-11 sm:h-11 rounded-full border-2 border-[#131825] text-[#131825] flex items-center justify-center hover:bg-[#131825] hover:text-white active:scale-95 cursor-pointer transition-all duration-200"
            >
              <svg
                className="w-4 h-4 sm:w-5 sm:h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
