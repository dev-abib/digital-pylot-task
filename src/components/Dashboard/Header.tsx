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
} from 'lucide-react';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="h-16 bg-white border-b border-gray-100 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 font-jakarta">
      {/* Left: Mobile Toggle & Global Search Bar */}
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="lg:hidden w-8 h-8 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center justify-center transition-colors"
          title="Open Menu"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <div className="relative w-48 sm:w-72 lg:w-96">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full bg-[#F8F9FA] border border-gray-200 rounded-lg pl-10 pr-10 sm:pr-12 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF9F43]/20 focus:border-[#FF9F43] transition-all"
          />
          <div className="hidden sm:block absolute right-2.5 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded px-1.5 py-0.5 text-[10px] font-semibold text-gray-400 shadow-2xs pointer-events-none">
            ⌘ K
          </div>
        </div>
      </div>

      {/* Right Actions Toolbar */}
      <div className="flex items-center gap-3 lg:gap-4">
        {/* Coming Soon Dropdown */}
        <button
          type="button"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <Cloud className="w-3.5 h-3.5 text-gray-500" />
          <span>Coming Soon</span>
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        </button>

        {/* + Add New Button */}
        <button
          type="button"
          className="bg-[#FF9F43] hover:bg-[#F28C28] text-white px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs hover:shadow transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add New</span>
        </button>

        {/* POS Button */}
        <button
          type="button"
          className="bg-[#131825] hover:bg-black text-white px-3.5 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs hover:shadow transition-all active:scale-95 cursor-pointer"
        >
          <Monitor className="w-4 h-4" />
          <span>POS</span>
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-200 hidden sm:block" />

        {/* Language: US Flag */}
        <button
          type="button"
          className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-sm transition-colors"
          title="Change Language"
        >
          🇺🇸
        </button>

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
          className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
          title="Fullscreen"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Email Notification with 01 Badge */}
        <div className="relative">
          <button
            type="button"
            className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
            title="Messages"
          >
            <Mail className="w-4 h-4" />
          </button>
          <span className="absolute -top-0.5 -right-0.5 bg-[#EA5455] text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center shadow-xs">
            01
          </span>
        </div>

        {/* Bell Notification */}
        <button
          type="button"
          className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
        </button>

        {/* Settings */}
        <button
          type="button"
          className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
          title="Settings"
        >
          <Settings className="w-4 h-4" />
        </button>

        {/* User Profile Avatar */}
        <div className="relative ml-1">
          <button
            type="button"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 p-1 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none"
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
              <button
                type="button"
                className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
