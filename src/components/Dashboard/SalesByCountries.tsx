'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CountryInfo {
  name: string;
  sales: string;
  headerBg: string;
}

const REGION_DATA: Record<string, CountryInfo> = {
  africa: {
    name: 'Africa',
    sales: '3455 Sales',
    headerBg: '#FF9F43', // Orange
  },
  usa: {
    name: 'United States',
    sales: '8740 Sales',
    headerBg: '#122E4E', // Dark Navy
  },
  brazil: {
    name: 'Brazil',
    sales: '4120 Sales',
    headerBg: '#FF9F43', // Orange
  },
  china: {
    name: 'China',
    sales: '6230 Sales',
    headerBg: '#122E4E', // Dark Navy
  },
  indonesia: {
    name: 'Indonesia',
    sales: '2980 Sales',
    headerBg: '#122E4E', // Dark Navy
  },
};

export function SalesByCountries() {
  const [timeframe, setTimeframe] = useState('This Week');
  const [showDropdown, setShowDropdown] = useState(false);
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  // Strictly appear ONLY on hover
  const activeData = hoveredCountry ? REGION_DATA[hoveredCountry] : null;

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs font-jakarta flex flex-col justify-between h-full relative select-none">
      {/* 1. Header */}
      <div className="flex items-center justify-between pb-1">
        <h3 className="text-[17px] font-bold text-[#182230] tracking-tight">Sales by Countries</h3>

        {/* Timeframe Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-[#596375] font-medium hover:bg-gray-50 cursor-pointer transition-colors shadow-2xs"
          >
            <span>{timeframe}</span>
            <ChevronDown className="w-3.5 h-3.5 text-[#64748B]" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-1.5 w-32 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-30 font-jakarta text-xs">
              {['This Week', 'This Month', 'This Year'].map((tf) => (
                <button
                  key={tf}
                  type="button"
                  onClick={() => {
                    setTimeframe(tf);
                    setShowDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-2 hover:bg-gray-50 transition-colors ${
                    timeframe === tf ? 'text-[#FF9F43] font-bold bg-[#FFF4EC]' : 'text-gray-700'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* 2. World Map Graphic Container using exact Figma SVG */}
      <div
        className="relative w-full h-[230px] flex items-center justify-center my-auto overflow-hidden"
        onMouseLeave={() => setHoveredCountry(null)}
      >
        {/* Exact Figma World Map Asset */}
        <Image
          src="/svg/file.svg"
          alt="World Map"
          width={1146}
          height={663}
          className="w-full h-full object-contain pointer-events-none select-none"
          priority
        />

        {/* Interactive Hover Hotspots over key regions */}
        {/* USA */}
        <div
          className="absolute left-[10%] top-[20%] w-[15%] h-[28%] cursor-pointer z-10"
          onMouseEnter={() => setHoveredCountry('usa')}
          onMouseLeave={() => setHoveredCountry(null)}
          title="United States"
        />

        {/* Brazil */}
        <div
          className="absolute left-[23%] top-[50%] w-[13%] h-[30%] cursor-pointer z-10"
          onMouseEnter={() => setHoveredCountry('brazil')}
          onMouseLeave={() => setHoveredCountry(null)}
          title="Brazil"
        />

        {/* Central Africa */}
        <div
          className="absolute left-[47%] top-[50%] w-[12%] h-[28%] cursor-pointer z-10"
          onMouseEnter={() => setHoveredCountry('africa')}
          onMouseLeave={() => setHoveredCountry(null)}
          title="Africa"
        />

        {/* China */}
        <div
          className="absolute left-[64%] top-[18%] w-[18%] h-[28%] cursor-pointer z-10"
          onMouseEnter={() => setHoveredCountry('china')}
          onMouseLeave={() => setHoveredCountry(null)}
          title="China"
        />

        {/* Indonesia & SE Asia */}
        <div
          className="absolute left-[70%] top-[48%] w-[16%] h-[22%] cursor-pointer z-10"
          onMouseEnter={() => setHoveredCountry('indonesia')}
          onMouseLeave={() => setHoveredCountry(null)}
          title="Indonesia"
        />

        {/* 3. Floating 2-Tone Dynamic Modal (Color matches hovered section) */}
        {activeData && (
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[172px] sm:w-[180px] rounded-2xl shadow-[0_14px_34px_rgba(0,0,0,0.14)] border border-black/5 overflow-hidden text-center z-20 bg-white transition-all duration-150 pointer-events-none animate-in fade-in zoom-in-95"
          >
            {/* Top Half: Exact color matching hovered map section */}
            <div
              className="py-2.5 px-4 flex items-center justify-center transition-colors duration-150"
              style={{ backgroundColor: activeData.headerBg }}
            >
              <span className="font-bold text-white text-[15px] tracking-wide">
                {activeData.name}
              </span>
            </div>

            {/* Bottom Half: White with Hovered Region Sales Count */}
            <div className="bg-white py-3 px-4 flex items-center justify-center">
              <span className="font-extrabold text-[#182230] text-[17px] tracking-tight">
                {activeData.sales}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* 4. Footer Growth Metric */}
      <div className="pt-2 flex items-center justify-center text-xs font-jakarta gap-1.5">
        <ChevronUp className="w-4 h-4 text-[#00B67A] stroke-[3]" />
        <span className="text-[#00B67A] font-bold text-[13px]">48%</span>
        <span className="text-[#596375] font-normal text-[13px]">increase compare to last week</span>
      </div>
    </div>
  );
}



