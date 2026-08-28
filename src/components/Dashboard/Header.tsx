'use client';

import React, { useState, useRef, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MOCK_CARS } from '@/data/mockData';
import {
  Search,
  Plus,
  Monitor,
  Maximize2,
  Bell,
  ArrowUpRight,
  CheckCircle2,
  X,
  Car,
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
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  // Keyboard shortcut Cmd/Ctrl + K to focus search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter cars live for the search dropdown
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return MOCK_CARS.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.type.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
    ).slice(0, 5);
  }, [searchQuery]);

  React.useEffect(() => {
    if (!showUserMenu && !showNotifications && !isSearchFocused) return;

    const handleOutsideClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('header')) {
        setShowUserMenu(false);
        setShowNotifications(false);
        setIsSearchFocused(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowUserMenu(false);
        setShowNotifications(false);
        setIsSearchFocused(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [showUserMenu, showNotifications, isSearchFocused]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearchFocused(false);
    router.push('/admin/fleet');
  };

  return (
    <header className="h-16 bg-white/95 backdrop-blur-md border-b border-gray-100 px-3 sm:px-6 flex items-center justify-between sticky top-0 z-40 font-jakarta w-full max-w-full shadow-2xs">
      {/* Left: Mobile Toggle & Global Search Bar */}
      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1 relative">
        <button
          type="button"
          onClick={onToggleSidebar}
          className="lg:hidden w-8 h-8 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 flex items-center justify-center transition-colors cursor-pointer shrink-0"
          title="Open Menu"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <form onSubmit={handleSearchSubmit} className="relative flex-1 sm:w-80 lg:w-96 min-w-0 max-w-[220px] xs:max-w-[260px] sm:max-w-none">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 shrink-0 pointer-events-none" />
          <input
            ref={searchInputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              onSearchChange?.(e.target.value);
              setIsSearchFocused(true);
            }}
            onFocus={() => setIsSearchFocused(true)}
            placeholder="Search fleet (Press ⌘K)..."
            className="w-full bg-[#F8F9FA] border border-gray-200 rounded-lg pl-8 sm:pl-10 pr-8 sm:pr-12 py-1.5 sm:py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF9F43]/20 focus:border-[#FF9F43] transition-all truncate"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => {
                onSearchChange?.('');
                setIsSearchFocused(false);
              }}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-gray-200 text-gray-400 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="hidden sm:block absolute right-2.5 top-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded px-1.5 py-0.5 text-[10px] font-semibold text-gray-400 shadow-2xs pointer-events-none">
              ⌘ K
            </div>
          )}

          {/* Live Search Autocomplete Results Dropdown */}
          {isSearchFocused && searchQuery.trim().length > 0 && (
            <div className="fixed left-3 right-3 top-[68px] sm:absolute sm:left-0 sm:right-auto sm:top-full sm:mt-1.5 sm:w-[380px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150 font-jakarta">
              <div className="flex items-center justify-between pb-2 border-b border-gray-100 mb-2">
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  Matching Vehicles ({searchResults.length})
                </span>
                <span className="text-[10px] text-[#FF8A00] font-semibold">Press Enter for Fleet</span>
              </div>

              {searchResults.length === 0 ? (
                <div className="py-4 text-center text-xs text-gray-500">
                  <p>No vehicles found for &ldquo;{searchQuery}&rdquo;</p>
                  <p className="text-[10px] text-gray-400 mt-1">Try searching &ldquo;Mercedes&rdquo;, &ldquo;SUV&rdquo;, or &ldquo;Tesla&rdquo;</p>
                </div>
              ) : (
                <div className="space-y-1.5 max-h-72 overflow-y-auto">
                  {searchResults.map((car) => (
                    <Link
                      key={car.id}
                      href="/admin/fleet"
                      onClick={() => setIsSearchFocused(false)}
                      className="flex items-center justify-between p-2 rounded-xl hover:bg-[#FFF4EC]/60 transition-colors group cursor-pointer"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-7 rounded-lg overflow-hidden bg-gray-100 relative shrink-0 border border-gray-100">
                          {car.image ? (
                            <Image src={car.image} alt={car.name} fill className="object-cover" sizes="36px" />
                          ) : (
                            <Car className="w-4 h-4 text-gray-400 m-auto" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs font-bold text-gray-900 truncate group-hover:text-[#FF8A00] transition-colors">
                            {car.name}
                          </p>
                          <p className="text-[10px] text-gray-400">{car.type} • {car.seats} Seats</p>
                        </div>
                      </div>

                      <div className="text-right shrink-0 ml-2">
                        <p className="text-xs font-bold text-[#131825]">${car.price}<span className="text-[10px] text-gray-400 font-normal">/d</span></p>
                        <span className="text-[9px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-semibold">
                          {car.category}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}

              <div className="pt-2 border-t border-gray-100 mt-2 flex items-center justify-between">
                <Link
                  href="/admin/fleet"
                  onClick={() => setIsSearchFocused(false)}
                  className="text-xs font-bold text-[#FF8A00] hover:underline flex items-center gap-1"
                >
                  <span>Open Full Fleet Inventory</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/"
                  onClick={() => setIsSearchFocused(false)}
                  className="text-[11px] text-gray-500 hover:text-gray-900"
                >
                  Live Storefront ↗
                </Link>
              </div>
            </div>
          )}
        </form>
      </div>

      {/* Right Actions Toolbar */}
      <div className="flex items-center gap-1.5 sm:gap-3 lg:gap-4 shrink-0 ml-2">
        {/* + Add New Button */}
        <button
          type="button"
          onClick={onOpenAddVehicle}
          className="bg-[#FF9F43] hover:bg-[#F28C28] text-white p-2 sm:px-3.5 sm:py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs hover:shadow transition-all active:scale-95 cursor-pointer shrink-0"
          title="Add New Vehicle"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span className="hidden md:inline">Add New</span>
        </button>

        {/* POS Button */}
        <button
          type="button"
          onClick={onOpenPOS}
          className="bg-[#131825] hover:bg-black text-white p-2 sm:px-3.5 sm:py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 shadow-xs hover:shadow transition-all active:scale-95 cursor-pointer shrink-0"
          title="Open POS Terminal"
        >
          <Monitor className="w-4 h-4" />
          <span className="hidden xs:inline">POS</span>
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
          className="hidden sm:flex w-8 h-8 rounded-lg hover:bg-gray-100 items-center justify-center text-gray-500 hover:text-gray-900 transition-colors cursor-pointer shrink-0"
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
              <button
                type="button"
                onClick={() => {
                  try {
                    localStorage.removeItem('bestauto_current_user');
                  } catch {}
                  router.push('/login');
                }}
                className="w-full text-left px-4 py-2 text-xs text-red-600 hover:bg-red-50 transition-colors font-semibold cursor-pointer border-t border-gray-100 mt-1"
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
