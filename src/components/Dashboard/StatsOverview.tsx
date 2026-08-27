'use client';

import React from 'react';
import { RotateCw, TrendingUp } from 'lucide-react';

export function StatsOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 font-jakarta">
      {/* Card 1: Weekly Earning (Spans 6 cols on lg) */}
      <div className="md:col-span-12 lg:col-span-6 bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-[#FF9F43]">Weekly Earning</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            $95000.45
          </h2>
          <div className="flex items-center gap-1.5 text-xs text-[#28C76F] font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>48%</span>
            <span className="text-gray-500 font-normal">increase compare to last week</span>
          </div>
        </div>

        {/* Vector / Graphic Illustration */}
        <div className="relative w-28 h-24 sm:w-32 sm:h-28 shrink-0 flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            {/* Custom SVG Money Bag with Growing Chart */}
            <svg className="w-24 h-24" viewBox="0 0 100 100" fill="none">
              {/* Money Bag */}
              <path
                d="M38 35C38 35 30 45 28 65C26 80 34 88 50 88C66 88 74 80 72 65C70 45 62 35 62 35H38Z"
                fill="#28C76F"
                fillOpacity="0.2"
                stroke="#28C76F"
                strokeWidth="3.5"
              />
              <path
                d="M40 35C40 28 45 25 50 25C55 25 60 28 60 35"
                stroke="#FF9F43"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* Dollar Symbol */}
              <text
                x="50"
                y="68"
                textAnchor="middle"
                fontSize="24"
                fontWeight="bold"
                fill="#28C76F"
                fontFamily="sans-serif"
              >
                $
              </text>
              {/* Upward Chart Bars */}
              <rect x="68" y="55" width="5" height="20" rx="2.5" fill="#FF9F43" />
              <rect x="76" y="45" width="5" height="30" rx="2.5" fill="#FF9F43" />
              <rect x="84" y="32" width="5" height="43" rx="2.5" fill="#FF9F43" />
              {/* Arrow */}
              <path
                d="M66 52L88 28M88 28H76M88 28V40"
                stroke="#28C76F"
                strokeWidth="3.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Card 2: No of Total Sales (Spans 3 cols on lg) */}
      <div className="md:col-span-6 lg:col-span-3 bg-gradient-to-br from-[#FF9F43] to-[#FF8A00] text-white rounded-2xl p-6 shadow-xs relative overflow-hidden flex flex-col justify-between min-h-[140px]">
        {/* Top Refresh Icon */}
        <button
          type="button"
          className="absolute top-5 right-5 text-white/80 hover:text-white transition-colors cursor-pointer"
          title="Refresh"
        >
          <RotateCw className="w-4 h-4" />
        </button>

        {/* Big Icon */}
        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M5 9.2h3V19H5zM10.6 5h2.8v14.2h-2.8zM16.2 13h2.8v6.2h-2.8z" />
            <path d="M4 4l5.5 5 4.5-4 6 5.5" stroke="currentColor" strokeWidth="2" fill="none" />
          </svg>
        </div>

        {/* Content */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">10,000+</h3>
          <p className="text-xs text-white/85 mt-1 font-medium">No of Total Sales</p>
        </div>
      </div>

      {/* Card 3: No of Purchased Goods (Spans 3 cols on lg) */}
      <div className="md:col-span-6 lg:col-span-3 bg-[#132238] text-white rounded-2xl p-6 shadow-xs relative overflow-hidden flex flex-col justify-between min-h-[140px]">
        {/* Top Refresh Icon */}
        <button
          type="button"
          className="absolute top-5 right-5 text-white/80 hover:text-white transition-colors cursor-pointer"
          title="Refresh"
        >
          <RotateCw className="w-4 h-4" />
        </button>

        {/* Big Icon */}
        <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4">
          <svg className="w-6 h-6 text-[#FF9F43]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 01-8 0" />
          </svg>
        </div>

        {/* Content */}
        <div>
          <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight">800+</h3>
          <p className="text-xs text-gray-400 mt-1 font-medium">No of Purchased Goods</p>
        </div>
      </div>
    </div>
  );
}
