'use client';

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Fleet Catalog', href: '/vehicles' },
  { label: 'How it Work', href: '/#how-it-work' },
  { label: 'Rental Details', href: '/#rental-details' },
  { label: 'Why Choose Us', href: '/#why-choose-us' },
  { label: 'Testimonial', href: '/#testimonial' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Clear timeout on unmount
  useEffect(() => () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  }, []);

  // Handle click outside mobile drawer
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(e.target as Node) &&
        !(e.target as HTMLElement).closest('[aria-label="Toggle menu"]')
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
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

            {/* Auth Actions matching Figma design */}
            <div className="flex items-center gap-4 xl:gap-5 font-jakarta">
              <Link
                href="/register"
                className="text-sm xl:text-base font-medium text-[#4b5563] hover:text-[#131825] transition-colors"
              >
                Register
              </Link>
              <Link
                href="/login"
                className="bg-white text-[#131825] px-6 py-2.5 rounded-[4px] font-semibold text-sm xl:text-base shadow-sm hover:shadow-md hover:bg-gray-50 active:scale-95 transition-all duration-200 border border-black/5"
              >
                Log In
              </Link>
            </div>
          </nav>

          {/* Animated Mobile Hamburger Button */}
          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="relative lg:hidden w-8 h-8 flex flex-col justify-center items-center gap-1.5 cursor-pointer focus:outline-none"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-6 h-0.5 bg-[#131825] rounded-full transition-all duration-300 ${
                isOpen ? 'rotate-45 absolute' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#131825] rounded-full transition-all duration-300 ${
                isOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-6 h-0.5 bg-[#131825] rounded-full transition-all duration-300 ${
                isOpen ? '-rotate-45 absolute' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 lg:hidden transition-opacity duration-300"
        />
      )}

      {/* Slide-in Mobile Drawer Sidebar from Left */}
      <aside
        ref={sidebarRef}
        className={`fixed top-0 left-0 h-full w-[280px] bg-[#cbd0d8] border-r border-black/10 z-[60] shadow-2xl flex flex-col justify-between py-6 px-6 transition-transform duration-500 font-jakarta lg:hidden ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="space-y-6">
          {/* Top Logo in Drawer */}
          <div className="flex items-center justify-between border-b border-black/10 pb-4">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className="font-rubik text-2xl font-extrabold tracking-tight text-[#131825]"
            >
              Logo
            </Link>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="w-7 h-7 rounded-full bg-black/5 flex items-center justify-center text-xs text-[#131825] hover:bg-black/10 transition-colors"
            >
              ✕
            </button>
          </div>

          {/* Navigation Links */}
          <ul className="flex flex-col gap-y-2">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm transition-colors ${
                    item.isActive
                      ? 'bg-white/80 font-bold text-[#131825] shadow-2xs'
                      : 'font-medium text-[#4b5563] hover:text-[#131825] hover:bg-white/40'
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom Actions matching Figma design */}
        <div className="pt-6 border-t border-black/10 space-y-2">
          <Link
            href="/register"
            onClick={() => setIsOpen(false)}
            className="block text-center w-full py-2.5 rounded-[4px] font-semibold text-sm text-[#131825] hover:bg-white/40 transition-colors"
          >
            Register
          </Link>
          <Link
            href="/login"
            onClick={() => setIsOpen(false)}
            className="block text-center w-full bg-white text-[#131825] py-2.5 rounded-[4px] font-bold text-sm shadow-sm hover:shadow hover:bg-gray-50 active:scale-95 transition-all border border-black/5"
          >
            Log In
          </Link>
        </div>
      </aside>
    </>
  );
}
