'use client';

import React, { useState } from 'react';
import { CalendarCheck, Search, CheckCircle, XCircle, Clock, DollarSign } from 'lucide-react';

interface BookingItem {
  id: string;
  customerName: string;
  carName: string;
  pickupDate: string;
  returnDate: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  totalPrice: number;
  paymentMethod: string;
}

const INITIAL_BOOKINGS: BookingItem[] = [
  {
    id: 'BK-1099',
    customerName: 'Mike Witzel',
    carName: 'Range Rover Velar',
    pickupDate: '2026-09-01',
    returnDate: '2026-09-05',
    status: 'Confirmed',
    totalPrice: 1040.0,
    paymentMethod: 'Paypal',
  },
  {
    id: 'BK-1098',
    customerName: 'Sarah Jenkins',
    carName: 'Mercedes S-Class',
    pickupDate: '2026-09-03',
    returnDate: '2026-09-07',
    status: 'Confirmed',
    totalPrice: 480.0,
    paymentMethod: 'Apple Pay',
  },
  {
    id: 'BK-1097',
    customerName: 'David Zhang',
    carName: 'Aston Martin Vantage',
    pickupDate: '2026-09-02',
    returnDate: '2026-09-04',
    status: 'Pending',
    totalPrice: 390.0,
    paymentMethod: 'Stripe',
  },
  {
    id: 'BK-1096',
    customerName: 'Emily Clarke',
    carName: 'Toyota Corolla Hybrid',
    pickupDate: '2026-08-30',
    returnDate: '2026-09-02',
    status: 'Confirmed',
    totalPrice: 180.0,
    paymentMethod: 'Credit Card',
  },
];

export function BookingsView() {
  const [bookings, setBookings] = useState<BookingItem[]>(INITIAL_BOOKINGS);
  const [statusFilter, setStatusFilter] = useState<'All' | 'Confirmed' | 'Pending' | 'Cancelled'>('All');
  const [search, setSearch] = useState('');

  const filtered = bookings.filter((b) => {
    const matchStatus = statusFilter === 'All' || b.status === statusFilter;
    const matchSearch =
      !search ||
      b.customerName.toLowerCase().includes(search.toLowerCase()) ||
      b.carName.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase());
    return matchStatus && matchSearch;
  });

  const handleStatusChange = (id: string, newStatus: 'Confirmed' | 'Pending' | 'Cancelled') => {
    setBookings((prev) => prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b)));
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs font-jakarta space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Bookings &amp; Reservation Manifest</h2>
          <p className="text-xs text-gray-500">Live manifest of all customer car bookings and check-in statuses</p>
        </div>

        <div className="flex items-center gap-2">
          {/* Status Tabs */}
          <div className="flex items-center bg-gray-100 p-0.5 rounded-lg text-xs">
            {(['All', 'Confirmed', 'Pending', 'Cancelled'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setStatusFilter(tab)}
                className={`px-3 py-1 rounded-md font-semibold transition-all cursor-pointer ${
                  statusFilter === tab ? 'bg-white text-[#131825] shadow-xs' : 'text-gray-500'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs min-w-[600px]">
          <thead>
            <tr className="border-b border-gray-100 text-gray-400 font-semibold">
              <th className="py-3 px-3">Booking ID</th>
              <th className="py-3 px-3">Customer</th>
              <th className="py-3 px-3">Vehicle</th>
              <th className="py-3 px-3">Rental Dates</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3">Total</th>
              <th className="py-3 px-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filtered.map((b) => (
              <tr key={b.id} className="hover:bg-gray-50/80 transition-colors">
                <td className="py-3.5 px-3 font-bold text-[#0275FF]">{b.id}</td>
                <td className="py-3.5 px-3 font-bold text-gray-900">{b.customerName}</td>
                <td className="py-3.5 px-3 text-gray-700">{b.carName}</td>
                <td className="py-3.5 px-3 text-gray-500">{b.pickupDate} → {b.returnDate}</td>
                <td className="py-3.5 px-3">
                  <span
                    className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${
                      b.status === 'Confirmed'
                        ? 'bg-[#28C76F]/10 text-[#28C76F]'
                        : b.status === 'Pending'
                        ? 'bg-[#00CFE8]/10 text-[#00CFE8]'
                        : 'bg-[#EA5455]/10 text-[#EA5455]'
                    }`}
                  >
                    {b.status}
                  </span>
                </td>
                <td className="py-3.5 px-3 font-bold text-gray-900">${b.totalPrice.toFixed(2)}</td>
                <td className="py-3.5 px-3 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    {b.status !== 'Confirmed' && (
                      <button
                        type="button"
                        onClick={() => handleStatusChange(b.id, 'Confirmed')}
                        className="p-1.5 rounded-lg text-[#28C76F] hover:bg-[#28C76F]/10"
                        title="Confirm Booking"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                    )}
                    {b.status !== 'Cancelled' && (
                      <button
                        type="button"
                        onClick={() => handleStatusChange(b.id, 'Cancelled')}
                        className="p-1.5 rounded-lg text-[#EA5455] hover:bg-[#EA5455]/10"
                        title="Cancel Booking"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
