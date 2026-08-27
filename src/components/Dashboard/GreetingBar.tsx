'use client';

import React, { useState } from 'react';
import { Calendar, RotateCw, ChevronUp, ChevronDown } from 'lucide-react';

interface GreetingBarProps {
  timeframe?: string;
  onTimeframeChange?: (tf: string) => void;
  isRefreshing?: boolean;
  onRefresh?: () => void;
}

export function GreetingBar({
  timeframe = '7d',
  onTimeframeChange,
  isRefreshing = false,
  onRefresh,
}: GreetingBarProps) {
  const [showDropdown, setShowDropdown] = useState(false);

  const TIMEFRAME_LABELS: Record<string, string> = {
    '7d': '01 Jan 2024 - 07 Jan 2024',
    '30d': 'Past 30 Days',
    '90d': 'Past Quarter (90 Days)',
    '2024': 'Year 2024 (YTD)',
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 font-jakarta">
      {/* Greeting Message */}
      <div className="flex items-center gap-2">
        <span className="text-xl">👋</span>
        <h1 className="text-base sm:text-lg font-bold text-gray-900">
          Hi Mike Witzel,{' '}
          <span className="font-normal text-xs sm:text-sm text-gray-500">
            here&apos;s what&apos;s happening with your store today.
          </span>
        </h1>
      </div>

      {/* Date Range & Controls */}
      <div className="flex items-center gap-2">
        {/* Date Selector Badge with Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 bg-white border border-gray-200 px-3.5 py-2 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors shadow-2xs cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-gray-400" />
            <span>{TIMEFRAME_LABELS[timeframe] || TIMEFRAME_LABELS['7d']}</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-1.5 w-52 bg-white border border-gray-200 rounded-xl shadow-xl py-1.5 z-30 font-jakarta text-xs animate-in fade-in zoom-in-95 duration-150">
              {Object.entries(TIMEFRAME_LABELS).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => {
                    onTimeframeChange?.(key);
                    setShowDropdown(false);
                  }}
                  className={`w-full text-left px-3.5 py-2 transition-colors cursor-pointer flex items-center justify-between ${
                    timeframe === key
                      ? 'bg-[#FFF4EC] text-[#FF8A00] font-bold'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <span>{label}</span>
                  {timeframe === key && <span className="w-1.5 h-1.5 rounded-full bg-[#FF8A00]" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Refresh Button */}
        <button
          type="button"
          onClick={onRefresh}
          className="w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 flex items-center justify-center transition-all shadow-2xs cursor-pointer active:scale-95"
          title="Refresh Data"
        >
          <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#FF9F43]' : ''}`} />
        </button>

        {/* Minimize / Collapse Header Button */}
        <button
          type="button"
          className="w-8 h-8 rounded-lg bg-white border border-gray-200 text-gray-600 hover:text-gray-900 hover:bg-gray-50 flex items-center justify-center transition-all shadow-2xs cursor-pointer"
          title="Collapse Panel"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
