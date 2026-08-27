'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, Calendar, Car, Sparkles, ArrowRight, Shield, Zap, Award } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function HeroSection() {
  const router = useRouter();
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [pickupDate, setPickupDate] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (category !== 'All') params.set('category', category);
    if (search) params.set('search', search);
    if (pickupDate) params.set('availableFrom', pickupDate);
    router.push(`/vehicles?${params.toString()}`);
  };

  return (
    <section className="relative overflow-hidden bg-slate-950 text-white pt-12 pb-24 lg:pt-20 lg:pb-32">
      {/* Background Decorative Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-amber-500/10 via-amber-500/5 to-transparent blur-3xl pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 text-amber-300 text-xs font-semibold backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>AI Concierge & Instant Instant Fleet Booking Active</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-white leading-[1.1]">
            Drive Extraordinary. <br />
            <span className="bg-gradient-to-r from-amber-400 via-amber-200 to-yellow-400 bg-clip-text text-transparent">
              On Your Terms.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
            Experience premium SUVs, electric innovators, and iconic sports cars. Zero hassle reservation, transparent pricing, and 24/7 concierge delivery.
          </p>
        </div>

        {/* Floating Search & Booking Bar */}
        <div className="mt-10 max-w-4xl mx-auto bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-4 sm:p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl text-slate-900 dark:text-white">
          <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 items-end">
            {/* Search query */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                <Search className="w-3.5 h-3.5 text-amber-500" />
                <span>Search Model / Brand</span>
              </label>
              <Input
                type="text"
                placeholder="e.g. Tesla, Porsche, BMW..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 text-xs bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              />
            </div>

            {/* Category Select */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                <Car className="w-3.5 h-3.5 text-amber-500" />
                <span>Category Class</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full h-10 text-xs px-3 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
              >
                <option value="All">All Categories</option>
                <option value="Electric">Electric & EV</option>
                <option value="SUV">Luxury SUV</option>
                <option value="Sports">Performance & Sports</option>
                <option value="Luxury">Executive Luxury</option>
                <option value="Van">Passenger Van</option>
              </select>
            </div>

            {/* Pickup Date */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                <span>Pickup Date</span>
              </label>
              <Input
                type="date"
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="h-10 text-xs bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
              />
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              className="h-10 w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs gap-2 shadow-lg shadow-amber-500/25"
            >
              <span>Explore Fleet</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>
        </div>

        {/* Feature Highlights */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-slate-400 text-xs">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Shield className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white">Full Insurance Available</div>
              <div>Zero deductible options on all bookings</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white">Instant AI Recommendations</div>
              <div>Smart concierge match for your trip</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="p-2 rounded-lg bg-amber-500/10 text-amber-400">
              <Award className="w-4 h-4" />
            </div>
            <div>
              <div className="font-bold text-white">5-Star Maintained Fleet</div>
              <div>Cleaned, inspected, and guaranteed</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
