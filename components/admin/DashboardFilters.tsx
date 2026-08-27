'use client';

import React from 'react';
import { Filter, Calendar, Tag, Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

interface DashboardFiltersProps {
  selectedRange: string;
  selectedCategory: string;
  onRangeChange: (range: string) => void;
  onCategoryChange: (category: string) => void;
}

const ranges = [
  { label: 'Last 7 Days', value: '7d' },
  { label: 'Last 30 Days', value: '30d' },
  { label: 'Last Quarter (90d)', value: '90d' },
  { label: 'Year to Date', value: 'ytd' }
];

const categories = ['All', 'Electric', 'SUV', 'Luxury', 'Sports', 'Van', 'Sedan'];

export function DashboardFilters({
  selectedRange,
  selectedCategory,
  onRangeChange,
  onCategoryChange
}: DashboardFiltersProps) {
  const currentRangeLabel = ranges.find(r => r.value === selectedRange)?.label || selectedRange;

  return (
    <div className="flex flex-wrap items-center gap-2.5 bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
      <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 pl-2 pr-1">
        <Filter className="w-3.5 h-3.5 text-amber-500" />
        <span>Filters:</span>
      </div>

      {/* Date Range Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex items-center justify-center gap-1.5 rounded-md text-xs font-medium h-8 px-3 border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer">
          <Calendar className="w-3.5 h-3.5 text-slate-400" />
          <span>{currentRangeLabel}</span>
          <ChevronDown className="w-3 h-3 text-slate-400" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-44">
          <div className="px-2 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Time Window
          </div>
          {ranges.map((r) => (
            <DropdownMenuItem
              key={r.value}
              onClick={() => onRangeChange(r.value)}
              className="text-xs flex items-center justify-between cursor-pointer"
            >
              <span>{r.label}</span>
              {selectedRange === r.value && <Check className="w-3.5 h-3.5 text-amber-500" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Category Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger className="inline-flex items-center justify-center gap-1.5 rounded-md text-xs font-medium h-8 px-3 border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/50 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition cursor-pointer">
          <Tag className="w-3.5 h-3.5 text-slate-400" />
          <span>Category: {selectedCategory}</span>
          <ChevronDown className="w-3 h-3 text-slate-400" />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-40">
          <div className="px-2 py-1.5 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
            Vehicle Class
          </div>
          {categories.map((cat) => (
            <DropdownMenuItem
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className="text-xs flex items-center justify-between cursor-pointer"
            >
              <span>{cat}</span>
              {selectedCategory === cat && <Check className="w-3.5 h-3.5 text-amber-500" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Reset Filter Action */}
      {(selectedCategory !== 'All' || selectedRange !== '7d') && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            onRangeChange('7d');
            onCategoryChange('All');
          }}
          className="h-8 text-xs text-amber-600 hover:text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/40"
        >
          Reset Filters
        </Button>
      )}
    </div>
  );
}
