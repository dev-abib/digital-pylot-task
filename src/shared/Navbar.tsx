'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { AuthModal } from '@/components/Cards/AuthModal';

interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/', isActive: true },
  { label: 'How it Work', href: '#how-it-work' },
  { label: 'Rental Details', href: '#rental-details' },
  { label: 'Why Choose Us', href: '#why-choose-us' },
  { label: 'Testimonial', href: '#testimonial' },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalState, setAuthModalState] = useState<{
    isOpen: boolean;
    mode: 'login' | 'register';
  }>({
    isOpen: false,
    mode: 'login',
  });
  const [currentUser, setCurrentUser] = useState<{ name: string; email: string } | null>(null);

  const openAuth = (mode: 'login' | 'register') => {
    setAuthModalState({ isOpen: true, mode });
    setMobileMenuOpen(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <header className="w-full bg-[#cbd0d8] text-[#131825] border-b border-black/5 sticky top-0 z-40 transition-colors font-jakarta">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="font-rubik text-2xl sm:text-3xl font-extrabold tracking-tight text-[#131825] hover:opacity-80 transition-opacity cursor-pointer"
        >
          Logo
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {/* Main Navigation Links */}
          <div className="flex items-center gap-6 xl:gap-7 font-jakarta">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`text-sm xl:text-base cursor-pointer transition-colors duration-150 ${
                  item.isActive
                    ? 'font-bold text-[#131825]'
                    : 'font-medium text-[#4b5563] hover:text-[#131825]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Vertical Separator */}
          <div className="h-5 w-[1px] bg-[#9ca3af]/60" aria-hidden="true" />

          {/* Auth Actions */}
          <div className="flex items-center gap-4 xl:gap-5 font-jakarta">
            {currentUser ? (
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-white/80 px-3 py-1.5 rounded-full border border-black/5">
                  <div className="w-6 h-6 rounded-full bg-[#131825] text-white flex items-center justify-center text-xs font-bold">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-semibold text-[#131825]">
                    {currentUser.name}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-xs font-semibold text-red-600 hover:text-red-800 cursor-pointer"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => openAuth('register')}
                  className="text-sm xl:text-base font-medium text-[#4b5563] hover:text-[#131825] cursor-pointer transition-colors"
                >
                  Register
                </button>
                <button
                  type="button"
                  onClick={() => openAuth('login')}
                  className="bg-white text-[#131825] px-6 py-2.5 rounded-[4px] font-semibold text-sm xl:text-base shadow-sm hover:shadow-md hover:bg-gray-50 active:scale-95 cursor-pointer transition-all duration-200 border border-black/5"
                >
                  Log In
                </button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="flex items-center lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="p-2 rounded-lg text-[#131825] hover:bg-black/5 focus:outline-none focus:ring-2 focus:ring-black/10 cursor-pointer transition-colors"
            aria-label="Toggle Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#cbd0d8] border-t border-black/10 px-6 pt-4 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top duration-200 font-jakarta">
          <div className="flex flex-col space-y-3">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base py-1.5 cursor-pointer transition-colors ${
                  item.isActive
                    ? 'font-bold text-[#131825]'
                    : 'font-medium text-[#4b5563] hover:text-[#131825]'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-[#9ca3af]/40 flex flex-col gap-3">
            {currentUser ? (
              <div className="flex items-center justify-between py-2">
                <span className="text-sm font-semibold text-[#131825]">
                  Signed in as {currentUser.name}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="text-sm font-bold text-red-600 cursor-pointer"
                >
                  Log Out
                </button>
              </div>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => openAuth('register')}
                  className="text-center font-medium text-base text-[#131825] py-2 hover:opacity-80 cursor-pointer transition-opacity"
                >
                  Register
                </button>
                <button
                  type="button"
                  onClick={() => openAuth('login')}
                  className="w-full text-center bg-white text-[#131825] py-2.5 rounded-lg font-semibold text-base shadow-sm hover:shadow-md hover:bg-gray-50 active:scale-95 cursor-pointer transition-all border border-black/5"
                >
                  Log In
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Auth Modal */}
      <AuthModal
        isOpen={authModalState.isOpen}
        initialMode={authModalState.mode}
        onClose={() => setAuthModalState({ isOpen: false, mode: 'login' })}
        onSuccess={(user) => setCurrentUser(user)}
      />
    </header>
  );
}
