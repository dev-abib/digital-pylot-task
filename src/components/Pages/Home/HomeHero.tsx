"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MOCK_CARS, CarItem } from "@/data/mockData";
import { BookingModal } from "@/components/Cards/BookingModal";

export function HomeHero() {
  const [selectedCarForBooking, setSelectedCarForBooking] =
    useState<CarItem | null>(null);

  // Search filter states with intelligent defaults
  const [pickupCity, setPickupCity] = useState("London");
  const [pickupDate, setPickupDate] = useState("2026-09-01");
  const [pickupTime, setPickupTime] = useState("09:00");
  const [dropoffCity, setDropoffCity] = useState("London");
  const [dropoffDate, setDropoffDate] = useState("2026-09-05");
  const [dropoffTime, setDropoffTime] = useState("09:00");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Directly open the reservation flow with the featured vehicle and search criteria
    setSelectedCarForBooking(MOCK_CARS[0]);
  };

  return (
    <section className="relative w-full font-jakarta">
      {/* Top Hero Section matching Figma Design */}
      <div className="relative w-full bg-[#cbd0d8] text-[#131825] pt-6 sm:pt-10 lg:pt-14 pb-0 lg:pb-16 overflow-hidden lg:overflow-visible">
        {/* Rectangle 23785: Hero Image extending to the right viewport edge, top: 77.17px, and bottom extending behind search bar on desktop */}
        <div
          style={{
            top: "77.17px",
            bottom: "-55px",
            borderTopLeftRadius: "63px",
          }}
          className="hidden lg:block absolute right-0 w-[50vw] xl:w-[48vw] rounded-tl-[63px] overflow-hidden bg-[#9ca3af]/40 z-0 group shadow-inner"
        >
          <Image
            src="/car_full_1.jpg"
            alt="Luxury Modern Rental Car"
            fill
            priority
            sizes="50vw"
            className="object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-[113px] min-h-0 lg:min-h-[440px]">
            {/* Left Column Text & Actions */}
            <div className="w-full lg:max-w-[560px] flex flex-col items-start z-10 shrink-0">
              <span
                style={{
                  color: "#1A202C",
                  fontFamily:
                    'var(--font-plus-jakarta-sans), "Plus Jakarta Sans", sans-serif',
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "121.2%",
                }}
                className="mb-2 sm:mb-3 block text-xs sm:text-sm"
              >
                100% Trusted Car rental platform in the UK
              </span>

              <h1
                style={{
                  color: "#1A202C",
                  fontFamily:
                    'var(--font-plus-jakarta-sans), "Plus Jakarta Sans", sans-serif',
                  fontSize: "clamp(28px, 6vw, 46px)",
                  fontStyle: "normal",
                  fontWeight: 800,
                  lineHeight: "121.2%",
                  textTransform: "uppercase",
                }}
                className="tracking-tight mb-4 sm:mb-5"
              >
                FAST AND EASY WAY TO
                <br />
                RENT A CAR
              </h1>

              <p
                style={{
                  color: "#596780",
                  fontFamily:
                    'var(--font-plus-jakarta-sans), "Plus Jakarta Sans", sans-serif',
                  fontSize: "15px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "160%",
                  letterSpacing: "-0.32px",
                }}
                className="max-w-[560px] mb-6 sm:mb-8 font-normal text-sm sm:text-base"
              >
                Our Car Rental online booking system designed to meet the
                specific needs of car rental business owners. This easy-to-use
                car rental software will let you manage.
              </p>

              {/* CTA Buttons */}
              <div className="flex items-center gap-6 sm:gap-8">
                <button
                  type="button"
                  onClick={() => setSelectedCarForBooking(MOCK_CARS[0])}
                  className="bg-white text-[#131825] px-6 sm:px-8 py-3 sm:py-3.5 rounded-[4px] font-bold text-sm sm:text-base shadow-sm hover:shadow-md hover:bg-gray-50 active:scale-95 cursor-pointer transition-all border border-black/5"
                >
                  Booking Now
                </button>

                <Link
                  href="/vehicles"
                  className="text-[#131825] font-bold text-sm sm:text-base hover:underline cursor-pointer transition-colors"
                >
                  See all cars
                </Link>
              </div>
            </div>

            {/* Right Column Mobile Image: flush to the right edge and bottom edge */}
            <div className="w-[calc(100%+1rem)] sm:w-[calc(100%+1.5rem)] -mr-4 sm:-mr-6 self-end flex justify-end relative lg:hidden mt-4">
              <div
                style={{ borderTopLeftRadius: "40px" }}
                className="relative w-full h-[220px] sm:h-[280px] rounded-tl-[40px] overflow-hidden bg-[#9ca3af]/40 shadow-inner group"
              >
                <Image
                  src="/car_full_1.jpg"
                  alt="Luxury Modern Rental Car"
                  fill
                  priority
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Down of Hero Strip: background #F6F7F9, height 145px on desktop */}
      <div className="w-full bg-[#F6F7F9] h-auto lg:h-[145px] relative flex items-center justify-center py-4 lg:py-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full -translate-y-0 lg:-translate-y-1/2 relative z-20">
          <form
            onSubmit={handleSearch}
            className="bg-[#F3F3F3] rounded-[10px] p-4 sm:p-5 lg:px-8 lg:py-4 shadow-sm border border-black/5 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-5 sm:gap-6 lg:gap-8"
          >
            {/* Pick-Up Column */}
            <div className="flex-1">
              {/* Radio Title */}
              <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#131825] mb-2.5">
                <span className="w-4 h-4 rounded-full border-2 border-[#9ca3af] bg-white flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-transparent" />
                </span>
                <span>Pick – Up</span>
              </div>

              {/* 3 Fields with Vertical Dividers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 items-center divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
                {/* Locations */}
                <div className="sm:pr-4 py-1.5 sm:py-0">
                  <span className="block font-bold text-xs text-[#131825] mb-0.5">
                    Locations
                  </span>
                  <div className="relative flex items-center">
                    <select
                      value={pickupCity}
                      onChange={e => setPickupCity(e.target.value)}
                      className="w-full text-xs text-[#8f96a3] bg-transparent focus:outline-none appearance-none cursor-pointer pr-5 font-normal"
                    >
                      <option value="">Select your city</option>
                      <option value="London">London Central</option>
                      <option value="Heathrow">Heathrow Airport</option>
                      <option value="Manchester">Manchester</option>
                      <option value="Birmingham">Birmingham</option>
                    </select>
                    <svg
                      className="w-3 h-3 text-[#8f96a3] absolute right-0 pointer-events-none"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Date (Styled dropdown matching Figma) */}
                <div className="sm:px-4 py-1.5 sm:py-0">
                  <span className="block font-bold text-xs text-[#131825] mb-0.5">
                    Date
                  </span>
                  <div className="relative flex items-center">
                    <select
                      value={pickupDate}
                      onChange={e => setPickupDate(e.target.value)}
                      className="w-full text-xs text-[#8f96a3] bg-transparent focus:outline-none appearance-none cursor-pointer pr-5 font-normal"
                    >
                      <option value="">Select your date</option>
                      <option value="2026-09-01">01 Sep 2026</option>
                      <option value="2026-09-02">02 Sep 2026</option>
                      <option value="2026-09-03">03 Sep 2026</option>
                      <option value="2026-09-05">05 Sep 2026</option>
                      <option value="2026-09-10">10 Sep 2026</option>
                    </select>
                    <svg
                      className="w-3 h-3 text-[#8f96a3] absolute right-0 pointer-events-none"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Time */}
                <div className="sm:pl-4 py-1.5 sm:py-0">
                  <span className="block font-bold text-xs text-[#131825] mb-0.5">
                    Time
                  </span>
                  <div className="relative flex items-center">
                    <select
                      value={pickupTime}
                      onChange={e => setPickupTime(e.target.value)}
                      className="w-full text-xs text-[#8f96a3] bg-transparent focus:outline-none appearance-none cursor-pointer pr-5 font-normal"
                    >
                      <option value="">Select your time</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="15:00">03:00 PM</option>
                      <option value="18:00">06:00 PM</option>
                    </select>
                    <svg
                      className="w-3 h-3 text-[#8f96a3] absolute right-0 pointer-events-none"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Drop-Off Column */}
            <div className="flex-1">
              {/* Radio Title */}
              <div className="flex items-center gap-2 font-bold text-xs sm:text-sm text-[#131825] mb-2.5">
                <span className="w-4 h-4 rounded-full border-2 border-[#9ca3af] bg-white flex items-center justify-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-transparent" />
                </span>
                <span>Drop – Off</span>
              </div>

              {/* 3 Fields with Vertical Dividers */}
              <div className="grid grid-cols-1 sm:grid-cols-3 items-center divide-y sm:divide-y-0 sm:divide-x divide-gray-200">
                {/* Locations */}
                <div className="sm:pr-4 py-1.5 sm:py-0">
                  <span className="block font-bold text-xs text-[#131825] mb-0.5">
                    Locations
                  </span>
                  <div className="relative flex items-center">
                    <select
                      value={dropoffCity}
                      onChange={e => setDropoffCity(e.target.value)}
                      className="w-full text-xs text-[#8f96a3] bg-transparent focus:outline-none appearance-none cursor-pointer pr-5 font-normal"
                    >
                      <option value="">Select your city</option>
                      <option value="London">London Central</option>
                      <option value="Heathrow">Heathrow Airport</option>
                      <option value="Manchester">Manchester</option>
                      <option value="Birmingham">Birmingham</option>
                    </select>
                    <svg
                      className="w-3 h-3 text-[#8f96a3] absolute right-0 pointer-events-none"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Date (Styled dropdown matching Figma) */}
                <div className="sm:px-4 py-1.5 sm:py-0">
                  <span className="block font-bold text-xs text-[#131825] mb-0.5">
                    Date
                  </span>
                  <div className="relative flex items-center">
                    <select
                      value={dropoffDate}
                      onChange={e => setDropoffDate(e.target.value)}
                      className="w-full text-xs text-[#8f96a3] bg-transparent focus:outline-none appearance-none cursor-pointer pr-5 font-normal"
                    >
                      <option value="">Select your date</option>
                      <option value="2026-09-02">02 Sep 2026</option>
                      <option value="2026-09-03">03 Sep 2026</option>
                      <option value="2026-09-05">05 Sep 2026</option>
                      <option value="2026-09-08">08 Sep 2026</option>
                      <option value="2026-09-12">12 Sep 2026</option>
                    </select>
                    <svg
                      className="w-3 h-3 text-[#8f96a3] absolute right-0 pointer-events-none"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>

                {/* Time */}
                <div className="sm:pl-4 py-1.5 sm:py-0">
                  <span className="block font-bold text-xs text-[#131825] mb-0.5">
                    Time
                  </span>
                  <div className="relative flex items-center">
                    <select
                      value={dropoffTime}
                      onChange={e => setDropoffTime(e.target.value)}
                      className="w-full text-xs text-[#8f96a3] bg-transparent focus:outline-none appearance-none cursor-pointer pr-5 font-normal"
                    >
                      <option value="">Select your time</option>
                      <option value="09:00">09:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="15:00">03:00 PM</option>
                      <option value="18:00">06:00 PM</option>
                    </select>
                    <svg
                      className="w-3 h-3 text-[#8f96a3] absolute right-0 pointer-events-none"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Action Button */}
            <div className="flex items-center justify-center sm:justify-end lg:self-center pt-2 lg:pt-0 w-full lg:w-auto">
              <button
                type="submit"
                className="w-full sm:w-[110px] h-[44px] px-5 rounded-[4px] bg-white text-[#1A202C] font-semibold text-base flex items-center justify-center gap-2 shadow-xs hover:bg-gray-50 active:scale-95 cursor-pointer transition-all duration-200 shrink-0 border border-black/5"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal
        car={selectedCarForBooking}
        isOpen={!!selectedCarForBooking}
        onClose={() => setSelectedCarForBooking(null)}
        initialPickupDate={pickupDate}
        initialReturnDate={dropoffDate}
        initialLocation={pickupCity ? `${pickupCity} Airport & Central Hub` : 'London Heathrow Airport (LHR)'}
      />
    </section>
  );
}
