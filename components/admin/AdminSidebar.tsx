'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Car,
  CalendarCheck2,
  Users,
  BarChart3,
  Settings,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

const navigationItems = [
  { name: 'Overview', href: '/admin', icon: LayoutDashboard },
  { name: 'Fleet Inventory', href: '/admin/vehicles', icon: Car },
  { name: 'Bookings', href: '/admin/bookings', icon: CalendarCheck2, badge: '5 Active' },
  { name: 'Leads & CRM', href: '/admin/leads', icon: Users, badge: '3 New' },
  { name: 'Analytics', href: '/admin#analytics', icon: BarChart3 },
  { name: 'System Settings', href: '/admin#settings', icon: Settings }
];

export function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-slate-900 text-slate-100 flex flex-col shrink-0 min-h-screen">
      {/* Brand Header */}
      <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800">
        <Link href="/admin" className="flex items-center gap-2.5 font-bold text-lg tracking-tight">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-slate-950 font-black shadow-md">
            L
          </div>
          <span>LuxeDrive <span className="text-amber-400 text-xs font-semibold uppercase tracking-widest ml-1">Admin</span></span>
        </Link>
      </div>

      {/* Navigation */}
      <div className="flex-1 py-6 px-3 space-y-1">
        <div className="px-3 pb-2 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
          Management
        </div>
        {navigationItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150',
                isActive
                  ? 'bg-amber-500/15 text-amber-400 font-semibold shadow-sm border border-amber-500/20'
                  : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn('w-4 h-4', isActive ? 'text-amber-400' : 'text-slate-400')} />
                <span>{item.name}</span>
              </div>
              {item.badge && (
                <Badge variant="secondary" className="bg-amber-500/20 text-amber-300 text-[10px] px-1.5 py-0 border-0 font-normal">
                  {item.badge}
                </Badge>
              )}
            </Link>
          );
        })}
      </div>

      {/* Footer / Switch to Public Site */}
      <div className="p-4 border-t border-slate-800 space-y-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 text-xs font-medium text-slate-400 hover:text-white rounded-md bg-slate-800/60 hover:bg-slate-800 transition"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5" />
            Live Customer Portal
          </span>
          <span className="text-[10px] text-emerald-400 font-semibold">Online</span>
        </Link>
        <div className="flex items-center gap-3 px-3 py-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Role: Fleet Admin</span>
        </div>
      </div>
    </aside>
  );
}
