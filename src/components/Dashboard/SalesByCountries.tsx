'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function SalesByCountries() {
  const [timeframe, setTimeframe] = useState('This Week');
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs font-jakarta flex flex-col justify-between h-full relative overflow-hidden">
      {/* 1. Header */}
      <div className="flex items-center justify-between pb-2 mb-1">
        <h3 className="text-base font-bold text-[#131825]">Sales by Countries</h3>

        {/* Timeframe Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-600 font-medium hover:bg-gray-50 cursor-pointer transition-colors shadow-2xs"
          >
            <span>{timeframe}</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-1 w-28 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 font-jakarta text-xs">
              {['This Week', 'This Month', 'This Year'].map((tf) => (
                <button
                  key={tf}
                  type="button"
                  onClick={() => {
                    setTimeframe(tf);
                    setShowDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-gray-50 transition-colors ${
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

      {/* 2. World Map Container with Central Floating Badge */}
      <div className="relative w-full h-[220px] flex items-center justify-center my-auto">
        {/* World Map Vector */}
        <svg
          viewBox="0 0 540 260"
          className="w-full h-full object-contain pointer-events-none select-none"
        >
          {/* Base World Map Outlines (Light Gray Silhouette) */}
          <g fill="#EAECF0">
            {/* North America / Canada / Alaska */}
            <path d="M40 75 Q45 50 65 42 Q90 35 120 38 Q135 25 155 30 Q175 40 160 65 Q145 75 130 80 Q105 85 85 105 Q60 115 45 95 Z" />
            {/* Greenland */}
            <path d="M175 22 Q195 18 205 28 Q200 48 185 45 Q170 40 175 22 Z" />
            {/* Central America & Caribbean */}
            <path d="M90 115 Q105 125 115 145 Q110 155 100 145 Z" />
            {/* South America (Base) */}
            <path d="M125 145 Q150 140 170 155 Q180 180 165 220 Q145 255 135 240 Q120 200 120 165 Z" />
            {/* Europe (Base) */}
            <path d="M230 45 Q260 38 285 48 Q290 75 265 80 Q240 85 230 70 Z" />
            {/* Africa (Base) */}
            <path d="M225 90 Q275 85 285 125 Q280 175 260 215 Q245 225 235 200 Q215 150 220 110 Z" />
            {/* Asia & Russia (Base) */}
            <path d="M290 40 Q370 30 450 48 Q470 95 440 125 Q390 120 340 95 Q305 85 290 65 Z" />
            {/* Australia / Oceania (Base) */}
            <path d="M390 180 Q435 175 455 205 Q440 235 405 230 Q385 210 390 180 Z" />
          </g>

          {/* Highlighted Country Polygons (Matching Figma) */}

          {/* 1. USA (North America) - Dark Navy Slate */}
          <path
            d="M60 78 Q85 75 120 78 Q130 90 125 115 Q100 125 80 120 Q65 110 55 95 Z"
            fill="#132238"
          />

          {/* 2. Brazil (South America) - Solid Orange */}
          <path
            d="M120 155 Q145 145 175 160 Q180 185 165 215 Q145 210 135 185 Z"
            fill="#FF9F43"
          />

          {/* 3. Central/East Africa - Dark Navy Slate */}
          <path
            d="M245 125 Q275 125 272 155 Q260 170 248 160 Z"
            fill="#132238"
          />

          {/* 4. China (East Asia) - Dark Navy Slate */}
          <path
            d="M330 70 Q385 65 405 85 Q400 120 370 125 Q340 115 330 90 Z"
            fill="#132238"
          />

          {/* 5. Indonesia & Southeast Asia - Dark Navy Slate */}
          <path
            d="M370 148 Q400 160 435 165 Q420 175 385 165 Z"
            fill="#132238"
          />
          <circle cx="395" cy="152" r="3" fill="#132238" />
          <circle cx="410" cy="158" r="3.5" fill="#132238" />
          <circle cx="428" cy="162" r="3" fill="#132238" />
        </svg>

        {/* 3. Floating 2-Tone Centered Card (Exact Figma Design) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 sm:w-48 rounded-2xl shadow-xl border border-gray-100 overflow-hidden text-center z-10 bg-white">
          {/* Top Half: Orange with "Africa" */}
          <div className="bg-[#FF9F43] py-2.5 px-4 text-white">
            <p className="font-bold text-sm tracking-wide">Africa</p>
          </div>

          {/* Bottom Half: White with "3455 Sales" */}
          <div className="bg-white py-3 px-4">
            <p className="font-extrabold text-[#131825] text-base tracking-tight">
              3455 Sales
            </p>
          </div>
        </div>
      </div>

      {/* 4. Footer Growth Metric */}
      <div className="pt-2 flex items-center justify-center text-xs font-jakarta gap-1.5">
        <div className="flex items-center gap-1 text-[#28C76F] font-bold">
          <ChevronUp className="w-4 h-4 stroke-[3]" />
          <span>48%</span>
        </div>
        <span className="text-gray-500 font-medium">increase compare to last week</span>
      </div>
    </div>
  );
}
