'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { CarItem, MOCK_CARS } from '@/data/mockData';
import {
  Search,
  Plus,
  Trash2,
  Star,
  Fuel,
  Users,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  X,
  Car,
  Filter,
} from 'lucide-react';

interface FleetViewProps {
  vehicles?: CarItem[];
  onOpenAddModal: () => void;
  onDeleteVehicle?: (id: string) => void;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}

type SortOption = 'default' | 'price-asc' | 'price-desc' | 'rating-desc' | 'name-asc' | 'name-desc';

export function FleetView({
  vehicles = MOCK_CARS,
  onOpenAddModal,
  onDeleteVehicle,
  searchQuery: externalSearchQuery,
  onSearchChange: externalOnSearchChange,
}: FleetViewProps) {
  const [fleet, setFleet] = useState<CarItem[]>(vehicles);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [localSearch, setLocalSearch] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('default');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const currentSearch = externalSearchQuery !== undefined ? externalSearchQuery : localSearch;
  const handleSearchUpdate = (val: string) => {
    setLocalSearch(val);
    externalOnSearchChange?.(val);
    setCurrentPage(1);
  };

  React.useEffect(() => {
    setFleet(vehicles);
  }, [vehicles]);

  // Filter & Sort Logic
  const filteredAndSortedFleet = useMemo(() => {
    const result = fleet.filter((car) => {
      const matchCategory = selectedCategory === 'All' || car.category === selectedCategory;
      const q = currentSearch.toLowerCase().trim();
      const matchSearch =
        !q ||
        car.name.toLowerCase().includes(q) ||
        car.type.toLowerCase().includes(q) ||
        car.category.toLowerCase().includes(q);
      return matchCategory && matchSearch;
    });

    // Sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    return result;
  }, [fleet, selectedCategory, currentSearch, sortBy]);

  // Pagination calculation
  const totalItems = filteredAndSortedFleet.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const validPage = Math.min(currentPage, totalPages);
  const startIndex = (validPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedFleet = filteredAndSortedFleet.slice(startIndex, endIndex);

  const handleDelete = (id: string) => {
    setFleet((prev) => prev.filter((c) => c.id !== id));
    onDeleteVehicle?.(id);
  };

  const handleCategoryChange = (cat: string) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortOption);
    setCurrentPage(1);
  };

  return (
    <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-xs font-jakarta space-y-6">
      {/* Top Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-[#FF8A00] flex items-center justify-center shrink-0">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900 leading-tight">Fleet Inventory Management</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              {totalItems} total vehicles registered • Real-time rates &amp; availability
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenAddModal}
          className="flex items-center gap-2 bg-[#FF9F43] hover:bg-[#FF8A00] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs hover:shadow transition-all active:scale-95 cursor-pointer w-fit self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add New Car</span>
        </button>
      </div>

      {/* Filter, Sort & Search Toolbar */}
      <div className="space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Category Pills */}
          <div className="flex flex-wrap items-center gap-1.5">
            {['All', 'Popular', 'Large Car', 'Small Car', 'Exclusive Car'].map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => handleCategoryChange(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#131825] text-white shadow-2xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search, Sort, and View Controls */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-60 min-w-[180px]">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={currentSearch}
                onChange={(e) => handleSearchUpdate(e.target.value)}
                placeholder="Search model, type..."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-8 py-1.5 text-xs text-gray-800 focus:outline-none focus:border-[#FF9F43] transition-colors"
              />
              {currentSearch && (
                <button
                  type="button"
                  onClick={() => handleSearchUpdate('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={handleSortChange}
                aria-label="Sort vehicles"
                className="bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-lg px-3 py-1.5 pr-8 focus:outline-none focus:border-[#FF9F43] cursor-pointer appearance-none font-medium"
              >
                <option value="default">Default Sorting</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating-desc">Highest Rated</option>
                <option value="name-asc">Name: A to Z</option>
                <option value="name-desc">Name: Z to A</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 p-0.5 rounded-lg shrink-0">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'grid' ? 'bg-white text-[#131825] shadow-xs' : 'text-gray-400 hover:text-gray-700'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'table' ? 'bg-white text-[#131825] shadow-xs' : 'text-gray-400 hover:text-gray-700'
                }`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Summary & Active Filter Tags */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
          <p>
            Showing <span className="font-bold text-gray-900">{totalItems === 0 ? 0 : startIndex + 1}</span> to{' '}
            <span className="font-bold text-gray-900">{endIndex}</span> of{' '}
            <span className="font-bold text-gray-900">{totalItems}</span> vehicles
          </p>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-gray-400 hidden sm:inline">Per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              aria-label="Items per page"
              className="bg-gray-50 border border-gray-200 text-gray-700 text-[11px] rounded px-2 py-0.5 focus:outline-none cursor-pointer"
            >
              <option value={4}>4</option>
              <option value={8}>8</option>
              <option value={12}>12</option>
              <option value={16}>16</option>
            </select>
          </div>
        </div>
      </div>

      {/* Zero Results State */}
      {paginatedFleet.length === 0 ? (
        <div className="py-16 text-center space-y-3 bg-gray-50/60 rounded-2xl border border-dashed border-gray-200">
          <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mx-auto">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-sm font-bold text-gray-900">No vehicles match your criteria</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            Try adjusting your search terms, switching categories, or resetting the sort order.
          </p>
          <button
            type="button"
            onClick={() => {
              setSelectedCategory('All');
              handleSearchUpdate('');
              setSortBy('default');
            }}
            className="text-xs font-bold text-[#FF8A00] hover:underline cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {paginatedFleet.map((car) => (
            <div
              key={car.id}
              className="bg-white border border-gray-200 rounded-2xl p-4 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-[#FF8A00] bg-[#FFF4EC] px-2 py-0.5 rounded-md">
                    {car.category}
                  </span>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-gray-700">
                    <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                    <span>{car.rating}</span>
                  </div>
                </div>

                <div className="relative w-full h-32 rounded-xl overflow-hidden bg-gray-50 mb-3 border border-gray-100">
                  <Image
                    src={car.image}
                    alt={car.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 250px"
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>

                <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#FF9F43] transition-colors">
                  {car.name}
                </h4>
                <p className="text-xs text-gray-500 mb-2">{car.type}</p>

                <div className="flex items-center gap-3 text-[11px] text-gray-400 py-2 border-y border-gray-50">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" /> {car.seats} Seats
                  </span>
                  <span className="flex items-center gap-1">
                    <Fuel className="w-3 h-3" /> {car.fuel}
                  </span>
                  <span>{car.transmission}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 mt-2">
                <div>
                  <span className="text-xs text-gray-400 font-medium">Daily</span>
                  <p className="text-base font-extrabold text-gray-900">${car.price}</p>
                </div>

                <button
                  type="button"
                  onClick={() => handleDelete(car.id)}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                  title="Remove vehicle"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* TABLE VIEW */
        <div className="overflow-x-auto border border-gray-100 rounded-2xl">
          <table className="w-full text-left text-xs min-w-[650px]">
            <thead>
              <tr className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
                <th className="py-3 px-4">Vehicle</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Specs</th>
                <th className="py-3 px-4">Rating</th>
                <th className="py-3 px-4">Daily Rate</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-medium">
              {paginatedFleet.map((car) => (
                <tr key={car.id} className="hover:bg-gray-50/80 transition-colors">
                  <td className="py-3 px-4 flex items-center gap-3">
                    <div className="relative w-12 h-9 rounded-lg overflow-hidden bg-gray-100 border border-gray-200 shrink-0">
                      <Image src={car.image} alt={car.name} fill className="object-cover" sizes="48px" />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900">{car.name}</p>
                      <p className="text-[10px] text-gray-400">{car.type}</p>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="text-[10px] font-bold text-[#FF8A00] bg-[#FFF4EC] px-2 py-0.5 rounded">
                      {car.category}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600 text-[11px]">
                    {car.seats} Seats • {car.fuel} • {car.transmission}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1 font-bold text-gray-700">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span>{car.rating}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-extrabold text-gray-900 text-sm">
                    ${car.price}<span className="text-[10px] font-normal text-gray-400">/day</span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => handleDelete(car.id)}
                      className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Remove vehicle"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            Page <span className="font-bold text-gray-900">{validPage}</span> of{' '}
            <span className="font-bold text-gray-900">{totalPages}</span>
          </p>

          <div className="flex items-center gap-1.5">
            {/* Prev Button */}
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={validPage === 1}
              className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Page Number Buttons */}
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
              <button
                key={pageNum}
                type="button"
                onClick={() => setCurrentPage(pageNum)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  validPage === pageNum
                    ? 'bg-[#131825] text-white shadow-xs'
                    : 'text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                {pageNum}
              </button>
            ))}

            {/* Next Button */}
            <button
              type="button"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={validPage === totalPages}
              className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
