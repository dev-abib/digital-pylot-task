'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  ShieldAlert,
  Package,
  PlusSquare,
  Clock,
  TrendingDown,
  Grid,
  Layers,
  Award,
  Scale,
  Sliders,
  ShieldCheck,
  Barcode,
  QrCode,
  Boxes,
  Wrench,
  ArrowLeftRight,
  ShoppingCart,
  Receipt,
  RotateCcw,
  Quote,
  Monitor,
  Tag,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';

interface SidebarProps {
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export function Sidebar({ isCollapsed = false, onToggleCollapse }: SidebarProps) {
  const [activeItem, setActiveItem] = useState('Dashboard');
  const [inventoryOpen, setInventoryOpen] = useState(true);
  const [stockOpen, setStockOpen] = useState(true);
  const [salesOpen, setSalesOpen] = useState(true);

  return (
    <aside
      className={`bg-white border-r border-gray-100 h-screen sticky top-0 flex flex-col transition-all duration-300 z-40 select-none ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
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

        {/* Collapse Button */}
        <button
          type="button"
          onClick={onToggleCollapse}
          className="w-7 h-7 rounded-full bg-[#FFF4EC] text-[#FF8A00] hover:bg-[#FFE6D4] flex items-center justify-center text-xs transition-colors shadow-xs mx-auto"
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
        >
          {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
        </button>
      </div>

      {/* Navigation Menu (Scrollable) */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin scrollbar-thumb-gray-200">
        {/* Main Section */}
        <div>
          {!isCollapsed && (
            <p className="px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 font-jakarta">
              Main
            </p>
          )}
          <div className="space-y-1">
            {/* Dashboard (Active) */}
            <button
              type="button"
              onClick={() => setActiveItem('Dashboard')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                activeItem === 'Dashboard'
                  ? 'bg-[#FFF4EC] text-[#FF8A00]'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <LayoutDashboard className="w-4 h-4 shrink-0 text-[#FF8A00]" />
                {!isCollapsed && <span>Dashboard</span>}
              </div>
              {!isCollapsed && <ChevronDown className="w-3.5 h-3.5 text-[#FF8A00]" />}
            </button>

            {/* Super Admin */}
            <button
              type="button"
              onClick={() => setActiveItem('Super Admin')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                activeItem === 'Super Admin'
                  ? 'bg-[#FFF4EC] text-[#FF8A00]'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-3">
                <ShieldAlert className="w-4 h-4 shrink-0 text-gray-400" />
                {!isCollapsed && <span>Super Admin</span>}
              </div>
              {!isCollapsed && <ChevronRight className="w-3.5 h-3.5 text-gray-400" />}
            </button>
          </div>
        </div>

        {/* Inventory Section */}
        <div>
          {!isCollapsed && (
            <p className="px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 font-jakarta">
              Inventory
            </p>
          )}
          <div className="space-y-1">
            {[
              { name: 'Products', icon: Package },
              { name: 'Create Product', icon: PlusSquare },
              { name: 'Expired Products', icon: Clock },
              { name: 'Low Stocks', icon: TrendingDown },
              { name: 'Category', icon: Grid },
              { name: 'Sub Category', icon: Layers },
              { name: 'Brands', icon: Award },
              { name: 'Units', icon: Scale },
              { name: 'Variant Attributes', icon: Sliders },
              { name: 'Warranties', icon: ShieldCheck },
              { name: 'Print Barcode', icon: Barcode },
              { name: 'Print QR Code', icon: QrCode },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.name;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setActiveItem(item.name)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#FFF4EC] text-[#FF8A00] font-semibold'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  title={isCollapsed ? item.name : undefined}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#FF8A00]' : 'text-gray-400'}`} />
                  {!isCollapsed && <span>{item.name}</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Stock Section */}
        <div>
          {!isCollapsed && (
            <p className="px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 font-jakarta">
              Stock
            </p>
          )}
          <div className="space-y-1">
            {[
              { name: 'Manage Stock', icon: Boxes },
              { name: 'Stock Adjustment', icon: Wrench },
              { name: 'Stock Transfer', icon: ArrowLeftRight },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.name;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setActiveItem(item.name)}
                  className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#FFF4EC] text-[#FF8A00] font-semibold'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  title={isCollapsed ? item.name : undefined}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#FF8A00]' : 'text-gray-400'}`} />
                  {!isCollapsed && <span>{item.name}</span>}
                </button>
              );
            })}
          </div>
        </div>

        {/* Sales Section */}
        <div>
          {!isCollapsed && (
            <p className="px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 font-jakarta">
              Sales
            </p>
          )}
          <div className="space-y-1">
            {[
              { name: 'Sales', icon: ShoppingCart, hasArrow: true },
              { name: 'Invoices', icon: Receipt },
              { name: 'Sales Return', icon: RotateCcw },
              { name: 'Quotation', icon: Quote },
              { name: 'POS', icon: Monitor, hasArrow: true },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeItem === item.name;
              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => setActiveItem(item.name)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-[#FFF4EC] text-[#FF8A00] font-semibold'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                  title={isCollapsed ? item.name : undefined}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#FF8A00]' : 'text-gray-400'}`} />
                    {!isCollapsed && <span>{item.name}</span>}
                  </div>
                  {!isCollapsed && item.hasArrow && (
                    <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Promo Section */}
        <div>
          {!isCollapsed && (
            <p className="px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider mb-2 font-jakarta">
              Promo
            </p>
          )}
          <div className="space-y-1">
            <button
              type="button"
              onClick={() => setActiveItem('Coupons')}
              className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            >
              <Tag className="w-4 h-4 shrink-0 text-gray-400" />
              {!isCollapsed && <span>Coupons & Deals</span>}
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
}
