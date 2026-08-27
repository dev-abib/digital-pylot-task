'use client';

import React, { useState } from 'react';
import { ChevronDown, TrendingUp } from 'lucide-react';

export function SalesByCountries() {
  const [timeframe, setTimeframe] = useState('This Week');

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs font-jakarta flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-2 mb-2">
        <h3 className="text-base font-bold text-gray-900">Sales by Countries</h3>
        <div className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-600 font-medium hover:bg-gray-50 cursor-pointer transition-colors shadow-2xs">
          <span>{timeframe}</span>
          <ChevronDown className="w-3 h-3 text-gray-400" />
        </div>
      </div>

      {/* World Map Vector Graphic */}
      <div className="relative w-full h-[180px] sm:h-[200px] flex items-center justify-center my-2">
        <svg viewBox="0 0 500 240" className="w-full h-full object-contain">
          {/* North America */}
          <path
            d="M50 40 Q70 30 110 35 Q140 45 130 80 Q100 95 80 110 Q50 90 40 60 Z"
            fill="#1E293B"
            className="hover:fill-[#334155] transition-colors cursor-pointer"
          />
          {/* South America */}
          <path
            d="M100 120 Q120 130 130 160 Q120 200 105 210 Q90 170 95 130 Z"
            fill="#E2E8F0"
            className="hover:fill-[#CBD5E1] transition-colors cursor-pointer"
          />
          {/* Europe */}
          <path
            d="M210 40 Q240 35 250 55 Q230 75 210 70 Z"
            fill="#E2E8F0"
            className="hover:fill-[#CBD5E1] transition-colors cursor-pointer"
          />
          {/* Africa (Highlighted in Orange) */}
          <path
            d="M200 80 Q250 80 260 120 Q240 170 215 180 Q190 130 195 90 Z"
            fill="#FF9F43"
            className="hover:fill-[#F28C28] transition-colors cursor-pointer"
          />
          {/* Asia / Russia */}
          <path
            d="M260 35 Q340 30 420 50 Q430 100 370 110 Q300 90 270 70 Z"
            fill="#1E293B"
            className="hover:fill-[#334155] transition-colors cursor-pointer"
          />
          {/* Australia / Indonesia Islands */}
          <path
            d="M370 140 Q410 140 420 170 Q390 190 365 170 Z"
            fill="#1E293B"
            className="hover:fill-[#334155] transition-colors cursor-pointer"
          />
          <circle cx="330" cy="130" r="4" fill="#1E293B" />
          <circle cx="345" cy="138" r="3" fill="#1E293B" />
          <circle cx="360" cy="134" r="5" fill="#1E293B" />
        </svg>

        {/* Floating Tooltip over Africa */}
        <div className="absolute top-8 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg border border-gray-100 px-4 py-2 flex flex-col items-center pointer-events-none z-10 animate-in fade-in zoom-in-95 duration-200">
          <div className="bg-[#FF9F43] text-white text-[11px] font-bold px-3 py-0.5 rounded-md w-full text-center mb-1">
            Africa
          </div>
          <div className="text-xs font-extrabold text-gray-900">
            3455 Sales
          </div>
          {/* Little triangle arrow down */}
          <div className="w-2.5 h-2.5 bg-white border-b border-r border-gray-100 transform rotate-45 -mb-2 mt-0.5" />
        </div>
      </div>

      {/* Footer Stat */}
      <div className="pt-3 border-t border-gray-50 flex items-center gap-1.5 text-xs text-[#28C76F] font-semibold">
        <TrendingUp className="w-3.5 h-3.5" />
        <span>48%</span>
        <span className="text-gray-500 font-normal">increase compare to last week</span>
      </div>
    </div>
  );
}
