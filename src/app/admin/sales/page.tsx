'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { SalesAnalyticsChart } from '@/components/Dashboard/SalesAnalyticsChart';
import { SalesByCountries } from '@/components/Dashboard/SalesByCountries';
import {
  BarChart3,
  TrendingUp,
  DollarSign,
  CalendarCheck,
  Globe,
  ArrowUpRight,
  Download,
  RefreshCw,
} from 'lucide-react';

interface MarketData {
  country: string;
  flag: string;
  share: number;
  revenue: string;
  bookings: number;
  growth: string;
  status: 'Surging' | 'Stable' | 'Growing';
}

const TIMEFRAME_STATS = {
  '7d': {
    gross: '$95,000.45',
    growth: '+48.2%',
    aov: '$420.50',
    aovNote: '3.4 days avg duration',
    bookings: '1,280',
    bookingsNote: '94.2% completion rate',
    chartData: [
      { month: 'Jan', value: 24 },
      { month: 'Feb', value: 31 },
      { month: 'Mar', value: 17 },
      { month: 'Apr', value: 21 },
      { month: 'May', value: 22 },
      { month: 'Jun', value: 32 },
      { month: 'July', value: 18 },
      { month: 'Aug', value: 16 },
      { month: 'Sep', value: 21 },
    ],
  },
  '30d': {
    gross: '$384,500.00',
    growth: '+52.8%',
    aov: '$455.00',
    aovNote: '4.1 days avg duration',
    bookings: '4,650',
    bookingsNote: '96.5% completion rate',
    chartData: [
      { month: 'Jan', value: 28 },
      { month: 'Feb', value: 36 },
      { month: 'Mar', value: 24 },
      { month: 'Apr', value: 30 },
      { month: 'May', value: 34 },
      { month: 'Jun', value: 44 },
      { month: 'July', value: 25 },
      { month: 'Aug', value: 22 },
      { month: 'Sep', value: 32 },
    ],
  },
  '90d': {
    gross: '$1,120,000.00',
    growth: '+61.4%',
    aov: '$490.20',
    aovNote: '5.2 days avg duration',
    bookings: '12,400',
    bookingsNote: '97.8% completion rate',
    chartData: [
      { month: 'Jan', value: 32 },
      { month: 'Feb', value: 45 },
      { month: 'Mar', value: 30 },
      { month: 'Apr', value: 40 },
      { month: 'May', value: 46 },
      { month: 'Jun', value: 55 },
      { month: 'July', value: 34 },
      { month: 'Aug', value: 28 },
      { month: 'Sep', value: 42 },
    ],
  },
  '2024': {
    gross: '$4,850,000.00',
    growth: '+74.0%',
    aov: '$512.00',
    aovNote: 'Annual executive average',
    bookings: '54,200',
    bookingsNote: '98.6% completion rate',
    chartData: [
      { month: 'Jan', value: 34 },
      { month: 'Feb', value: 42 },
      { month: 'Mar', value: 28 },
      { month: 'Apr', value: 35 },
      { month: 'May', value: 39 },
      { month: 'Jun', value: 48 },
      { month: 'July', value: 29 },
      { month: 'Aug', value: 24 },
      { month: 'Sep', value: 38 },
    ],
  },
};

const REGIONAL_MARKETS: MarketData[] = [
  {
    country: 'United States',
    flag: '🇺🇸',
    share: 36.4,
    revenue: '$34,580.00',
    bookings: 465,
    growth: '+52.4%',
    status: 'Surging',
  },
  {
    country: 'United Kingdom',
    flag: '🇬🇧',
    share: 28.2,
    revenue: '$26,790.00',
    bookings: 360,
    growth: '+38.1%',
    status: 'Growing',
  },
  {
    country: 'China',
    flag: '🇨🇳',
    share: 16.5,
    revenue: '$15,675.00',
    bookings: 210,
    growth: '+24.6%',
    status: 'Stable',
  },
  {
    country: 'Brazil',
    flag: '🇧🇷',
    share: 11.2,
    revenue: '$10,640.00',
    bookings: 145,
    growth: '+41.2%',
    status: 'Growing',
  },
  {
    country: 'Indonesia',
    flag: '🇮🇩',
    share: 7.7,
    revenue: '$7,315.45',
    bookings: 100,
    growth: '+18.9%',
    status: 'Stable',
  },
];

