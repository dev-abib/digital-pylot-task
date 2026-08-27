'use client';

import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { DashboardStats } from '@/lib/types';

interface RevenueChartProps {
  stats: DashboardStats;
}

export function RevenueChart({ stats }: RevenueChartProps) {
  const chartData = stats.revenueChart;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Revenue Area Chart */}
      <Card className="lg:col-span-2 border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base font-bold text-slate-900 dark:text-white">
                Revenue & Booking Performance
              </CardTitle>
              <CardDescription className="text-xs text-slate-500">
                Daily generated revenue ($) and total fleet checkouts
              </CardDescription>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <span className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Revenue ($)
              </span>
              <span className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Bookings
              </span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="bookingsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" opacity={0.15} vertical={false} />
                <XAxis dataKey="date" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                  formatter={(value: unknown, name: unknown) => [
                    name === 'revenue' ? `$${Number(value).toLocaleString()}` : `${value} bookings`,
                    name === 'revenue' ? 'Revenue' : 'Bookings'
                  ]}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#f59e0b"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#revenueGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Fleet Category Distribution */}
      <Card className="border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
        <CardHeader className="pb-2">
          <CardTitle className="text-base font-bold text-slate-900 dark:text-white">
            Category Share
          </CardTitle>
          <CardDescription className="text-xs text-slate-500">
            Fleet count breakdown by car segment
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-4">
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.categoryDistribution} layout="vertical" margin={{ top: 0, right: 20, left: 10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#334155" opacity={0.1} />
                <XAxis type="number" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
                <YAxis dataKey="category" type="category" stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} width={60} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px'
                  }}
                  formatter={(value: unknown) => [`${value} Vehicles (${((Number(value) / stats.totalFleetCount) * 100).toFixed(0)}%)`, 'Count']}
                />
                <Bar dataKey="count" fill="#f59e0b" radius={[0, 4, 4, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
