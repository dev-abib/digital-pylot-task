'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  SlidersHorizontal,
  X,
  Users,
  Fuel,
  Gauge,
  Star,
  Heart,
  RotateCcw,
  ArrowUpDown,
  Car,
} from 'lucide-react';
import { MOCK_CARS, CarItem } from '@/data/mockData';
import { BookingModal } from '@/components/Cards/BookingModal';

const CATEGORIES = ['All', 'Popular', 'Large Car', 'Small Car', 'Exclusive Car'] as const;
const FUEL_TYPES = ['All', 'Gasoline', 'Hybrid', 'Electric', 'Diesel', 'Premium Gas'] as const;
const TRANSMISSIONS = ['All', 'Automatic', 'Manual'] as const;
const SEAT_OPTIONS = ['All', '2 Seats', '4-5 Seats', '7-8 Seats'] as const;

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating-desc' | 'name-asc';

function VehiclesCatalogContent() {
  const searchParams = useSearchParams();

  // Initial params
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  // Filter States
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [selectedFuel, setSelectedFuel] = useState<string>('All');
  const [selectedTransmission, setSelectedTransmission] = useState<string>('All');
  const [selectedSeatRange, setSelectedSeatRange] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(550);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Booking Modal State
  const [selectedCarForBooking, setSelectedCarForBooking] = useState<CarItem | null>(null);

  // Wishlist State (persisted in session)
  const [wishlist, setWishlist] = useState<Set<string>>(() => new Set());

  const toggleWishlist = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  // Reset all filters
  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedFuel('All');
    setSelectedTransmission('All');
    setSelectedSeatRange('All');
    setMaxPrice(550);
    setSortBy('featured');
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    selectedCategory !== 'All' ||
    selectedFuel !== 'All' ||
    selectedTransmission !== 'All' ||
    selectedSeatRange !== 'All' ||
    maxPrice < 550;

  // Filter & Sort Logic
  const filteredVehicles = useMemo(() => {
    return MOCK_CARS.filter((car) => {
      // 1. Text Search (Name & Type)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesName = car.name.toLowerCase().includes(q);
        const matchesType = car.type.toLowerCase().includes(q);
        const matchesCategory = car.category.toLowerCase().includes(q);
        if (!matchesName && !matchesType && !matchesCategory) return false;
      }

      // 2. Category
      if (selectedCategory !== 'All' && car.category !== selectedCategory) {
        return false;
      }

      // 3. Fuel Type
      if (selectedFuel !== 'All' && car.fuel.toLowerCase() !== selectedFuel.toLowerCase()) {
        return false;
      }

      // 4. Transmission
      if (
        selectedTransmission !== 'All' &&
        car.transmission.toLowerCase() !== selectedTransmission.toLowerCase()
      ) {
        return false;
      }

      // 5. Seat Range
      if (selectedSeatRange === '2 Seats' && car.seats !== 2) return false;
      if (selectedSeatRange === '4-5 Seats' && (car.seats < 4 || car.seats > 5)) return false;
      if (selectedSeatRange === '7-8 Seats' && (car.seats < 7 || car.seats > 8)) return false;

      // 6. Max Price
      if (car.price > maxPrice) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating-desc':
          return b.rating - a.rating;
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'featured':
        default:
          return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
      }
    });
  }, [
    searchQuery,
    selectedCategory,
    selectedFuel,
    selectedTransmission,
    selectedSeatRange,
    maxPrice,
    sortBy,
  ]);

  return (
    <div className="bg-[#F6F7F9] min-h-screen pb-20 pt-4 sm:pt-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 text-xs text-[#596780] mb-2 font-medium">
            <Link href="/" className="hover:text-[#1A202C] transition-colors">
              Home
            </Link>
            <span>/</span>
            <span className="text-[#1A202C] font-semibold">Fleet Catalog</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A202C] tracking-tight font-jakarta">
                Explore Our Luxury Fleet
              </h1>
              <p className="text-sm text-[#596780] mt-1">
                Discover high-performance supercars, executive sedans, and family SUVs with instant booking.
              </p>
            </div>

            {/* Mobile Filter Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden flex items-center justify-center gap-2 bg-white px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-[#1A202C] shadow-sm hover:bg-gray-50 active:scale-95 transition-all"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#3563E9]" />
              <span>Filters ({hasActiveFilters ? 'Active' : 'All'})</span>
            </button>
          </div>
        </div>

        {/* Layout: Sidebar Filter + Vehicle Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* DESKTOP FILTER SIDEBAR */}
          <aside className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-2xl border border-black/5 shadow-sm sticky top-24 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <div className="flex items-center gap-2 font-bold text-[#1A202C] text-base font-jakarta">
                <SlidersHorizontal className="w-5 h-5 text-[#3563E9]" />
                <span>Filter Vehicles</span>
              </div>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs text-[#3563E9] hover:underline font-semibold flex items-center gap-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>

            {/* 1. Category */}
            <div className="space-y-3">
              <label className="text-xs font-bold uppercase tracking-wider text-[#90A3BF]">
                Vehicle Category
              </label>
              <div className="flex flex-col gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-left text-sm py-2 px-3 rounded-lg font-medium transition-all ${
                      selectedCategory === cat
                        ? 'bg-[#3563E9] text-white font-semibold shadow-sm'
                        : 'text-[#596780] hover:bg-gray-50 hover:text-[#1A202C]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Price Range Slider */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold uppercase tracking-wider text-[#90A3BF]">
                  Max Daily Rate
                </label>
                <span className="text-sm font-bold text-[#1A202C]">${maxPrice}.00</span>
              </div>
              <input
                type="range"
                min="40"
                max="550"
                step="10"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#3563E9] cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-[#90A3BF] font-medium">
                <span>$40</span>
                <span>$550+</span>
              </div>
            </div>

            {/* 3. Seating Capacity */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <label className="text-xs font-bold uppercase tracking-wider text-[#90A3BF]">
                Capacity
              </label>
              <div className="grid grid-cols-2 gap-2">
                {SEAT_OPTIONS.map((seat) => (
                  <button
                    key={seat}
                    type="button"
                    onClick={() => setSelectedSeatRange(seat)}
                    className={`text-xs py-2 px-2 rounded-lg font-medium text-center transition-all border ${
                      selectedSeatRange === seat
                        ? 'bg-[#3563E9]/10 border-[#3563E9] text-[#3563E9] font-bold'
                        : 'border-gray-200 text-[#596780] hover:border-gray-300'
                    }`}
                  >
                    {seat}
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Transmission */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <label className="text-xs font-bold uppercase tracking-wider text-[#90A3BF]">
                Transmission
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {TRANSMISSIONS.map((tr) => (
                  <button
                    key={tr}
                    type="button"
                    onClick={() => setSelectedTransmission(tr)}
                    className={`text-xs py-2 px-1 rounded-lg font-medium text-center transition-all border ${
                      selectedTransmission === tr
                        ? 'bg-[#3563E9]/10 border-[#3563E9] text-[#3563E9] font-bold'
                        : 'border-gray-200 text-[#596780] hover:border-gray-300'
                    }`}
                  >
                    {tr}
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Fuel Type */}
            <div className="space-y-3 pt-4 border-t border-gray-100">
              <label className="text-xs font-bold uppercase tracking-wider text-[#90A3BF]">
                Fuel / Powertrain
              </label>
              <div className="flex flex-wrap gap-1.5">
                {FUEL_TYPES.map((fuel) => (
                  <button
                    key={fuel}
                    type="button"
                    onClick={() => setSelectedFuel(fuel)}
                    className={`text-xs py-1.5 px-3 rounded-full font-medium transition-all border ${
                      selectedFuel === fuel
                        ? 'bg-[#3563E9] border-[#3563E9] text-white font-semibold'
                        : 'border-gray-200 text-[#596780] hover:border-gray-300'
                    }`}
                  >
                    {fuel}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* MAIN CONTENT AREA */}
          <main className="lg:col-span-9 space-y-6">
            {/* Search & Sort Toolbar */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-black/5 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Search Box */}
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#90A3BF]" />
                <input
                  type="text"
                  placeholder="Search car make, model, type..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#F6F7F9] pl-10 pr-4 py-2.5 rounded-xl text-sm text-[#1A202C] placeholder-[#90A3BF] border border-transparent focus:border-[#3563E9] focus:bg-white focus:outline-none transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Sort & Count */}
              <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                <span className="text-xs font-semibold text-[#596780]">
                  Showing <strong className="text-[#1A202C]">{filteredVehicles.length}</strong> of{' '}
                  {MOCK_CARS.length} Cars
                </span>

                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 text-[#90A3BF]" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="bg-[#F6F7F9] text-xs font-semibold text-[#1A202C] py-2 px-3 rounded-lg border border-gray-200 focus:outline-none focus:border-[#3563E9] cursor-pointer"
                  >
                    <option value="featured">Featured / Popular</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating-desc">Highest Rated</option>
                    <option value="name-asc">Alphabetical (A-Z)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Active Filters Pill Bar */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-2 bg-white px-4 py-3 rounded-xl border border-black/5 shadow-xs">
                <span className="text-xs text-[#90A3BF] font-semibold">Active filters:</span>
                {selectedCategory !== 'All' && (
                  <span className="inline-flex items-center gap-1.5 bg-[#3563E9]/10 text-[#3563E9] text-xs font-semibold px-2.5 py-1 rounded-md">
                    Category: {selectedCategory}
                    <button
                      type="button"
                      onClick={() => setSelectedCategory('All')}
                      className="hover:opacity-75 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedFuel !== 'All' && (
                  <span className="inline-flex items-center gap-1.5 bg-[#3563E9]/10 text-[#3563E9] text-xs font-semibold px-2.5 py-1 rounded-md">
                    Fuel: {selectedFuel}
                    <button
                      type="button"
                      onClick={() => setSelectedFuel('All')}
                      className="hover:opacity-75 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedTransmission !== 'All' && (
                  <span className="inline-flex items-center gap-1.5 bg-[#3563E9]/10 text-[#3563E9] text-xs font-semibold px-2.5 py-1 rounded-md">
                    Trans: {selectedTransmission}
                    <button
                      type="button"
                      onClick={() => setSelectedTransmission('All')}
                      className="hover:opacity-75 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {selectedSeatRange !== 'All' && (
                  <span className="inline-flex items-center gap-1.5 bg-[#3563E9]/10 text-[#3563E9] text-xs font-semibold px-2.5 py-1 rounded-md">
                    Seats: {selectedSeatRange}
                    <button
                      type="button"
                      onClick={() => setSelectedSeatRange('All')}
                      className="hover:opacity-75 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                {maxPrice < 550 && (
                  <span className="inline-flex items-center gap-1.5 bg-[#3563E9]/10 text-[#3563E9] text-xs font-semibold px-2.5 py-1 rounded-md">
                    Under ${maxPrice}/day
                    <button
                      type="button"
                      onClick={() => setMaxPrice(550)}
                      className="hover:opacity-75 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs text-red-500 hover:text-red-600 font-semibold underline ml-auto"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* VEHICLES GRID */}
            {filteredVehicles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredVehicles.map((car) => {
                  const isFavorited = wishlist.has(car.id);
                  return (
                    <div
                      key={car.id}
                      className="bg-white rounded-2xl border border-black/5 p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
                    >
                      {/* Card Header: Title & Wishlist */}
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-bold text-[#1A202C] text-lg font-jakarta group-hover:text-[#3563E9] transition-colors line-clamp-1">
                              {car.name}
                            </h3>
                            <span className="text-xs font-semibold text-[#90A3BF]">
                              {car.type}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={(e) => toggleWishlist(car.id, e)}
                            aria-label="Add to wishlist"
                            className={`p-2 rounded-full transition-all ${
                              isFavorited
                                ? 'text-red-500 bg-red-50'
                                : 'text-[#90A3BF] hover:text-red-500 hover:bg-gray-50'
                            }`}
                          >
                            <Heart
                              className="w-5 h-5"
                              fill={isFavorited ? 'currentColor' : 'none'}
                            />
                          </button>
                        </div>

                        {/* Vehicle Image */}
                        <div className="relative w-full h-44 my-4 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
                          <Image
                            src={car.image}
                            alt={car.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          {car.isPopular && (
                            <span className="absolute top-2 left-2 bg-[#FF9F43] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs">
                              Popular
                            </span>
                          )}
                        </div>

                        {/* Vehicle Specs Bar */}
                        <div className="grid grid-cols-3 gap-2 py-3 border-t border-b border-gray-100 text-xs text-[#596780] font-medium my-2">
                          <div className="flex items-center gap-1.5">
                            <Users className="w-4 h-4 text-[#90A3BF]" />
                            <span>{car.seats} Seats</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Gauge className="w-4 h-4 text-[#90A3BF]" />
                            <span className="truncate">{car.transmission}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Fuel className="w-4 h-4 text-[#90A3BF]" />
                            <span className="truncate">{car.fuel}</span>
                          </div>
                        </div>

                        {/* Rating Row */}
                        <div className="flex items-center gap-1.5 mt-1 text-xs text-[#596780]">
                          <Star className="w-3.5 h-3.5 fill-[#FF9F43] text-[#FF9F43]" />
                          <span className="font-bold text-[#1A202C]">{car.rating.toFixed(1)}</span>
                          <span className="text-[#90A3BF]">({car.reviewsCount} reviews)</span>
                        </div>
                      </div>

                      {/* Card Footer: Price & Rent Now CTA */}
                      <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
                        <div>
                          <span className="text-lg sm:text-xl font-extrabold text-[#1A202C] font-jakarta">
                            ${car.price.toFixed(2)}
                          </span>
                          <span className="text-xs text-[#90A3BF] font-normal"> / day</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => setSelectedCarForBooking(car)}
                          className="bg-[#3563E9] text-white px-4 py-2.5 rounded-lg text-xs font-bold hover:bg-[#274ec8] active:scale-95 transition-all shadow-sm shadow-[#3563E9]/20 cursor-pointer"
                        >
                          Rent Now
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* ZERO RESULTS STATE */
              <div className="bg-white rounded-2xl border border-black/5 p-12 text-center shadow-sm space-y-4">
                <div className="w-16 h-16 rounded-full bg-blue-50 text-[#3563E9] flex items-center justify-center mx-auto">
                  <Car className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-bold text-[#1A202C]">No vehicles match your criteria</h3>
                <p className="text-sm text-[#596780] max-w-md mx-auto">
                  Try broadening your price range, clearing specific filters, or searching for another vehicle model.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="inline-flex items-center gap-2 bg-[#3563E9] text-white px-5 py-2.5 rounded-lg text-xs font-bold hover:bg-[#274ec8] active:scale-95 transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  Reset All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* MOBILE FILTER MODAL DRAWER */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />

          {/* Drawer content */}
          <div className="relative ml-auto w-full max-w-xs bg-white h-full p-6 overflow-y-auto shadow-2xl flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <div className="flex items-center gap-2 font-bold text-[#1A202C]">
                  <SlidersHorizontal className="w-5 h-5 text-[#3563E9]" />
                  <span>Filter Vehicles</span>
                </div>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-md text-gray-500 hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-[#90A3BF]">
                  Category
                </label>
                <div className="flex flex-col gap-1.5">
                  {CATEGORIES.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`text-left text-xs py-2 px-3 rounded-lg font-medium ${
                        selectedCategory === cat
                          ? 'bg-[#3563E9] text-white font-semibold'
                          : 'text-[#596780] hover:bg-gray-50'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Max Price */}
              <div className="space-y-2 pt-4 border-t border-gray-100">
                <div className="flex justify-between">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#90A3BF]">
                    Max Price
                  </label>
                  <span className="text-xs font-bold text-[#1A202C]">${maxPrice}/day</span>
                </div>
                <input
                  type="range"
                  min="40"
                  max="550"
                  step="10"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-[#3563E9]"
                />
              </div>

              {/* Seats */}
              <div className="space-y-2 pt-4 border-t border-gray-100">
                <label className="text-xs font-bold uppercase tracking-wider text-[#90A3BF]">
                  Capacity
                </label>
                <div className="grid grid-cols-2 gap-1.5">
                  {SEAT_OPTIONS.map((seat) => (
                    <button
                      key={seat}
                      type="button"
                      onClick={() => setSelectedSeatRange(seat)}
                      className={`text-xs py-2 px-2 rounded-lg font-medium text-center border ${
                        selectedSeatRange === seat
                          ? 'bg-[#3563E9]/10 border-[#3563E9] text-[#3563E9] font-bold'
                          : 'border-gray-200 text-[#596780]'
                      }`}
                    >
                      {seat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Transmission */}
              <div className="space-y-2 pt-4 border-t border-gray-100">
                <label className="text-xs font-bold uppercase tracking-wider text-[#90A3BF]">
                  Transmission
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {TRANSMISSIONS.map((tr) => (
                    <button
                      key={tr}
                      type="button"
                      onClick={() => setSelectedTransmission(tr)}
                      className={`text-xs py-2 rounded-lg font-medium text-center border ${
                        selectedTransmission === tr
                          ? 'bg-[#3563E9]/10 border-[#3563E9] text-[#3563E9] font-bold'
                          : 'border-gray-200 text-[#596780]'
                      }`}
                    >
                      {tr}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-gray-100 flex gap-2">
              <button
                type="button"
                onClick={resetFilters}
                className="flex-1 py-2.5 rounded-lg border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="flex-1 py-2.5 rounded-lg bg-[#3563E9] text-white text-xs font-bold hover:bg-[#274ec8]"
              >
                Apply ({filteredVehicles.length})
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Checkout Modal */}
      <BookingModal
        car={selectedCarForBooking}
        isOpen={!!selectedCarForBooking}
        onClose={() => setSelectedCarForBooking(null)}
      />
    </div>
  );
}

export default function VehiclesCatalogPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F6F7F9] p-8 text-center text-[#596780]">Loading catalog...</div>}>
      <VehiclesCatalogContent />
    </Suspense>
  );
}
