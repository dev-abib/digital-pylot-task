'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Car, Menu, X, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CustomerNavbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Fleet Inventory', href: '/vehicles' },
    { name: 'Categories', href: '/vehicles?category=SUV' },
    { name: 'Rental Policies', href: '/#policies' },
    { name: 'Admin Portal', href: '/admin' }
  ];

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/90 dark:bg-slate-950/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-amber-400 to-yellow-300 flex items-center justify-center text-slate-950 font-black shadow-md shadow-amber-500/20 group-hover:scale-105 transition">
              <Car className="w-5 h-5 text-slate-950" />
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-slate-950 dark:text-white">
                Luxe<span className="text-amber-500">Drive</span>
              </span>
              <span className="block text-[10px] font-semibold text-slate-400 -mt-1 tracking-widest uppercase">
                Premium Car Rentals
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`text-sm font-medium transition ${
                  pathname === link.href
                    ? 'text-amber-500 font-semibold'
                    : 'text-slate-600 hover:text-amber-500 dark:text-slate-300 dark:hover:text-amber-400'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Link href="/admin">
              <Button variant="outline" size="sm" className="border-slate-300 dark:border-slate-700 text-xs font-semibold">
                Admin Dashboard
              </Button>
            </Link>
            <Link href="/vehicles">
              <Button size="sm" className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs gap-1.5 shadow-md shadow-amber-500/20">
                <span>Book Vehicle</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-700 dark:text-slate-200"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-slate-700 dark:text-slate-200 hover:text-amber-500"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-3 flex flex-col gap-2">
            <Link href="/admin" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full justify-center text-xs">
                Admin Dashboard
              </Button>
            </Link>
            <Link href="/vehicles" onClick={() => setMobileMenuOpen(false)}>
              <Button className="w-full justify-center bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs">
                Browse Full Fleet
              </Button>
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
