'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/Dashboard/Sidebar';
import { Header } from '@/components/Dashboard/Header';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F8F9FA] flex font-jakarta antialiased relative">
      {/* Mobile Drawer Backdrop */}
      {isMobileSidebarOpen && (
        <div
          onClick={() => setIsMobileSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar: Responsive Desktop Sticky & Mobile Drawer */}
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
        />
      </div>

      {/* Main Content Body */}
      <div className="flex-1 flex flex-col min-w-0 w-full">
        {/* Top Navbar Header */}
        <Header
          onToggleSidebar={() => {
            if (window.innerWidth < 1024) {
              setIsMobileSidebarOpen(!isMobileSidebarOpen);
            } else {
              setIsSidebarCollapsed(!isSidebarCollapsed);
            }
          }}
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
    </div>
  );
}
