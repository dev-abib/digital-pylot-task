'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Search,
  Plus,
  Monitor,
  Maximize2,
  Mail,
  Bell,
  Settings,
  ChevronDown,
  Cloud,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';

interface HeaderProps {
  onToggleSidebar?: () => void;
  onOpenAddVehicle?: () => void;
  onOpenPOS?: () => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
  notificationCount?: number;
}

export function Header({
  onToggleSidebar,
  onOpenAddVehicle,
  onOpenPOS,
  searchQuery = '',
  onSearchChange,
  notificationCount = 1,
}: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showComingSoon, setShowComingSoon] = useState(false);

  React.useEffect(() => {
    if (!showUserMenu && !showNotifications && !showComingSoon) return;

    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('header')) {
        setShowUserMenu(false);
        setShowNotifications(false);
        setShowComingSoon(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowUserMenu(false);
        setShowNotifications(false);
        setShowComingSoon(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showUserMenu, showNotifications, showComingSoon]);

  return (
    <header className="h-16 bg-white border-b border-gray-100 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 font-jakarta">
      {/* Left: Mobile Toggle & Global Search Bar */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="lg:hidden w-8 h-8 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center justify-center transition-colors cursor-pointer"
          title="Open Menu"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="relative w-36 xs:w-48 sm:w-72 lg:w-96 min-w-0">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Search fleet, bookings, or transactions..."
            className="w-full bg-[#F8F9FA] border border-gray-200 rounded-lg pl-9 sm:pl-10 pr-4 sm:pr-12 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF9F43]/20 focus:border-[#FF9F43] transition-all truncate"
          />
          <div className="hidden sm:block absolute right-2.5 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded px-1.5 py-0.5 text-[10px] font-semibold text-gray-400 shadow-2xs pointer-events-none">
            ⌘ K
          </div>
        </div>
      </div>

      {/* Right Actions Toolbar */}
      <div className="flex items-center gap-2.5 sm:gap-3 lg:gap-4">
        {/* Coming Soon Dropdown */}
        <div className="relative hidden sm:block">
          <button
            type="button"
            onClick={() => setShowComingSoon(!showComingSoon)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <Cloud className="w-3.5 h-3.5 text-gray-500" />
            <span>Coming Soon</span>
            <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
          </button>

          {showComingSoon && (
            <div className="absolute right-0 mt-1.5 w-48 bg-white border border-gray-200 rounded-xl shadow-xl p-3 z-40 text-xs animate-in fade-in zoom-in-95 duration-150">
              <p className="font-bold text-gray-900">Upcoming Features</p>
              <ul className="mt-2 space-y-1.5 text-gray-500 text-[11px]">
                <li className="flex items-center gap-1.5">⚡ AI Telematics Live GPS</li>
                <li className="flex items-center gap-1.5">💳 Stripe Auto-Invoicing</li>
                <li className="flex items-center gap-1.5">📲 SMS Notification Bot</li>
              </ul>
            </div>
          )}
        </div>

        {/* + Add New Button */}
        <button
          type="button"
          onClick={onOpenAddVehicle}
          className="bg-[#FF9F43] hover:bg-[#F28C28] text-white px-3 sm:px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs hover:shadow transition-all active:scale-95 cursor-pointer"
          title="Add New Vehicle"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span className="hidden sm:inline">Add New</span>
        </button>

        {/* POS Button */}
        <button
          type="button"
          onClick={onOpenPOS}
          className="bg-[#131825] hover:bg-black text-white px-3 sm:px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs hover:shadow transition-all active:scale-95 cursor-pointer"
          title="Open POS Terminal"
        >
          <Monitor className="w-4 h-4" />
          <span>POS</span>
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-200 hidden sm:block" />

        {/* Fullscreen */}
        <button
          type="button"
          onClick={() => {
            if (!document.fullscreenElement) {
              document.documentElement.requestFullscreen().catch(() => {});
            } else {
              document.exitFullscreen().catch(() => {});
            }
          }}
          className="hidden sm:flex w-8 h-8 rounded-lg hover:bg-gray-100 items-center justify-center text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
          title="Toggle Fullscreen"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Bell / Notifications */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
          </button>
          {notificationCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-[#EA5455] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-xs">
              0{notificationCount}
            </span>
          )}

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-xl border border-gray-100 p-4 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100 mb-2">
                <p className="text-xs font-bold text-gray-900">Notifications</p>
                <span className="text-[10px] bg-[#28C76F]/10 text-[#28C76F] font-bold px-2 py-0.5 rounded-full">
                  1 New
                </span>
              </div>
              <div className="space-y-2 text-xs">
                <div className="p-2.5 bg-gray-50 rounded-xl border border-gray-100 space-y-1">
                  <div className="flex items-center gap-1.5 text-[#28C76F] font-bold text-[11px]">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>New Booking Received</span>
                  </div>
                  <p className="text-gray-600 text-[11px]">Mike Witzel reserved Range Rover Velar for $1040.00</p>
                  <p className="text-[9px] text-gray-400">15 mins ago • Auto-dispatched</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* User Profile Avatar */}
        <div className="relative ml-1">
          <button
            type="button"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none cursor-pointer"
          >
            <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-gray-200">
              <Image
                src="/avatar_mike.jpg"
                alt="Mike Witzel"
                fill
                sizes="32px"
                className="object-cover"
              />
              <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#28C76F] ring-1 ring-white" />
            </div>
          </button>

          {/* User Dropdown Menu */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-xs font-bold text-gray-900">Mike Witzel</p>
                <p className="text-[10px] text-gray-500">Super Administrator</p>
              </div>
              <Link
                href="/"
                className="flex items-center justify-between px-4 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <span>Live Customer Site</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-gray-400" />
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
