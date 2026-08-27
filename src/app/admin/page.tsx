'use client';

import React from 'react';
import { GreetingBar } from '@/components/Dashboard/GreetingBar';
import { StatsOverview } from '@/components/Dashboard/StatsOverview';
import { BestSeller } from '@/components/Dashboard/BestSeller';
import { RecentTransactions } from '@/components/Dashboard/RecentTransactions';
import { SalesAnalyticsChart } from '@/components/Dashboard/SalesAnalyticsChart';
import { SalesByCountries } from '@/components/Dashboard/SalesByCountries';

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* 1. Greeting & Date Range Bar */}
      <GreetingBar />

      {/* 2. Top 3 KPI Metric Cards */}
      <StatsOverview />

      {/* 3. Middle Section: Best Seller + Recent Transactions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-4 h-full">
          <BestSeller />
        </div>
        <div className="lg:col-span-8 h-full">
          <RecentTransactions />
        </div>
      </div>

      {/* 4. Bottom Section: Sales Analytics + Sales by Countries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
        <div className="lg:col-span-8 h-full">
          <SalesAnalyticsChart />
        </div>
        <div className="lg:col-span-4 h-full">
          <SalesByCountries />
        </div>
      </div>
    </div>
  );
}
