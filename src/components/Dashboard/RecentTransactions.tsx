'use client';

import React from 'react';
import Image from 'next/image';
import { Clock } from 'lucide-react';

interface TransactionItem {
  id: number;
  carName: string;
  timeAgo: string;
  image: string;
  paymentMethod: string;
  transactionCode: string;
  status: 'Success' | 'Cancelled' | 'Pending';
  amount: string;
}

const TRANSACTIONS: TransactionItem[] = [
  {
    id: 1,
    carName: 'Range Rover',
    timeAgo: '15 Mins',
    image: '/car_full_1.jpg',
    paymentMethod: 'Paypal',
    transactionCode: '#416645453773',
    status: 'Success',
    amount: '$1099.00',
  },
  {
    id: 2,
    carName: 'Red Toyota',
    timeAgo: '15 Mins',
    image: '/car_full_2.jpg',
    paymentMethod: 'Apple Pay',
    transactionCode: '#147784454554',
    status: 'Cancelled',
    amount: '$600.55',
  },
  {
    id: 3,
    carName: 'blue Nissan',
    timeAgo: '15 Mins',
    image: '/car_rush.jpg',
    paymentMethod: 'Stripe',
    transactionCode: '#147784454554',
    status: 'Pending',
    amount: '$200.10',
  },
  {
    id: 4,
    carName: 'Toyota Corolla',
    timeAgo: '15 Mins',
    image: '/why_choose_us_car.jpg',
    paymentMethod: 'PayU',
    transactionCode: '#147784454554',
    status: 'Success',
    amount: '$1569.00',
  },
  {
    id: 5,
    carName: 'Range Rover',
    timeAgo: '15 Mins',
    image: '/promo_banner_1.jpg',
    paymentMethod: 'Paytm',
    transactionCode: '#147784454554',
    status: 'Success',
    amount: '$1478.00',
  },
];

export function RecentTransactions() {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs font-jakarta flex flex-col justify-between h-full">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-50 mb-2">
        <div className="flex items-center gap-3">
          <h3 className="text-base font-bold text-gray-900">Recent Transactions</h3>
          <span className="bg-[#0275FF] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm tracking-wide">
            Revenue
          </span>
        </div>

        <button
          type="button"
          className="text-xs font-medium text-gray-500 hover:text-gray-900 border border-gray-200 rounded-lg px-2.5 py-1 hover:bg-gray-50 transition-colors"
        >
          View All
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full min-w-[500px] text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-50 text-[11px] font-semibold text-gray-400">
              <th className="py-2.5 px-2 w-8">#</th>
              <th className="py-2.5 px-3">Order Details</th>
              <th className="py-2.5 px-3">Payment</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right">Amount</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-xs">
            {TRANSACTIONS.map((tx) => (
              <tr key={tx.id} className="hover:bg-gray-50/70 transition-colors group">
                {/* ID */}
                <td className="py-3 px-2 text-gray-400 font-medium">{tx.id}</td>

                {/* Order Details */}
                <td className="py-3 px-3">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-8 rounded-lg overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                      <Image
                        src={tx.image}
                        alt={tx.carName}
                        fill
                        sizes="40px"
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-gray-900 leading-snug group-hover:text-[#FF9F43] transition-colors">
                        {tx.carName}
                      </p>
                      <div className="flex items-center gap-1 text-[10px] text-gray-400 mt-0.5">
                        <Clock className="w-2.5 h-2.5" />
                        <span>{tx.timeAgo}</span>
                      </div>
                    </div>
                  </div>
                </td>

                {/* Payment */}
                <td className="py-3 px-3">
                  <div>
                    <p className="text-gray-700 font-medium">{tx.paymentMethod}</p>
                    <p className="text-[10px] text-[#0275FF] font-semibold hover:underline cursor-pointer">
                      {tx.transactionCode}
                    </p>
                  </div>
                </td>

                {/* Status Badge */}
                <td className="py-3 px-3">
                  {tx.status === 'Success' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-[#28C76F] text-white">
                      ● Success
                    </span>
                  )}
                  {tx.status === 'Cancelled' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-[#EA5455] text-white">
                      ● Cancelled
                    </span>
                  )}
                  {tx.status === 'Pending' && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-semibold bg-[#00CFE8] text-white">
                      ● Pending
                    </span>
                  )}
                </td>

                {/* Amount */}
                <td className="py-3 px-3 text-right font-bold text-gray-900">
                  {tx.amount}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
