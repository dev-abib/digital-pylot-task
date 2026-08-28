'use client';

import React from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Car,
  CalendarCheck,
  Users,
  BarChart3,
  Settings,
  ChevronRight,
  ChevronLeft,
  ShieldAlert,
} from 'lucide-react';

import { usePathname } from 'next/navigation';

export type DashboardTab =
  | 'Dashboard'
  | 'Fleet Inventory'
  | 'Bookings Manifest'
  | 'Leads & Inquiries'
  | 'Sales Analytics'
  | 'Super Admin'
  | 'Settings';

interface SidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
  activeTab?: DashboardTab;
  onSelectTab?: (tab: DashboardTab) => void;
}

interface NavMenuItem {
  name: DashboardTab;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const MENU_ITEMS: NavMenuItem[] = [
  { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { name: 'Fleet Inventory', href: '/admin/fleet', icon: Car, badge: '36' },
  { name: 'Bookings Manifest', href: '/admin/bookings', icon: CalendarCheck, badge: 'Live' },
  { name: 'Leads & Inquiries', href: '/admin/leads', icon: Users },
  { name: 'Sales Analytics', href: '/admin/sales', icon: BarChart3 },
  { name: 'Super Admin', href: '/admin/super-admin', icon: ShieldAlert },
  { name: 'Settings', href: '/admin/settings', icon: Settings },
];

export function Sidebar({
  isCollapsed = false,
  onToggleCollapse,
  activeTab = 'Dashboard',
  onSelectTab,
}: SidebarProps) {
  const pathname = usePathname() || '/admin';

  return (
    <aside
      className={`bg-white border-r border-gray-100 h-screen sticky top-0 flex flex-col justify-between transition-all duration-300 z-40 select-none ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Top Section */}
      <div>
        {/* Sidebar Header with Brand Logo */}
        <div className="h-16 border-b border-gray-100 flex items-center justify-between px-5">
          {!isCollapsed && (
            <Link href="/" className="flex items-center gap-1.5 group">
              <div className="relative flex items-center">
                <span className="font-rubik text-2xl font-black italic tracking-tighter text-[#131825]">
                  <span className="text-[#0275FF]">3</span>Best
                </span>
                <span className="text-xs font-semibold text-gray-500 ml-1 tracking-wider uppercase">
                  Car
                </span>
                {/* Red Swoosh accent */}
                <div className="absolute -bottom-1 left-1 w-12 h-1 bg-gradient-to-r from-red-500 via-orange-400 to-transparent rounded-full" />
              </div>
            </Link>
          )}

          {/* Collapse Toggle Button */}
          <button
            type="button"
            onClick={onToggleCollapse}
            className="w-7 h-7 rounded-full bg-[#FFF4EC] text-[#FF8A00] hover:bg-[#FFE6D4] flex items-center justify-center text-xs transition-colors shadow-xs mx-auto cursor-pointer"
            title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          >
            {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Clean Navigation Menu */}
        <div className="px-3 py-5 space-y-1.5">
          {!isCollapsed && (
            <p className="px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-3 font-jakarta">
              Operations Menu
            </p>
          )}

          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const isRouteMatch = item.href === '/admin' ? pathname === '/admin' || pathname === '/dashboard' : pathname.startsWith(item.href);
            const isActive = isRouteMatch || activeTab === item.name;

            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => onSelectTab?.(item.name)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#FFF4EC] text-[#FF8A00] shadow-xs'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
                title={isCollapsed ? item.name : undefined}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-colors ${
                      isActive ? 'text-[#FF8A00]' : 'text-gray-400 group-hover:text-gray-600'
                    }`}
                  />
                  {!isCollapsed && <span>{item.name}</span>}
                </div>

                {!isCollapsed && item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive
                        ? 'bg-[#FF9F43] text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Profile / Quick Info Card */}
      {!isCollapsed && (
        <div className="p-4 m-3 bg-[#F8F9FA] rounded-2xl border border-gray-100 font-jakarta">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#131825] text-white flex items-center justify-center text-xs font-bold shrink-0">
              MW
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-gray-900 truncate">Mike Witzel</p>
              <p className="text-[10px] text-gray-400 truncate">Store Administrator</p>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
