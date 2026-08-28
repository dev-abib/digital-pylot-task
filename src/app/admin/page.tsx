'use client';

import React, { useState, useEffect } from 'react';
import { useDashboard } from './layout';
import { GreetingBar } from '@/components/Dashboard/GreetingBar';
import { StatsOverview } from '@/components/Dashboard/StatsOverview';
import { BestSeller } from '@/components/Dashboard/BestSeller';
import { RecentTransactions } from '@/components/Dashboard/RecentTransactions';
import { SalesAnalyticsChart } from '@/components/Dashboard/SalesAnalyticsChart';
import { SalesByCountries } from '@/components/Dashboard/SalesByCountries';

export default function AdminDashboardPage() {
  const { transactions } = useDashboard();

  const [timeframe, setTimeframe] = useState('7d');
  const [year, setYear] = useState('2023');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [dashboardData, setDashboardData] = useState<{
    weeklyEarning: number;
    growthRate: number;
    totalSales: string;
    purchasedGoods: string;
    chartData: { month: string; value: number }[];
  }>({
    weeklyEarning: 95000.45,
    growthRate: 48,
    totalSales: '10,000+',
    purchasedGoods: '800+',
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
  });

  const fetchDashboardStats = React.useCallback(async (tf = timeframe, yr = year) => {
    setIsRefreshing(true);
    try {
      const res = await fetch(`/api/dashboard/stats?timeframe=${tf}&year=${yr}`);
      const data = await res.json();
      if (data.success) {
        setDashboardData({
          weeklyEarning: data.stats.weeklyEarning,
          growthRate: data.stats.growthRate,
          totalSales: data.stats.totalSales,
          purchasedGoods: data.stats.purchasedGoods,
          chartData: data.chartData,
        });
      }
    } catch (err) {
      console.error('Failed to fetch dashboard stats:', err);
    } finally {
      setIsRefreshing(false);
    }
  }, [timeframe, year]);

  useEffect(() => {
    fetchDashboardStats(timeframe, year);
  }, [fetchDashboardStats, timeframe, year]);

  // Default: Main Overview Dashboard (Figma)
  return (
    <div className="space-y-6">
      {/* 1. Greeting & Date Range Bar with Live Filters */}
      <GreetingBar
        timeframe={timeframe}
        onTimeframeChange={(tf) => setTimeframe(tf)}
        isRefreshing={isRefreshing}
        onRefresh={() => fetchDashboardStats()}
      />

      {/* 2. Top 3 KPI Metric Cards with Live API Values */}
      <StatsOverview
        weeklyEarning={dashboardData.weeklyEarning}
        growthRate={dashboardData.growthRate}
        totalSales={dashboardData.totalSales}
        purchasedGoods={dashboardData.purchasedGoods}
        isRefreshing={isRefreshing}
        onRefresh={() => fetchDashboardStats()}
      />

      {/* 3. Middle Section: Best Seller + Recent Transactions (with interactive status filter & actions) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-4 h-full">
          <BestSeller />
        </div>
        <div className="lg:col-span-8 h-full">
          <RecentTransactions transactions={transactions} />
        </div>
      </div>

      {/* 4. Bottom Section: Sales Analytics + Sales by Countries (with interactive map clicks) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-8 h-full">
          <SalesAnalyticsChart
            data={dashboardData.chartData}
            year={year}
            onYearChange={(yr) => setYear(yr)}
          />
        </div>
        <div className="lg:col-span-4 h-full">
          <SalesByCountries />
        </div>
      </div>
    </div>
  );
}
