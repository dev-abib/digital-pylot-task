'use client';

import React, { useState } from 'react';
import { X, Plus, Car, DollarSign, Users, Fuel } from 'lucide-react';
import { CarItem } from '@/data/mockData';

interface AddVehicleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddVehicle: (newCar: CarItem) => void;
}

export function AddVehicleModal({ isOpen, onClose, onAddVehicle }: AddVehicleModalProps) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState<'Popular' | 'Large Car' | 'Small Car' | 'Exclusive Car'>('Popular');
  const [type, setType] = useState('Luxury SUV');
  const [price, setPrice] = useState('120');
  const [seats, setSeats] = useState('5');
  const [transmission, setTransmission] = useState<'Automatic' | 'Manual'>('Automatic');
  const [fuel, setFuel] = useState('Gasoline');

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newVehicle: CarItem = {
      id: `car-${Date.now()}`,
      name: name.trim(),
      category,
      type,
      price: Number(price) || 99,
      image: '/car_full_1.jpg',
      seats: Number(seats) || 5,
      transmission,
      fuel,
      rating: 5.0,
      reviewsCount: 1,
      isPopular: category === 'Popular',
    };

    onAddVehicle(newVehicle);
    onClose();
    setName('');
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-jakarta animate-in fade-in duration-200 cursor-pointer"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#FFF4EC] text-[#FF8A00] flex items-center justify-center">
              <Plus className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">Add New Vehicle to Fleet</h3>
              <p className="text-xs text-gray-500">Register a new car for instant storefront availability</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mt-5 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Vehicle Name / Model *</label>
            <div className="relative">
              <Car className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. 2026 Porsche Macan GTS"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-3 py-2 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF9F43]/20 focus:border-[#FF9F43]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#FF9F43]"
              >
                <option value="Popular">Popular</option>
                <option value="Large Car">Large Car (SUV/Van)</option>
                <option value="Small Car">Small Car (Sedan/Hatch)</option>
                <option value="Exclusive Car">Exclusive Car (Supercar)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Body Type</label>
              <input
                type="text"
                value={type}
                onChange={(e) => setType(e.target.value)}
                placeholder="e.g. Luxury SUV, Sports Coupe"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#FF9F43]"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Daily Rate ($)</label>
              <div className="relative">
                <DollarSign className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="120"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-7 pr-2 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#FF9F43]"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Seats</label>
              <div className="relative">
                <Users className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="number"
                  value={seats}
                  onChange={(e) => setSeats(e.target.value)}
                  placeholder="5"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-7 pr-2 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#FF9F43]"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Transmission</label>
              <select
                value={transmission}
                onChange={(e) => setTransmission(e.target.value as any)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-2 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#FF9F43]"
              >
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex items-center justify-end gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-lg bg-[#FF9F43] hover:bg-[#FF8A00] text-white font-bold shadow-xs hover:shadow transition-all active:scale-95 cursor-pointer"
            >
              Add Vehicle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
