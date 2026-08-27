'use client';

import React, { useState } from 'react';
import { Vehicle } from '@/lib/types';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, CheckCircle2, ShieldCheck, Sparkles, Send } from 'lucide-react';

interface BookingModalProps {
  vehicle: Vehicle | null;
  isOpen: boolean;
  onClose: () => void;
  onBookingComplete?: () => void;
}

export function BookingModal({ vehicle, isOpen, onClose, onBookingComplete }: BookingModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [startDate, setStartDate] = useState(new Date().toISOString().split('T')[0]);
  const [endDate, setEndDate] = useState(
    new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0]
  );
  const [pickupLocation, setPickupLocation] = useState('Downtown Hub');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmation, setConfirmation] = useState<{
    bookingNumber: string;
    totalPrice: number;
    totalDays: number;
    automationStatus?: string;
  } | null>(null);

  if (!vehicle) return null;

  // Calculate rental duration & price
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffDays = Math.max(1, Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)));
  const totalCost = diffDays * vehicle.pricePerDay;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. Post to /app/api/bookings
      const bookingRes = await fetch('/app/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          vehicleId: vehicle.id,
          customerName: name,
          customerEmail: email,
          customerPhone: phone,
          startDate,
          endDate,
          pickupLocation,
          dropoffLocation: pickupLocation
        })
      });
      const bookingJson = await bookingRes.json();

      // 2. Trigger Lead & Automation notification workflow via /app/api/leads
      const leadRes = await fetch('/app/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          preferredCategory: vehicle.category,
          targetVehicleId: vehicle.id,
          targetVehicleName: vehicle.name,
          startDate,
          endDate,
          source: 'booking_inquiry',
          message: `Direct reservation inquiry for ${vehicle.name} from ${startDate} to ${endDate}`
        })
      });
      const leadJson = await leadRes.json();

      setConfirmation({
        bookingNumber: bookingJson.data?.bookingNumber || `BK-${Math.floor(1000 + Math.random() * 9000)}`,
        totalPrice: totalCost,
        totalDays: diffDays,
        automationStatus: leadJson.automation?.channel === 'telegram'
          ? 'Telegram instant alert dispatched to dispatch desk'
          : 'Automation workflow dispatched'
      });

      onBookingComplete?.();
    } catch (err) {
      console.error('Booking submission error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setConfirmation(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleResetAndClose()}>
      <DialogContent className="sm:max-w-[540px] p-0 overflow-hidden bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800">
        {confirmation ? (
          <div className="p-8 text-center space-y-5">
            <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">Reservation Confirmed!</h2>
              <p className="text-xs text-slate-500">
                Your luxury reservation is registered in our fleet system.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-left space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Reference:</span>
                <span className="font-mono font-bold text-amber-500">{confirmation.bookingNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Vehicle:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{vehicle.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Duration:</span>
                <span className="text-slate-800 dark:text-slate-200">{startDate} → {endDate} ({confirmation.totalDays} days)</span>
              </div>
              <div className="flex justify-between border-t border-slate-200 dark:border-slate-700 pt-2 font-bold">
                <span className="text-slate-800 dark:text-white">Total Amount:</span>
                <span className="text-amber-500">${confirmation.totalPrice.toLocaleString()}</span>
              </div>
            </div>

            {confirmation.automationStatus && (
              <div className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1 font-medium bg-emerald-50 dark:bg-emerald-950/40 p-2 rounded-lg">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{confirmation.automationStatus}</span>
              </div>
            )}

            <Button onClick={handleResetAndClose} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs">
              Done & Return to Fleet
            </Button>
          </div>
        ) : (
          <div>
            <div className="p-6 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30">
              <DialogHeader>
                <div className="flex items-center gap-2 mb-1">
                  <Badge className="bg-amber-500 text-slate-950 font-bold text-[10px]">
                    {vehicle.category}
                  </Badge>
                  <span className="text-xs font-semibold text-slate-400">Instant Reservation</span>
                </div>
                <DialogTitle className="text-lg font-bold text-slate-900 dark:text-white">
                  Reserve {vehicle.name}
                </DialogTitle>
                <DialogDescription className="text-xs text-slate-500">
                  ${vehicle.pricePerDay}/day • Comprehensive insurance included • Free 48hr cancellation
                </DialogDescription>
              </DialogHeader>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Full Name</label>
                  <div className="relative">
                    <User className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                    <Input
                      required
                      placeholder="Jane Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="pl-8 text-xs h-9 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Phone Number</label>
                  <div className="relative">
                    <Phone className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                    <Input
                      required
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="pl-8 text-xs h-9 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Email Address</label>
                <div className="relative">
                  <Mail className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                  <Input
                    type="email"
                    required
                    placeholder="jane@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-8 text-xs h-9 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              {/* Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Pickup Date</label>
                  <Input
                    type="date"
                    required
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="text-xs h-9 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Return Date</label>
                  <Input
                    type="date"
                    required
                    min={startDate}
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="text-xs h-9 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              {/* Pickup Location */}
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">Pickup Hub</label>
                <select
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full h-9 text-xs px-3 rounded-md bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="Downtown Hub">Downtown Fleet Lounge</option>
                  <option value="Airport Terminal 1">Airport VIP Valet (Terminal 1)</option>
                  <option value="Airport Terminal 2">Airport VIP Valet (Terminal 2)</option>
                  <option value="Westside Charging Hub">Westside EV Hub</option>
                </select>
              </div>

              {/* Summary Card */}
              <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs space-y-1">
                <div className="flex justify-between font-medium text-slate-800 dark:text-slate-200">
                  <span>Rate: ${vehicle.pricePerDay}/day × {diffDays} {diffDays === 1 ? 'day' : 'days'}</span>
                  <span className="font-bold text-amber-600 dark:text-amber-400">${totalCost.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Includes 24/7 Roadside Assistance & standard protection</span>
                </div>
              </div>

              <DialogFooter className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={onClose}
                  className="text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs gap-1.5 shadow-md shadow-amber-500/20"
                >
                  {isSubmitting ? (
                    <span>Processing...</span>
                  ) : (
                    <>
                      <span>Confirm & Book (${totalCost})</span>
                      <Send className="w-3.5 h-3.5" />
                    </>
                  )}
                </Button>
              </DialogFooter>
            </form>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
