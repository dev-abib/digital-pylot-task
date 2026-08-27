'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { Clock, Search, MoreVertical, Check, XCircle } from 'lucide-react';

export interface TransactionItem {
  id: number;
  carName: string;
  timeAgo: string;
  image: string;
  paymentMethod: string;
  transactionCode: string;
  status: 'Success' | 'Cancelled' | 'Pending';
  amount: string;
}

const DEFAULT_TRANSACTIONS: TransactionItem[] = [
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

interface RecentTransactionsProps {
  transactions?: TransactionItem[];
}

export function RecentTransactions({ transactions = DEFAULT_TRANSACTIONS }: RecentTransactionsProps) {
  const [dataList, setDataList] = useState<TransactionItem[]>(transactions);
  const [filterStatus, setFilterStatus] = useState<'All' | 'Success' | 'Pending' | 'Cancelled'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTxId, setSelectedTxId] = useState<number | null>(null);

  // Sync if external prop updates
  React.useEffect(() => {
    if (transactions && transactions.length > 0) {
      setDataList(transactions);
    }
  }, [transactions]);

  const filteredData = useMemo(() => {
    return dataList.filter((tx) => {
      const matchStatus = filterStatus === 'All' || tx.status === filterStatus;
      const matchSearch =
        !searchQuery ||
        tx.carName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.transactionCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tx.paymentMethod.toLowerCase().includes(searchQuery.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [dataList, filterStatus, searchQuery]);

  const handleUpdateStatus = (id: number, newStatus: 'Success' | 'Cancelled' | 'Pending') => {
    setDataList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );
    setSelectedTxId(null);
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs font-jakarta flex flex-col justify-between h-full">
      {/* Header with Title & Filter Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-3 mb-2">
        <div className="flex items-center gap-3">
          <h3 className="text-base font-bold text-gray-900">Recent Transactions</h3>
          <span className="bg-[#0275FF] text-white text-[10px] font-bold px-2 py-0.5 rounded-sm tracking-wide">
            Revenue
          </span>
        </div>

        {/* Search & Status Filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Status Tabs */}
          <div className="flex items-center bg-gray-100 p-0.5 rounded-lg text-xs">
            {(['All', 'Success', 'Pending', 'Cancelled'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setFilterStatus(tab)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                  filterStatus === tab
                    ? 'bg-white text-[#131825] shadow-xs'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Quick Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter..."
              className="bg-gray-50 border border-gray-200 rounded-lg pl-7 pr-2 py-1 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#FF9F43] w-24 sm:w-28 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto relative">
        <table className="w-full min-w-[540px] text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-50 text-[11px] font-semibold text-gray-400">
              <th className="py-2.5 px-2 w-8">#</th>
              <th className="py-2.5 px-3">Order Details</th>
              <th className="py-2.5 px-3">Payment</th>
              <th className="py-2.5 px-3">Status</th>
              <th className="py-2.5 px-3 text-right">Amount</th>
              <th className="py-2.5 px-2 text-right w-8">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-xs">
            {filteredData.length === 0 ? (
              <tr>
                <td colSpan={6} className="py-8 text-center text-gray-400 font-medium text-xs">
                  No transactions match the selected filter.
                </td>
              </tr>
            ) : (
              filteredData.map((tx) => (
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
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-[#28C76F] bg-[#28C76F]/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#28C76F]" />
                        Success
                      </span>
                    )}
                    {tx.status === 'Cancelled' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-[#EA5455] bg-[#EA5455]/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#EA5455]" />
                        Cancelled
                      </span>
                    )}
                    {tx.status === 'Pending' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold text-[#00CFE8] bg-[#00CFE8]/10">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#00CFE8]" />
                        Pending
                      </span>
                    )}
                  </td>

                  {/* Amount */}
                  <td className="py-3 px-3 text-right font-bold text-gray-900">{tx.amount}</td>

                  {/* Action Menu */}
                  <td className="py-3 px-2 text-right relative">
                    <button
                      type="button"
                      onClick={() => setSelectedTxId(selectedTxId === tx.id ? null : tx.id)}
                      className="w-6 h-6 rounded-md hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-700 cursor-pointer"
                    >
                      <MoreVertical className="w-3.5 h-3.5" />
                    </button>

                    {selectedTxId === tx.id && (
                      <div className="absolute right-2 mt-1 w-32 bg-white border border-gray-200 rounded-xl shadow-xl py-1 z-30 font-jakarta text-[11px] animate-in fade-in zoom-in-95 duration-150">
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(tx.id, 'Success')}
                          className="w-full text-left px-3 py-1.5 hover:bg-gray-50 text-[#28C76F] font-semibold flex items-center gap-1.5"
                        >
                          <Check className="w-3 h-3" /> Mark Success
                        </button>
                        <button
                          type="button"
                          onClick={() => handleUpdateStatus(tx.id, 'Cancelled')}
                          className="w-full text-left px-3 py-1.5 hover:bg-gray-50 text-[#EA5455] font-semibold flex items-center gap-1.5"
                        >
                          <XCircle className="w-3 h-3" /> Cancel Order
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer info */}
      <div className="pt-3 border-t border-gray-50 flex items-center justify-between text-xs text-gray-400">
        <span>Showing {filteredData.length} of {dataList.length} transactions</span>
        <button
          type="button"
          onClick={() => {
            setFilterStatus('All');
            setSearchQuery('');
          }}
          className="text-[#FF9F43] hover:underline font-semibold cursor-pointer"
        >
          Reset Filters
        </button>
      </div>
    </div>
  );
}