export default function SalesPage() {
  const [timeframe, setTimeframe] = useState<'7d' | '30d' | '90d' | '2024'>('7d');
  const [year, setYear] = useState('2023');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [stats, setStats] = useState(TIMEFRAME_STATS['7d']);

  const loadStats = useCallback(async (tf: '7d' | '30d' | '90d' | '2024', yr: string) => {
    setIsRefreshing(true);
    try {
      const res = await fetch(`/api/dashboard/stats?timeframe=${tf}&year=${yr}`);
      const data = await res.json();
      if (data.success && data.chartData) {
        const tfData = TIMEFRAME_STATS[tf] || TIMEFRAME_STATS['7d'];
        setStats({
          ...tfData,
          chartData: data.chartData,
        });
      } else {
        setStats(TIMEFRAME_STATS[tf] || TIMEFRAME_STATS['7d']);
      }
    } catch {
      setStats(TIMEFRAME_STATS[tf] || TIMEFRAME_STATS['7d']);
    } finally {
      setTimeout(() => setIsRefreshing(false), 250);
    }
  }, []);

  const handleTimeframeChange = (tf: '7d' | '30d' | '90d' | '2024') => {
    setTimeframe(tf);
    loadStats(tf, year);
  };

  const handleYearChange = (yr: string) => {
    setYear(yr);
    loadStats(timeframe, yr);
  };

  useEffect(() => {
    loadStats(timeframe, year);
  }, [loadStats, timeframe, year]);

  return (
    <div className="space-y-6 font-jakarta w-full">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-11 h-11 min-w-[44px] min-h-[44px] aspect-square rounded-2xl bg-gradient-to-tr from-[#FF9F43] to-[#FF8A00] text-white flex items-center justify-center shadow-md shrink-0">
            <BarChart3 className="w-6 h-6 shrink-0" />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-gray-900 leading-tight">Sales Analytics &amp; Revenue Telemetry</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Multi-market financial trends, fleet booking velocity, and regional expansion metrics
            </p>
          </div>
        </div>

        {/* Timeframe Tabs & Action: responsive non-breaking row */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-between sm:justify-end shrink-0">
          <div className="flex items-center bg-gray-100 p-0.5 rounded-xl text-xs font-semibold text-gray-600 flex-1 sm:flex-initial">
            {(['7d', '30d', '90d', '2024'] as const).map((tf) => {
              const isSelected = timeframe === tf;
              return (
                <button
                  key={tf}
                  type="button"
                  onClick={() => handleTimeframeChange(tf)}
                  className={`flex-1 sm:flex-initial text-center px-2.5 sm:px-3.5 py-1.5 rounded-lg transition-all cursor-pointer whitespace-nowrap text-[11px] sm:text-xs ${
                    isSelected
                      ? 'bg-white text-[#131825] shadow-xs font-bold'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {tf === '2024' ? 'Year 2024' : `${tf.replace('d', '')} Days`}
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={() => loadStats(timeframe, year)}
            className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer shrink-0"
            title="Refresh Telemetry"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-[#FF8A00]' : ''}`} />
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Metric 1 */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-400">Total Gross Revenue</p>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 font-rubik tracking-tight transition-all duration-300">
              {stats.gross}
            </h3>
            <div className="flex items-center gap-1 text-[11px] font-bold text-[#28C76F]">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>{stats.growth} vs previous period</span>
            </div>
          </div>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 text-[#28C76F] flex items-center justify-center shrink-0">
            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>

        {/* Metric 2 */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-400">Average Order Value</p>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 font-rubik tracking-tight transition-all duration-300">
              {stats.aov}
            </h3>
            <p className="text-[11px] text-gray-500 font-medium">{stats.aovNote}</p>
          </div>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-orange-50 text-[#FF9F43] flex items-center justify-center shrink-0">
            <BarChart3 className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>

        {/* Metric 3 */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-400">Total Bookings</p>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 font-rubik tracking-tight transition-all duration-300">
              {stats.bookings}
            </h3>
            <p className="text-[11px] text-gray-500 font-medium">{stats.bookingsNote}</p>
          </div>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-50 text-[#0275FF] flex items-center justify-center shrink-0">
            <CalendarCheck className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>

        {/* Metric 4 */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-400">Global Markets</p>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 font-rubik tracking-tight">14 Regions</h3>
            <p className="text-[11px] text-gray-500 font-medium">Top: USA &amp; United Kingdom</p>
          </div>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
      </div>

      {/* Core Side-by-Side Charts Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        <div className="lg:col-span-8 h-full min-h-[380px]">
          <SalesAnalyticsChart
            data={stats.chartData}
            year={year}
            onYearChange={handleYearChange}
          />
        </div>
        <div className="lg:col-span-4 h-full min-h-[380px]">
          <SalesByCountries />
        </div>
      </div>

      {/* Regional Market Performance Table */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-gray-100">
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-gray-900 leading-tight">Regional Market Share &amp; Expansion</h3>
            <p className="text-xs text-gray-400 mt-0.5">Detailed breakdown of gross revenue by country</p>
          </div>
          <button
            type="button"
            className="flex items-center gap-1.5 text-xs font-semibold text-gray-600 hover:text-gray-900 border border-gray-200 px-3.5 py-2 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer shrink-0 self-start sm:self-auto whitespace-nowrap"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[550px]">
            <thead>
              <tr className="border-b border-gray-100 text-gray-400 font-semibold">
                <th className="pb-3">Country / Market</th>
                <th className="pb-3">Share</th>
                <th className="pb-3">Completed Bookings</th>
                <th className="pb-3">Gross Revenue</th>
                <th className="pb-3">Growth Velocity</th>
                <th className="pb-3 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {REGIONAL_MARKETS.map((m) => (
                <tr key={m.country} className="hover:bg-gray-50/80 transition-colors font-medium">
                  <td className="py-3.5 flex items-center gap-2.5">
                    <span className="text-base">{m.flag}</span>
                    <span className="font-bold text-gray-900">{m.country}</span>
                  </td>
                  <td className="py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-20 bg-gray-100 rounded-full h-2 overflow-hidden">
                        <div
                          className="bg-[#FF9F43] h-full rounded-full"
                          style={{ width: `${m.share}%` }}
                        />
                      </div>
                      <span className="text-gray-600 font-semibold">{m.share}%</span>
                    </div>
                  </td>
                  <td className="py-3.5 text-gray-700">{m.bookings}</td>
                  <td className="py-3.5 font-bold text-[#131825]">{m.revenue}</td>
                  <td className="py-3.5 text-[#28C76F] font-bold flex items-center gap-0.5">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                    <span>{m.growth}</span>
                  </td>
                  <td className="py-3.5 text-right">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                        m.status === 'Surging'
                          ? 'bg-orange-100 text-[#FF8A00]'
                          : m.status === 'Growing'
                          ? 'bg-emerald-100 text-[#28C76F]'
                          : 'bg-blue-100 text-[#0275FF]'
                      }`}
                    >
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
