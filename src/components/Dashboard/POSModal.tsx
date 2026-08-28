'use client';

import React, { useState } from 'react';
import { X, Monitor, CheckCircle, Car, CreditCard, ShieldCheck } from 'lucide-react';
import { MOCK_CARS } from '@/data/mockData';

interface POSModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateBooking: (booking: any) => void;
}

export function POSModal({ isOpen, onClose, onCreateBooking }: POSModalProps) {
  const [selectedCarId, setSelectedCarId] = useState(MOCK_CARS[0].id);
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [days, setDays] = useState(3);
  const [paymentMethod, setPaymentMethod] = useState('Credit Card POS');
  const [isSuccess, setIsSuccess] = useState(false);

  React.useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsSuccess(false);
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const car = MOCK_CARS.find((c) => c.id === selectedCarId) || MOCK_CARS[0];
  const totalPrice = car.price * days;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    const newTx = {
      id: Math.floor(Math.random() * 9000) + 1000,
      carName: car.name,
      timeAgo: 'Just now',
      image: car.image,
      paymentMethod,
      transactionCode: `#POS-${Date.now().toString().slice(-8)}`,
      status: 'Success' as const,
      amount: `$${totalPrice.toFixed(2)}`,
    };

    onCreateBooking(newTx);
    setIsSuccess(true);
  };

  const handleDone = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-jakarta animate-in fade-in duration-200 cursor-pointer"
      onClick={handleDone}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl p-6 border border-gray-100 cursor-default"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#131825] text-white flex items-center justify-center">
              <Monitor className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-gray-900">Express POS Terminal</h3>
              <p className="text-xs text-gray-500">Walk-in customer checkout &amp; instant contract creation</p>
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

        {isSuccess ? (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-[#28C76F]/20 text-[#28C76F] flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <h4 className="text-lg font-bold text-gray-900">POS Transaction Complete!</h4>
              <p className="text-xs text-gray-500 mt-1">
                Receipt printed and vehicle marked reserved for {customerName || 'Walk-in Client'}.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-xl text-left text-xs space-y-1.5 border border-gray-200">
              <p><span className="text-gray-500">Vehicle:</span> <span className="font-bold">{car.name}</span></p>
              <p><span className="text-gray-500">Duration:</span> <span className="font-bold">{days} Days</span></p>
              <p><span className="text-gray-500">Paid:</span> <span className="font-bold text-[#28C76F]">${totalPrice.toFixed(2)} ({paymentMethod})</span></p>
            </div>
            <button
              type="button"
              onClick={handleDone}
              className="w-full bg-[#131825] text-white py-2.5 rounded-lg text-xs font-bold hover:bg-black transition-all"
            >
              Done &amp; Return to Dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={handleCheckout} className="mt-5 space-y-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Select Available Vehicle</label>
              <select
                value={selectedCarId}
                onChange={(e) => setSelectedCarId(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 font-semibold focus:outline-none focus:border-[#FF9F43]"
              >
                {MOCK_CARS.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} — ${c.price}/day ({c.type})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Customer Full Name</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Alex Morgan"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#FF9F43]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Contact Phone</label>
                <input
                  type="tel"
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="+44 7700 900077"
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#FF9F43]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Rental Days</label>
                <input
                  type="number"
                  min="1"
                  max="30"
                  value={days}
                  onChange={(e) => setDays(Math.max(1, Number(e.target.value)))}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#FF9F43]"
                />
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs text-gray-800 focus:outline-none focus:border-[#FF9F43]"
                >
                  <option value="Credit Card POS">Card Terminal (POS)</option>
                  <option value="Cash">Cash Deposit</option>
                  <option value="Apple Pay">Apple Pay / NFC</option>
                  <option value="Bank Transfer">Direct Wire</option>
                </select>
              </div>
            </div>

            <div className="bg-[#FFF4EC] p-3.5 rounded-xl border border-[#FFE6D4] flex items-center justify-between">
              <div>
                <p className="text-[11px] text-[#FF8A00] font-semibold">Total Payable Now</p>
                <p className="text-xl font-extrabold text-[#131825]">${totalPrice.toFixed(2)}</p>
              </div>
              <span className="text-[10px] bg-white px-2 py-1 rounded-md text-gray-600 font-bold border border-black/5">
                Instant Release
              </span>
            </div>

            <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2.5">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-gray-200 text-gray-600 font-semibold hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-[#131825] hover:bg-black text-white font-bold shadow-xs hover:shadow transition-all active:scale-95 cursor-pointer"
              >
                Process Payment &amp; Issue Key
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
