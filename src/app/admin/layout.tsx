'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import Link from 'next/link';
import { Sidebar, DashboardTab } from '@/components/Dashboard/Sidebar';
import { Header } from '@/components/Dashboard/Header';
import { AddVehicleModal } from '@/components/Dashboard/AddVehicleModal';
import { POSModal } from '@/components/Dashboard/POSModal';
import { CarItem, MOCK_CARS } from '@/data/mockData';
import { TransactionItem } from '@/components/Dashboard/RecentTransactions';

interface DashboardContextType {
  vehicles: CarItem[];
  setVehicles: React.Dispatch<React.SetStateAction<CarItem[]>>;
  transactions: TransactionItem[];
  setTransactions: React.Dispatch<React.SetStateAction<TransactionItem[]>>;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  openAddVehicle: () => void;
  openPOS: () => void;
}

const DashboardContext = createContext<DashboardContextType | null>(null);

export function useDashboard() {
  const ctx = useContext(DashboardContext);
  if (!ctx) {
    throw new Error('useDashboard must be used within AdminLayout');
  }
  return ctx;
}

const DEFAULT_TRANSACTIONS: TransactionItem[] = [
  {
    id: 1,
    carName: 'Range Rover',
    timeAgo: '15 Mins',
    image: '/car_full_1.jpg',
    paymentMethod: 'Paypal',
    transactionCode: '#416645453773',
    status: 'Success',
    amount: '$1099.00',
  },
  {
    id: 2,
    carName: 'Red Toyota',
    timeAgo: '15 Mins',
    image: '/car_full_2.jpg',
    paymentMethod: 'Apple Pay',
    transactionCode: '#147784454554',
    status: 'Cancelled',
    amount: '$600.55',
  },
  {
    id: 3,
    carName: 'blue Nissan',
    timeAgo: '15 Mins',
    image: '/car_rush.jpg',
    paymentMethod: 'Stripe',
    transactionCode: '#147784454554',
    status: 'Pending',
    amount: '$200.10',
  },
  {
    id: 4,
    carName: 'Toyota Corolla',
    timeAgo: '15 Mins',
    image: '/why_choose_us_car.jpg',
    paymentMethod: 'PayU',
    transactionCode: '#147784454554',
    status: 'Success',
    amount: '$1569.00',
  },
  {
    id: 5,
    carName: 'Range Rover',
    timeAgo: '15 Mins',
    image: '/promo_banner_1.jpg',
    paymentMethod: 'Paytm',
    transactionCode: '#147784454554',
    status: 'Success',
    amount: '$1478.00',
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [vehicles, setVehicles] = useState<CarItem[]>(MOCK_CARS);
  const [transactions, setTransactions] = useState<TransactionItem[]>(DEFAULT_TRANSACTIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
  const [isPOSOpen, setIsPOSOpen] = useState(false);
  const handleAddVehicle = (newCar: CarItem) => {
    setVehicles((prev) => [newCar, ...prev]);
  };

  const handleCreateBookingFromPOS = (newTx: TransactionItem) => {
    setTransactions((prev) => [newTx, ...prev]);
  };

  return (
    <DashboardContext.Provider
      value={{
        vehicles,
        setVehicles,
        transactions,
        setTransactions,
        searchQuery,
        setSearchQuery,
        openAddVehicle: () => setIsAddVehicleOpen(true),
        openPOS: () => setIsPOSOpen(true),
      }}
    >
      <div className="min-h-screen bg-[#F8F9FA] flex font-jakarta antialiased relative overflow-x-clip w-full max-w-full">
        {/* Mobile Drawer Backdrop */}
        {isMobileSidebarOpen && (
          <div
            onClick={() => setIsMobileSidebarOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          />
        )}

        {/* Sidebar: Desktop Sticky & Mobile Drawer */}
        <div
          className={`fixed lg:sticky top-0 h-screen z-50 transition-transform duration-300 ${
            isMobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
          }`}
        >
          <Sidebar
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => {
              if (window.innerWidth < 1024) {
                setIsMobileSidebarOpen(false);
              } else {
                setIsSidebarCollapsed(!isSidebarCollapsed);
              }
            }}
            onNavigate={() => {
              if (window.innerWidth < 1024) {
                setIsMobileSidebarOpen(false);
              }
            }}
          />
        </div>

        {/* Main Content Body */}
        <div className="flex-1 flex flex-col min-w-0 w-full overflow-x-clip">
          {/* Top Navbar Header with Functional Buttons */}
          <Header
            onToggleSidebar={() => {
              if (window.innerWidth < 1024) {
                setIsMobileSidebarOpen(!isMobileSidebarOpen);
              } else {
                setIsSidebarCollapsed(!isSidebarCollapsed);
              }
            }}
            onOpenAddVehicle={() => setIsAddVehicleOpen(true)}
            onOpenPOS={() => setIsPOSOpen(true)}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />

          {/* Scrollable Dashboard View */}
          <main className="flex-1 p-4 sm:p-6 lg:p-7 max-w-[1600px] w-full mx-auto space-y-6">
            {children}
          </main>

          {/* Dashboard Footer */}
          <footer className="px-6 py-4 border-t border-gray-100 bg-white flex flex-col sm:flex-row items-center justify-between text-xs text-gray-400 gap-2 font-jakarta">
            <p>2026 © All Right Reserved</p>
            <p className="font-medium text-gray-500">Designed &amp; Developed</p>
          </footer>
        </div>

        {/* Global Functional Modals */}
        <AddVehicleModal
          isOpen={isAddVehicleOpen}
          onClose={() => setIsAddVehicleOpen(false)}
          onAddVehicle={handleAddVehicle}
        />

        <POSModal
          isOpen={isPOSOpen}
          onClose={() => setIsPOSOpen(false)}
          onCreateBooking={handleCreateBookingFromPOS}
        />
      </div>
    </DashboardContext.Provider>
  );
}

