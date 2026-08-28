'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MOCK_TESTIMONIALS } from '@/data/mockData';

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3);
  const [isHovered, setIsHovered] = useState(false);
  const [isSwiping, setIsSwiping] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  const touchStartX = useRef<number | null>(null);
  const totalReviews = MOCK_TESTIMONIALS.length;

  // Responsive items per view detection
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1);
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2);
      } else {
        setItemsPerView(3);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, totalReviews - itemsPerView);

  // Keep currentIndex in valid range when itemsPerView changes
  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  // Gentle auto-slide (5.5 seconds) with pause-on-hover
  useEffect(() => {
    if (isHovered || isSwiping) return;

    const timer = setInterval(() => {
      handleNext();
    }, 5500);

    return () => clearInterval(timer);
  }, [isHovered, isSwiping, handleNext]);

  // Touch Swipe Handlers for Mobile & Tablet with smooth feedback
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsSwiping(true);
    touchStartX.current = e.targetTouches[0].clientX;
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const currentX = e.targetTouches[0].clientX;
    const diff = currentX - touchStartX.current;
    // Cap drag distance for smooth feel
    setDragOffset(Math.max(-80, Math.min(80, diff)));
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null) {
      if (dragOffset < -40) {
        handleNext();
      } else if (dragOffset > 40) {
        handlePrev();
      }
    }
    touchStartX.current = null;
    setDragOffset(0);
    setIsSwiping(false);
  };

  // Calculate translateX percentage
  const baseTranslate = -(currentIndex * (100 / itemsPerView));

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

        {/* Testimonials Smooth Slider Container */}
        <div
          className="relative overflow-hidden select-none py-2"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className={`flex ${isSwiping ? 'transition-none' : 'transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]'}`}
            style={{
              transform: `translateX(calc(${baseTranslate}% + ${dragOffset}px))`,
            }}
          >
            {MOCK_TESTIMONIALS.map((item, index) => {
              const isCardActive =
                index >= currentIndex && index < currentIndex + itemsPerView;

              return (
                <div
                  key={item.id}
                  style={{
                    width: `${100 / itemsPerView}%`,
                  }}
                  className="shrink-0 px-2.5 sm:px-3.5 lg:px-4"
                >
                  <div
                    className={`h-full bg-[#c2c6cd] rounded-2xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-500 min-h-[220px] sm:min-h-[240px] border border-black/5 ${
                      isCardActive
                        ? 'opacity-100 scale-100 shadow-sm hover:shadow-xl hover:-translate-y-1'
                        : 'opacity-85 scale-[0.98]'
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
                        <svg
                          className="w-4 h-4 text-amber-500 fill-amber-500"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span>{item.rating}</span>
                      </div>
                    </div>

                    {/* Review Text */}
                    <p className="mt-4 sm:mt-5 text-xs sm:text-sm leading-relaxed text-[#131825] font-normal font-jakarta">
                      {item.review.replace(/^[“"']+|[”"']+$/g, '')}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Controls: Pagination Dots & Navigation Arrows */}
        <div className="mt-8 sm:mt-12 lg:mt-16 flex items-center justify-between">
          {/* Pagination Indicators (Fixed 4 dots matching design) */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {Array.from({ length: 4 }).map((_, dotIndex) => {
              const activeDotIndex =
                maxIndex > 0
                  ? Math.min(3, Math.round((currentIndex / maxIndex) * 3))
                  : 0;
              const isActive = activeDotIndex === dotIndex;
              return (
                <button
                  key={dotIndex}
                  onClick={() => {
                    if (maxIndex > 0) {
                      const targetIndex = Math.min(maxIndex, Math.round((dotIndex / 3) * maxIndex));
                      setCurrentIndex(targetIndex);
                    }
                  }}
                  aria-label={`Go to slide ${dotIndex + 1}`}
                  className={`transition-all duration-500 rounded-full cursor-pointer ${
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
