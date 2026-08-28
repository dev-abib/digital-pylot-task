'use client';

import React, { useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  Search,
  SlidersHorizontal,
  X,
  RotateCcw,
  ArrowUpDown,
  Car,
} from 'lucide-react';
import { MOCK_CARS, CarItem } from '@/data/mockData';
import { BookingModal } from '@/components/Cards/BookingModal';
import { VehicleCard } from '@/components/Pages/Vehicles/VehicleCard';
import { VehicleFilters } from '@/components/Pages/Vehicles/VehicleFilters';

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
      // 1. Text Search
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
    <div className="bg-[#F6F7F9] min-h-screen py-6 sm:py-8 lg:py-10 font-jakarta">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb & Title */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs text-[#90A3BF] mb-1">
              <Link href="/" className="hover:text-[#1A202C] transition-colors">
                Home
              </Link>
              <span>/</span>
              <span className="text-[#1A202C] font-semibold">Vehicles Catalog</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A202C] font-jakarta">
              Explore Our Premium Fleet
            </h1>
          </div>

          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-[#1A202C] shadow-xs cursor-pointer"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#3563E9]" />
            <span>Filters {hasActiveFilters && '(Active)'}</span>
          </button>
        </div>

        {/* MAIN LAYOUT: Sidebar Filters + Products Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 lg:gap-8">
          {/* DESKTOP SIDEBAR FILTERS */}
          <aside className="hidden lg:block lg:col-span-1 bg-white rounded-2xl p-6 border border-black/5 shadow-xs self-start sticky top-24">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-6">
              <h3 className="font-bold text-sm text-[#1A202C]">Search Filters</h3>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="text-xs text-[#3563E9] hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3 h-3" />
                  Reset
                </button>
              )}
            </div>

            <VehicleFilters
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
              maxPrice={maxPrice}
              onMaxPriceChange={setMaxPrice}
              selectedFuel={selectedFuel}
              onSelectFuel={setSelectedFuel}
              selectedTransmission={selectedTransmission}
              onSelectTransmission={setSelectedTransmission}
              selectedSeatRange={selectedSeatRange}
              onSelectSeatRange={setSelectedSeatRange}
            />
          </aside>

          {/* MAIN RESULTS CONTENT */}
          <main className="lg:col-span-3 space-y-6">
            {/* Top Toolbar: Search Input + Sorting */}
            <div className="bg-white rounded-2xl p-4 sm:p-5 border border-black/5 shadow-xs flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              {/* Search Bar */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search model, brand (e.g. Range Rover, Tesla)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#F6F7F9] pl-10 pr-4 py-2 text-xs border border-transparent rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#3563E9]/20 focus:border-[#3563E9] transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-2 shrink-0">
                <ArrowUpDown className="w-4 h-4 text-[#90A3BF] shrink-0" />
                <span className="text-xs text-[#90A3BF] font-medium hidden xs:inline">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as SortOption)}
                  className="bg-[#F6F7F9] text-xs font-bold text-[#1A202C] border-none rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#3563E9]/20 focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured / Popular</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating-desc">Highest Rated</option>
                  <option value="name-asc">Alphabetical (A-Z)</option>
                </select>
              </div>
            </div>

            {/* Active Filters Pill Bar */}
            {hasActiveFilters && (
              <div className="flex items-center gap-2 flex-wrap text-xs bg-white p-3 rounded-xl border border-black/5">
                <span className="text-[#90A3BF] font-medium">Active:</span>
                {selectedCategory !== 'All' && (
                  <span className="inline-flex items-center gap-1.5 bg-[#3563E9]/10 text-[#3563E9] text-xs font-semibold px-2.5 py-1 rounded-md">
                    {selectedCategory}
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
                  className="text-xs text-red-500 hover:text-red-600 font-semibold underline ml-auto cursor-pointer"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* VEHICLES GRID */}
            {filteredVehicles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5 sm:gap-6">
                {filteredVehicles.map((car) => (
                  <VehicleCard
                    key={car.id}
                    car={car}
                    isFavorited={wishlist.has(car.id)}
                    onToggleWishlist={toggleWishlist}
                    onRentNow={setSelectedCarForBooking}
                  />
                ))}
              </div>
            ) : (
              /* ZERO RESULTS STATE */
              <div className="bg-white rounded-2xl border border-black/5 p-12 text-center shadow-xs space-y-4">
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
                  className="inline-flex items-center gap-2 bg-[#3563E9] text-white px-5 py-2.5 rounded-lg text-xs font-bold hover:bg-[#274ec8] active:scale-95 transition-all cursor-pointer"
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
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setMobileFilterOpen(false)}
          />

          <div className="relative ml-auto w-full max-w-xs bg-white h-full p-6 overflow-y-auto shadow-2xl flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <h3 className="font-bold text-sm text-[#1A202C]">Filters</h3>
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(false)}
                  className="p-1 rounded-full text-gray-400 hover:text-gray-700"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <VehicleFilters
                selectedCategory={selectedCategory}
                onSelectCategory={setSelectedCategory}
                maxPrice={maxPrice}
                onMaxPriceChange={setMaxPrice}
                selectedFuel={selectedFuel}
                onSelectFuel={setSelectedFuel}
                selectedTransmission={selectedTransmission}
                onSelectTransmission={setSelectedTransmission}
                selectedSeatRange={selectedSeatRange}
                onSelectSeatRange={setSelectedSeatRange}
              />
            </div>

            <div className="pt-6 border-t border-gray-100 mt-6 space-y-2">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full py-2.5 bg-[#3563E9] text-white rounded-xl text-xs font-bold shadow-xs hover:bg-[#274ec8]"
              >
                Apply &amp; Show ({filteredVehicles.length})
              </button>
              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={resetFilters}
                  className="w-full py-2 bg-gray-50 text-gray-600 rounded-xl text-xs font-semibold hover:bg-gray-100"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* GLOBAL BOOKING MODAL */}
      {selectedCarForBooking && (
        <BookingModal
          isOpen={!!selectedCarForBooking}
          onClose={() => setSelectedCarForBooking(null)}
          car={selectedCarForBooking}
        />
      )}
    </div>
  );
}

export default function VehiclesPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#F6F7F9] flex items-center justify-center font-jakarta">
          <div className="text-center space-y-3">
            <div className="w-8 h-8 border-3 border-[#3563E9] border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-xs font-semibold text-gray-500">Loading fleet catalog...</p>
          </div>
        </div>
      }
    >
      <VehiclesCatalogContent />
    </Suspense>
  );
}
