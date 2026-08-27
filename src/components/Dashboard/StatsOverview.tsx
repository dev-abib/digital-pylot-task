'use client';

import React from 'react';
import { RotateCw, TrendingUp } from 'lucide-react';

interface StatsOverviewProps {
  weeklyEarning?: number;
  growthRate?: number;
  totalSales?: string;
  purchasedGoods?: string;
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

export function StatsOverview({
  weeklyEarning = 95000.45,
  growthRate = 48,
  totalSales = '10,000+',
  purchasedGoods = '800+',
  onRefresh,
  isRefreshing = false,
}: StatsOverviewProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-5 font-jakarta">
      {/* Card 1: Weekly Earning (Spans 6 cols on lg) */}
      <div className="md:col-span-12 lg:col-span-6 bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative overflow-hidden">
        <div className="space-y-2">
          <p className="text-xs font-semibold text-[#FF9F43]">Weekly Earning</p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            ${weeklyEarning.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </h2>
          <div className="flex items-center gap-1.5 text-xs text-[#28C76F] font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>{growthRate}%</span>
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
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* Card 2: No of Total Sales (Orange Gradient, Spans 3 cols on lg) */}
      <div className="md:col-span-6 lg:col-span-3 bg-gradient-to-br from-[#FF9F43] to-[#FF8A00] rounded-2xl p-6 text-white shadow-xs flex flex-col justify-between relative overflow-hidden group">
        {/* Background Subtle Accent Pattern */}
        <div className="absolute right-0 top-0 w-32 h-32 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-white/90">No of Total Sales</p>
          <button
            type="button"
            onClick={onRefresh}
            className="w-7 h-7 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors cursor-pointer"
            title="Refresh Total Sales"
          >
            <RotateCw className={`w-3 h-3 text-white ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div className="my-3">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">{totalSales}</h2>
        </div>

        {/* Bottom Vector / Trending Visual */}
        <div className="flex items-center justify-between pt-2 border-t border-white/15">
          <span className="text-[11px] text-white/80">Active Storefront Fleet</span>
          <div className="flex items-end gap-1 h-5">
            <span className="w-1.5 h-2.5 bg-white/60 rounded-xs" />
            <span className="w-1.5 h-3.5 bg-white/80 rounded-xs" />
            <span className="w-1.5 h-5 bg-white rounded-xs" />
          </div>
        </div>
      </div>

      {/* Card 3: No of Purchased Goods (Dark Navy, Spans 3 cols on lg) */}
      <div className="md:col-span-6 lg:col-span-3 bg-[#132238] rounded-2xl p-6 text-white shadow-xs flex flex-col justify-between relative overflow-hidden group">
        {/* Background Subtle Ambient Glow */}
        <div className="absolute right-0 bottom-0 w-28 h-28 bg-[#FF9F43]/10 rounded-full blur-2xl pointer-events-none" />

        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-gray-300">No of Purchased Goods</p>
          <button
            type="button"
            onClick={onRefresh}
            className="w-7 h-7 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer"
            title="Refresh Purchased Goods"
          >
            <RotateCw className={`w-3 h-3 text-gray-300 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
        </div>

        <div className="my-3">
          <h2 className="text-3xl font-extrabold text-white tracking-tight">{purchasedGoods}</h2>
        </div>

        {/* Bottom Vector / Pouch Visual */}
        <div className="flex items-center justify-between pt-2 border-t border-white/10">
          <span className="text-[11px] text-gray-400">Inventory Items Managed</span>
          <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center text-xs">
            📦
          </div>
        </div>
      </div>
    </div>
  );
}
