'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { CarItem } from '@/data/mockData';

interface BookingModalProps {
  car: CarItem | null;
  isOpen: boolean;
  onClose: () => void;
  initialPickupDate?: string;
  initialReturnDate?: string;
  initialLocation?: string;
}

export function BookingModal({
  car,
  isOpen,
  onClose,
  initialPickupDate = '2026-09-01',
  initialReturnDate = '2026-09-04',
  initialLocation = 'London Heathrow Airport (LHR)',
}: BookingModalProps) {
  const [pickupDate, setPickupDate] = useState(initialPickupDate);
  const [returnDate, setReturnDate] = useState(initialReturnDate);
  const [location, setLocation] = useState(initialLocation);
  const [insurance, setInsurance] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    if (initialPickupDate) setPickupDate(initialPickupDate);
    if (initialReturnDate) setReturnDate(initialReturnDate);
    if (initialLocation) setLocation(initialLocation);
  }, [initialPickupDate, initialReturnDate, initialLocation, isOpen]);

  const handleClose = React.useCallback(() => {
    setIsSuccess(false);
    onClose();
  }, [onClose]);

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleClose]);

  if (!isOpen || !car) return null;

  // Calculate rental duration in days
  const start = new Date(pickupDate);
  const end = new Date(returnDate);
  const diffTime = Math.max(end.getTime() - start.getTime(), 1000 * 3600 * 24);
  const rentalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;

  const basePrice = (car?.price || 0) * rentalDays;
  const insurancePrice = insurance ? 15 * rentalDays : 0;
  const totalPrice = basePrice + insurancePrice;

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Post to Leads / Telegram automation pipeline
      await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: customerName || 'Valued Customer',
          customerEmail: customerEmail || 'guest@bestauto.com',
          carName: car.name,
          carPrice: car.price,
          pickupDate,
          returnDate,
          totalPrice,
          source: 'storefront_booking',
          notes: `Location: ${location}, Insurance: ${insurance ? 'Yes ($15/d Zero Excess)' : 'Standard'}`,
        }),
      });

      // 2. Post to Bookings Manifest registry
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: customerName || 'Valued Customer',
          carName: car.name,
          pickupDate,
          returnDate,
          totalPrice,
          paymentMethod: 'Credit Card',
        }),
      });
    } catch (err) {
      console.error('Booking dispatch error:', err);
    } finally {
      setIsSubmitting(false);
      setIsSuccess(true);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-jakarta animate-in fade-in duration-200 cursor-pointer"
      onClick={handleClose}
    >
      <div 
        className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-[#cbd0d8]/30">
          <div>
            <h2 className="font-rubik text-xl sm:text-2xl font-bold text-[#131825]">
              {isSuccess ? 'Reservation Confirmed!' : `Rent ${car.name}`}
            </h2>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5">
              {isSuccess ? 'Your rental confirmation details' : `${car.type} • $${car.price.toFixed(2)}/day`}
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Close modal"
            className="p-2 rounded-full hover:bg-black/10 text-gray-600 hover:text-black cursor-pointer transition-colors"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {isSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="font-rubik text-2xl font-bold text-[#131825]">
                Booking Successful!
              </h3>
              <p className="text-sm text-gray-600 max-w-md mx-auto">
                Thank you, <strong className="text-black">{customerName || 'Customer'}</strong>! We have reserved your{' '}
                <strong className="text-black">{car.name}</strong> for {rentalDays} days. A receipt has been sent to{' '}
                <strong className="text-black">{customerEmail || 'your email'}</strong>.
              </p>

              <div className="p-4 bg-gray-50 rounded-2xl text-left text-sm space-y-2 border border-gray-100 mt-4">
                <div className="flex justify-between">
                  <span className="text-gray-500">Pickup Date:</span>
                  <span className="font-semibold text-black">{pickupDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Return Date:</span>
                  <span className="font-semibold text-black">{returnDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Pickup Location:</span>
                  <span className="font-semibold text-black">{location}</span>
                </div>
                <div className="flex justify-between pt-2 border-t font-bold text-base text-black">
                  <span>Total Paid:</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleClose}
                className="w-full mt-4 bg-[#131825] text-white py-3 rounded-xl font-semibold hover:bg-black active:scale-98 cursor-pointer transition-all"
              >
                Done
              </button>
            </div>
          ) : (
            <form onSubmit={handleBookingSubmit} className="space-y-5">
              {/* Car Banner */}
              <div className="flex items-center gap-4 p-3.5 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="relative w-20 h-16 rounded-xl overflow-hidden bg-gray-200 shrink-0">
                  <Image src={car.image} alt={car.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="font-rubik font-bold text-base text-[#131825]">{car.name}</h4>
                  <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                    <span>{car.seats} Seats</span>
                    <span>•</span>
                    <span>{car.transmission}</span>
                    <span>•</span>
                    <span>{car.fuel}</span>
                  </div>
                </div>
              </div>

              {/* Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-black/10 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-black/10 focus:outline-none"
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Pickup Date
                  </label>
                  <input
                    type="date"
                    required
                    value={pickupDate}
                    onChange={(e) => setPickupDate(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-black/10 focus:outline-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">
                    Return Date
                  </label>
                  <input
                    type="date"
                    required
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full px-3.5 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-black/10 focus:outline-none cursor-pointer"
                  />
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">
                  Pickup &amp; Return Location
                </label>
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm border rounded-xl focus:ring-2 focus:ring-black/10 focus:outline-none cursor-pointer bg-white"
                >
                  <option value="London Heathrow Airport (LHR)">London Heathrow Airport (LHR)</option>
                  <option value="London Gatwick Airport (LGW)">London Gatwick Airport (LGW)</option>
                  <option value="Central London Oxford Street">Central London Oxford Street</option>
                  <option value="Manchester Airport (MAN)">Manchester Airport (MAN)</option>
                </select>
              </div>

              {/* Addons */}
              <label className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={insurance}
                  onChange={(e) => setInsurance(e.target.checked)}
                  className="w-4 h-4 rounded text-black focus:ring-black cursor-pointer"
                />
                <div className="flex-1 text-xs">
                  <span className="font-semibold text-gray-900">Comprehensive Zero-Deductible Insurance</span>
                  <span className="block text-gray-500">Covers collision &amp; theft protection (+$15/day)</span>
                </div>
              </label>

              {/* Cost Summary */}
              <div className="p-4 bg-gray-50 rounded-2xl space-y-1.5 text-xs">
                <div className="flex justify-between text-gray-600">
                  <span>${car.price.toFixed(2)} × {rentalDays} Days</span>
                  <span>${basePrice.toFixed(2)}</span>
                </div>
                {insurance && (
                  <div className="flex justify-between text-gray-600">
                    <span>Full Insurance</span>
                    <span>${insurancePrice.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between font-bold text-base text-[#131825] pt-2 border-t border-gray-200">
                  <span>Total Amount</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#131825] text-white py-3.5 rounded-xl font-bold hover:bg-black active:scale-98 cursor-pointer transition-all shadow-md disabled:opacity-60 text-xs sm:text-sm"
              >
                {isSubmitting ? 'Processing Reservation...' : `Confirm & Book Now ($${totalPrice.toFixed(2)})`}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
