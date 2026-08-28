import React from 'react';
import Link from 'next/link';
import {
  Compass,
  ArrowLeft,
  Car,
  LayoutDashboard,
  Home,
  Bot,
  MapPin,
  Sparkles,
} from 'lucide-react';

export const metadata = {
  title: '404 - Road Not Found | Best Auto Luxury Car Rental',
  description: 'The requested route or page could not be located. Explore our luxury vehicle fleet or return to the storefront.',
};

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#131825] flex flex-col justify-between selection:bg-[#FF8A00] selection:text-white font-jakarta relative overflow-hidden">
      {/* Background Decorative Mesh Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-radial from-orange-200/30 via-transparent to-transparent pointer-events-none blur-3xl -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Simple Brand Bar */}
      <header className="px-6 lg:px-12 py-5 border-b border-gray-100/80 bg-white/70 backdrop-blur-md sticky top-0 z-30">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-1 group">
            <span className="font-rubik text-2xl font-black italic tracking-tighter text-[#131825]">
              <span className="text-[#0275FF]">3</span>Best
            </span>
            <span className="text-xs font-semibold text-gray-500 ml-1 tracking-wider uppercase">
              Car
            </span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-bold text-gray-700 hover:text-[#FF8A00] transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>Storefront</span>
          </Link>
        </div>
      </header>

      {/* Main 404 Hero Container */}
      <section className="flex-1 flex items-center justify-center px-4 sm:px-6 py-12 lg:py-20">
        <div className="max-w-3xl w-full text-center space-y-8">
          {/* Badge & Number */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF4EC] border border-[#FFE0CC] text-[#FF8A00] text-xs font-bold tracking-wide uppercase">
              <MapPin className="w-3.5 h-3.5 text-[#FF8A00]" />
              <span>Detour Notice • Error 404</span>
            </div>

            <div className="relative inline-block select-none">
              <h1 className="font-rubik text-8xl sm:text-9xl font-black tracking-tighter text-gray-200/90 leading-none">
                4<span className="text-[#FF8A00]">0</span>4
              </h1>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white shadow-xl border border-gray-100 flex items-center justify-center text-[#131825] transform -rotate-6 hover:rotate-0 transition-transform">
                  <Compass className="w-8 h-8 sm:w-10 sm:h-10 text-[#FF8A00] animate-pulse" />
                </div>
              </div>
            </div>
          </div>

          {/* Heading & Contextual Copy */}
          <div className="space-y-3 max-w-xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#131825] tracking-tight">
              Looks like you took an unexpected turn off the motorway.
            </h2>
            <p className="text-sm text-gray-600 leading-relaxed font-medium">
              The page or destination you are looking for may have been moved, renamed, or is temporarily out of service. Let’s get you back on the right route.
            </p>
          </div>

          {/* Action Destination Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-left pt-2">
            <Link
              href="/"
              className="group p-4 rounded-2xl bg-white border border-gray-200/80 hover:border-[#FF8A00]/50 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-orange-50 text-[#FF8A00] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Home className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#FF8A00] transition-colors">
                  Storefront Home
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Return to our main landing page and reservation portal.
                </p>
              </div>
              <span className="text-[11px] font-bold text-[#FF8A00] mt-3 inline-flex items-center gap-1">
                Explore Home &rarr;
              </span>
            </Link>

            <Link
              href="/vehicles"
              className="group p-4 rounded-2xl bg-white border border-gray-200/80 hover:border-[#0275FF]/50 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-blue-50 text-[#0275FF] flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <Car className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 group-hover:text-[#0275FF] transition-colors">
                  Fleet Catalog
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Discover 36+ prestige, SUV, and electric luxury vehicles.
                </p>
              </div>
              <span className="text-[11px] font-bold text-[#0275FF] mt-3 inline-flex items-center gap-1">
                View Vehicles &rarr;
              </span>
            </Link>

            <Link
              href="/admin"
              className="group p-4 rounded-2xl bg-white border border-gray-200/80 hover:border-[#131825]/50 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="w-9 h-9 rounded-xl bg-gray-100 text-gray-800 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform">
                  <LayoutDashboard className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-gray-900 group-hover:text-gray-900 transition-colors">
                  Operations Console
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Live admin telemetry, bookings manifest &amp; fleet control.
                </p>
              </div>
              <span className="text-[11px] font-bold text-gray-700 mt-3 inline-flex items-center gap-1">
                Open Admin &rarr;
              </span>
            </Link>
          </div>

          {/* Bottom Direct Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <Link
              href="/"
              className="px-6 py-3 rounded-full bg-[#131825] text-white text-xs font-bold hover:bg-black transition-colors shadow-md inline-flex items-center gap-2 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Safe Route</span>
            </Link>
            <Link
              href="/vehicles"
              className="px-6 py-3 rounded-full bg-white text-[#131825] border border-gray-200 text-xs font-bold hover:bg-gray-50 transition-colors shadow-xs inline-flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#FF8A00]" />
              <span>Browse Luxury Fleet</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="px-6 py-5 border-t border-gray-100/80 text-center text-xs text-gray-400">
        <p>© 2026 Best Auto Luxury Car Rental &amp; Dispatch Automation. All rights reserved.</p>
      </footer>
    </main>
  );
}
