'use client';

import React from 'react';
import { DollarSign, Calendar, CarFront, UserPlus, TrendingUp, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { DashboardStats } from '@/lib/types';

interface StatsCardsProps {
  stats: DashboardStats;
}

export function StatsCards({ stats }: StatsCardsProps) {
  const cards = [
    {
      title: 'Total Revenue',
      value: `$${stats.totalRevenue.toLocaleString()}`,
      change: stats.revenueChangePercentage,
      trend: stats.revenueChangePercentage >= 0 ? 'up' : 'down',
      icon: DollarSign,
      subtext: 'vs last 30-day period',
      accentColor: 'text-amber-500 bg-amber-500/10'
    },
    {
      title: 'Active Bookings',
      value: stats.activeBookings.toString(),
      change: stats.bookingsChangePercentage,
      trend: stats.bookingsChangePercentage >= 0 ? 'up' : 'down',
      icon: Calendar,
      subtext: `${stats.recentBookings.filter(b => b.status === 'confirmed').length} awaiting pickup`,
      accentColor: 'text-emerald-500 bg-emerald-500/10'
    },
    {
      title: 'Fleet Availability',
      value: `${stats.availableVehicles} / ${stats.totalFleetCount}`,
      change: stats.fleetUtilizationRate,
      trend: 'neutral',
      icon: CarFront,
      subtext: `${stats.fleetUtilizationRate}% fleet utilization`,
      accentColor: 'text-blue-500 bg-blue-500/10'
    },
    {
      title: 'New Inquiries & Leads',
      value: stats.newLeadsCount.toString(),
      change: stats.leadsChangePercentage,
      trend: stats.leadsChangePercentage >= 0 ? 'up' : 'down',
      icon: UserPlus,
      subtext: 'Automated Telegram alerts active',
      accentColor: 'text-purple-500 bg-purple-500/10'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((c, i) => {
        const Icon = c.icon;
        return (
          <Card key={i} className="border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition bg-white dark:bg-slate-900">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {c.title}
                </span>
                <div className={`p-2 rounded-lg ${c.accentColor}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-3">
                <div className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
                  {c.value}
                </div>
              </div>

              <div className="mt-2.5 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                <span className="truncate">{c.subtext}</span>
                {c.trend !== 'neutral' && (
                  <span className={`inline-flex items-center gap-0.5 font-bold ${c.trend === 'up' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}`}>
                    {c.trend === 'up' ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                    {c.change > 0 ? `+${c.change}%` : `${c.change}%`}
                  </span>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
