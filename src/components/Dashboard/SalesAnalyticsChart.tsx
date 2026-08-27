'use client';

import React, { useState } from 'react';
import { Calendar, ChevronDown } from 'lucide-react';

export interface ChartPoint {
  month: string;
  value: number; // in thousands (e.g. 24 = 24k)
}

const DEFAULT_POINTS: ChartPoint[] = [
  { month: 'Jan', value: 24 },
  { month: 'Feb', value: 31 },
  { month: 'Mar', value: 17 },
  { month: 'Apr', value: 21 },
  { month: 'May', value: 22 },
  { month: 'Jun', value: 32 },
  { month: 'July', value: 18 },
  { month: 'Aug', value: 16 },
  { month: 'Sep', value: 21 },
];

interface SalesAnalyticsChartProps {
  data?: ChartPoint[];
  year?: string;
  onYearChange?: (year: string) => void;
}

export function SalesAnalyticsChart({
  data = DEFAULT_POINTS,
  year = '2023',
  onYearChange,
}: SalesAnalyticsChartProps) {
  const [selectedYear, setSelectedYear] = useState(year);
  const [hoveredPoint, setHoveredPoint] = useState<(ChartPoint & { x: number; y: number }) | null>(null);
  const [showYearDropdown, setShowYearDropdown] = useState(false);

  // SVG Chart Geometry
  const width = 620;
  const height = 240;
  const paddingLeft = 40;
  const paddingRight = 20;
  const paddingTop = 20;
  const paddingBottom = 40;

  const chartWidth = width - paddingLeft - paddingRight;
  const chartHeight = height - paddingTop - paddingBottom;
  const maxVal = 60; // 60k max

  const chartPoints = data && data.length > 0 ? data : DEFAULT_POINTS;

  // Convert points to SVG coords
  const points = chartPoints.map((pt, index) => {
    const x = paddingLeft + (index / (chartPoints.length - 1)) * chartWidth;
    const y = paddingTop + chartHeight - (pt.value / maxVal) * chartHeight;
    return { ...pt, x, y };
  });

  // Generate smooth cubic bezier SVG path
  const makeSmoothPath = (pts: typeof points) => {
    if (pts.length < 2) return '';
    let d = `M ${pts[0].x},${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const p0 = pts[i === 0 ? i : i - 1];
      const p1 = pts[i];
      const p2 = pts[i + 1];
      const p3 = pts[i + 2] || p2;

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
    }
    return d;
  };

  const linePath = makeSmoothPath(points);
  const areaPath = `${linePath} L ${points[points.length - 1].x},${paddingTop + chartHeight} L ${points[0].x},${paddingTop + chartHeight} Z`;

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs font-jakarta flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-50 mb-2">
        <h3 className="text-base font-bold text-gray-900">Sales Analytics</h3>

        {/* Year Selector with Dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowYearDropdown(!showYearDropdown)}
            className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-xs text-gray-600 font-medium hover:bg-gray-50 cursor-pointer transition-colors shadow-2xs"
          >
            <Calendar className="w-3 h-3 text-gray-400" />
            <span>{selectedYear}</span>
            <ChevronDown className="w-3 h-3 text-gray-400" />
          </button>

          {showYearDropdown && (
            <div className="absolute right-0 mt-1 w-28 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-30 font-jakarta text-xs">
              {['2024', '2023', '2022'].map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => {
                    setSelectedYear(yr);
                    onYearChange?.(yr);
                    setShowYearDropdown(false);
                  }}
                  className={`w-full text-left px-3 py-1.5 hover:bg-gray-50 transition-colors ${
                    selectedYear === yr ? 'text-[#FF9F43] font-bold bg-[#FFF4EC]' : 'text-gray-700'
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* SVG Smooth Area Chart */}
      <div className="relative w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-[220px] sm:h-[250px] overflow-visible"
        >
          <defs>
            <linearGradient id="salesOrangeGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#FF9F43" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#FF9F43" stopOpacity="0.15" />
              <stop offset="100%" stopColor="#FF9F43" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Horizontal Grid Lines */}
          {[60, 50, 40, 30, 20, 10].map((val) => {
            const y = paddingTop + chartHeight - (val / maxVal) * chartHeight;
            return (
              <g key={val}>
                <line
                  x1={paddingLeft}
                  y1={y}
                  x2={width - paddingRight}
                  y2={y}
                  stroke="#F3F4F6"
                  strokeWidth="1"
                />
                <text
                  x={paddingLeft - 8}
                  y={y + 4}
                  textAnchor="end"
                  fill="#9CA3AF"
                  fontSize="10"
                  fontFamily="sans-serif"
                >
                  {val}k
                </text>
              </g>
            );
          })}

          {/* Area Fill */}
          <path d={areaPath} fill="url(#salesOrangeGradient)" />

          {/* Line Stroke */}
          <path
            d={linePath}
            fill="none"
            stroke="#FF9F43"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Points & Interactive Nodes */}
          {points.map((pt) => (
            <g
              key={pt.month}
              onMouseEnter={() => setHoveredPoint(pt)}
              onMouseLeave={() => setHoveredPoint(null)}
              className="cursor-pointer group"
            >
              {/* Outer Glow Circle on Hover */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r="7"
                className="fill-[#FF9F43]/20 group-hover:scale-150 transition-all opacity-0 group-hover:opacity-100"
              />
              {/* Point Node */}
              <circle
                cx={pt.x}
                cy={pt.y}
                r="4"
                className="fill-white stroke-[#FF9F43] stroke-2 group-hover:r-5 transition-all"
              />
              {/* X Axis Month Labels */}
              <text
                x={pt.x}
                y={paddingTop + chartHeight + 20}
                textAnchor="middle"
                fill="#9CA3AF"
                fontSize="11"
                fontFamily="sans-serif"
                className="font-medium group-hover:fill-gray-900 group-hover:font-bold transition-colors"
              >
                {pt.month}
              </text>
            </g>
          ))}
        </svg>

        {/* Hover Tooltip Card */}
        {hoveredPoint && (
          <div
            className="absolute -top-1 bg-[#131825] text-white px-3 py-1.5 rounded-lg text-xs font-semibold shadow-xl pointer-events-none transform -translate-x-1/2 transition-all duration-150"
            style={{
              left: `${(hoveredPoint.x / width) * 100}%`,
              top: `${Math.max(hoveredPoint.y - 45, 10)}px`,
            }}
          >
            <p className="text-[10px] text-gray-400">{hoveredPoint.month} Sales</p>
            <p className="font-bold text-[#FF9F43]">${hoveredPoint.value},000.00</p>
          </div>
        )}
      </div>
    </div>
  );
}
