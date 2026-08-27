'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { CarItem, MOCK_CARS } from '@/data/mockData';
import { Search, Plus, Trash2, CheckCircle2, Star, Fuel, Users } from 'lucide-react';

interface FleetViewProps {
  vehicles?: CarItem[];
  onOpenAddModal: () => void;
  onDeleteVehicle?: (id: string) => void;
}

export function FleetView({ vehicles = MOCK_CARS, onOpenAddModal, onDeleteVehicle }: FleetViewProps) {
  const [fleet, setFleet] = useState<CarItem[]>(vehicles);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  React.useEffect(() => {
    setFleet(vehicles);
  }, [vehicles]);

  const filteredFleet = useMemo(() => {
    return fleet.filter((car) => {
      const matchCategory = selectedCategory === 'All' || car.category === selectedCategory;
      const matchSearch =
        !searchQuery ||
        car.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        car.type.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [fleet, selectedCategory, searchQuery]);

  const handleDelete = (id: string) => {
    setFleet((prev) => prev.filter((c) => c.id !== id));
    onDeleteVehicle?.(id);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs font-jakarta space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Fleet Inventory Management</h2>
          <p className="text-xs text-gray-500">Monitor and manage all active rental vehicles and rates</p>
        </div>

        <button
          type="button"
          onClick={onOpenAddModal}
          className="flex items-center gap-2 bg-[#FF9F43] hover:bg-[#FF8A00] text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs hover:shadow transition-all active:scale-95 cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Add New Car</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {['All', 'Popular', 'Large Car', 'Small Car', 'Exclusive Car'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#131825] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search fleet model..."
            className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-3 py-1.5 text-xs text-gray-800 focus:outline-none focus:border-[#FF9F43]"
          />
        </div>
      </div>

      {/* Vehicles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredFleet.map((car) => (
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
                  sizes="200px"
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              <h4 className="text-sm font-bold text-gray-900 group-hover:text-[#FF9F43] transition-colors">
                {car.name}
              </h4>
              <p className="text-xs text-gray-500 mb-2">{car.type}</p>

              <div className="flex items-center gap-3 text-[11px] text-gray-400 py-2 border-y border-gray-50">
                <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {car.seats} Seats</span>
                <span className="flex items-center gap-1"><Fuel className="w-3 h-3" /> {car.fuel}</span>
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
    </div>
  );
}
