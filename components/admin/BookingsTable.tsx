'use client';

import React from 'react';
import { Booking, BookingStatus } from '@/lib/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Calendar, User } from 'lucide-react';

interface BookingsTableProps {
  bookings: Booking[];
}

export function BookingsTable({ bookings }: BookingsTableProps) {
  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-emerald-500/15 text-emerald-400 border border-emerald-500/20 font-medium">Active Driving</Badge>;
      case 'confirmed':
        return <Badge className="bg-blue-500/15 text-blue-400 border border-blue-500/20 font-medium">Confirmed</Badge>;
      case 'pending':
        return <Badge className="bg-amber-500/15 text-amber-400 border border-amber-500/20 font-medium">Pending Review</Badge>;
      case 'completed':
        return <Badge className="bg-slate-500/15 text-slate-400 border border-slate-500/20 font-medium">Completed</Badge>;
      case 'cancelled':
        return <Badge className="bg-rose-500/15 text-rose-400 border border-rose-500/20 font-medium">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card className="border-slate-200 dark:border-slate-800 shadow-sm bg-white dark:bg-slate-900">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <div>
          <CardTitle className="text-base font-bold text-slate-900 dark:text-white">
            Recent Fleet Bookings & Manifest
          </CardTitle>
          <CardDescription className="text-xs text-slate-500">
            Real-time reservations synced with the booking engine
          </CardDescription>
        </div>
        <Badge variant="outline" className="text-xs text-slate-500">
          Showing {bookings.length} reservations
        </Badge>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-slate-50 dark:bg-slate-800/50">
              <TableRow className="border-slate-200 dark:border-slate-800">
                <TableHead className="text-xs font-semibold text-slate-600 dark:text-slate-300">Booking Ref</TableHead>
                <TableHead className="text-xs font-semibold text-slate-600 dark:text-slate-300">Vehicle</TableHead>
                <TableHead className="text-xs font-semibold text-slate-600 dark:text-slate-300">Customer</TableHead>
                <TableHead className="text-xs font-semibold text-slate-600 dark:text-slate-300">Schedule</TableHead>
                <TableHead className="text-xs font-semibold text-slate-600 dark:text-slate-300">Amount</TableHead>
                <TableHead className="text-xs font-semibold text-slate-600 dark:text-slate-300">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-xs text-slate-500">
                    No reservations found matching the current filter.
                  </TableCell>
                </TableRow>
              ) : (
                bookings.map((b) => (
                  <TableRow key={b.id} className="border-slate-100 dark:border-slate-800/60 hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <TableCell className="font-mono text-xs font-bold text-amber-500">
                      {b.bookingNumber}
                    </TableCell>
                    <TableCell>
                      <div className="font-medium text-xs text-slate-900 dark:text-white">
                        {b.vehicleName}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {b.vehicleCategory}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-xs font-medium text-slate-800 dark:text-slate-200">
                        <User className="w-3 h-3 text-slate-400" />
                        {b.customerName}
                      </div>
                      <div className="text-[11px] text-slate-400 pl-4.5">
                        {b.customerEmail}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {b.startDate} → {b.endDate}
                      </div>
                      <div className="text-[11px] text-slate-400 pl-4.5">
                        {b.totalDays} days
                      </div>
                    </TableCell>
                    <TableCell className="text-xs font-bold text-slate-900 dark:text-white">
                      ${b.totalPrice.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(b.status)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
