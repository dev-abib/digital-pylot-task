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
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
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

const TAB_SLUG_MAP: Record<string, DashboardTab> = {
  dashboard: 'Dashboard',
  fleet: 'Fleet Inventory',
  bookings: 'Bookings Manifest',
  leads: 'Leads & Inquiries',
  sales: 'Sales Analytics',
  admin: 'Super Admin',
  settings: 'Settings',
};

const TAB_TO_SLUG_MAP: Record<DashboardTab, string> = {
  Dashboard: 'dashboard',
  'Fleet Inventory': 'fleet',
  'Bookings Manifest': 'bookings',
  'Leads & Inquiries': 'leads',
  'Sales Analytics': 'sales',
  'Super Admin': 'admin',
  Settings: 'settings',
};

const STORAGE_ACTIVE_TAB = 'bestauto_admin_active_tab_v2';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeTab, setActiveTabState] = useState<DashboardTab>('Dashboard');
  const [vehicles, setVehicles] = useState<CarItem[]>(MOCK_CARS);
  const [transactions, setTransactions] = useState<TransactionItem[]>(DEFAULT_TRANSACTIONS);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false);
  const [isPOSOpen, setIsPOSOpen] = useState(false);
  const [isAdminAuthorized, setIsAdminAuthorized] = useState<boolean | null>(null);

  // Check admin authorization from localStorage or seed
  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('bestauto_current_user');
      if (savedUser) {
        const parsed = JSON.parse(savedUser);
        if (parsed.role === 'Admin') {
          setIsAdminAuthorized(true);
          return;
        }
      }
      setIsAdminAuthorized(false);
    } catch {
      setIsAdminAuthorized(false);
    }
  }, []);

  const handleAuthorizeMockAdmin = () => {
    const mockAdmin = {
      name: 'Mike Witzel',
      email: 'admin@bestauto.com',
      role: 'Admin',
    };
    try {
      localStorage.setItem('bestauto_current_user', JSON.stringify(mockAdmin));
    } catch {}
    setIsAdminAuthorized(true);
  };

  // Sync active tab from URL query params or localStorage on initial mount
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const urlTab = urlParams.get('tab')?.toLowerCase();

        if (urlTab && TAB_SLUG_MAP[urlTab]) {
          setActiveTabState(TAB_SLUG_MAP[urlTab]);
          localStorage.setItem(STORAGE_ACTIVE_TAB, TAB_SLUG_MAP[urlTab]);
        } else {
          const savedTab = localStorage.getItem(STORAGE_ACTIVE_TAB) as DashboardTab;
          if (savedTab && Object.values(TAB_SLUG_MAP).includes(savedTab)) {
            setActiveTabState(savedTab);
            const slug = TAB_TO_SLUG_MAP[savedTab] || 'dashboard';
            window.history.replaceState(null, '', `/admin?tab=${slug}`);
          }
        }
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleSetActiveTab = (tab: DashboardTab) => {
    setActiveTabState(tab);
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_ACTIVE_TAB, tab);
        const slug = TAB_TO_SLUG_MAP[tab] || 'dashboard';
        window.history.replaceState(null, '', `/admin?tab=${slug}`);
      }
    } catch {
      // Ignore
    }
  };

  const handleAddVehicle = (newCar: CarItem) => {
    setVehicles((prev) => [newCar, ...prev]);
  };

  const handleCreateBookingFromPOS = (newTx: TransactionItem) => {
    setTransactions((prev) => [newTx, ...prev]);
  };

  // Loading state while checking authorization
  if (isAdminAuthorized === null) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center font-jakarta">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-3 border-[#131825] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs font-semibold text-gray-500">Verifying Admin Authorization...</p>
        </div>
      </div>
    );
  }

  // Unauthorized Gate: Prompt for Admin login or 1-Click Mock Admin Verification
  if (!isAdminAuthorized) {
    return (
      <div className="min-h-screen bg-[#0E131F] flex items-center justify-center p-4 font-jakarta selection:bg-[#FA8B2B] selection:text-white">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-gray-100 shadow-2xl space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 bg-amber-50 rounded-2xl flex items-center justify-center mx-auto border border-amber-100 text-[#FA8B2B]">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>

          <div className="space-y-1.5">
            <h2 className="font-rubik text-2xl font-bold text-[#131825]">
              Admin Access Required
            </h2>
            <p className="text-xs text-gray-500 leading-relaxed">
              This dashboard is restricted to authorized operators. You can verify using the seeded Mock Admin or log in.
            </p>
          </div>

          <div className="space-y-2.5 pt-2">
            <button
              type="button"
              onClick={handleAuthorizeMockAdmin}
              className="w-full bg-[#131825] hover:bg-black text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm tracking-wide transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Authorize as Mock Admin (Mike Witzel)</span>
            </button>

            <Link
              href="/login"
              className="block w-full py-3 rounded-xl border border-gray-200 text-gray-700 text-xs font-semibold hover:bg-gray-50 transition-colors"
            >
              Sign In with Admin Credentials
            </Link>

            <Link
              href="/"
              className="block text-xs font-medium text-gray-400 hover:text-gray-700 transition-colors pt-1"
            >
              Return to Storefront
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <DashboardContext.Provider
      value={{
        activeTab,
        setActiveTab: handleSetActiveTab,
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
            activeTab={activeTab}
            onSelectTab={(tab) => {
              handleSetActiveTab(tab);
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

