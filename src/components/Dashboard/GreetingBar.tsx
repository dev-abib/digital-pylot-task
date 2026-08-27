'use client';

import React, { useState } from 'react';
import { Calendar, RotateCw, ChevronUp } from 'lucide-react';

export function GreetingBar() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
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
        {/* Date Selector Badge */}
        <div className="flex items-center gap-2 bg-white border border-gray-200 px-3.5 py-2 rounded-lg text-xs font-medium text-gray-700 shadow-2xs">
          <Calendar className="w-3.5 h-3.5 text-gray-400" />
          <span>01 Jan 2024 - 07 Jan 2024</span>
        </div>

        {/* Refresh Button */}
        <button
          type="button"
          onClick={handleRefresh}
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
