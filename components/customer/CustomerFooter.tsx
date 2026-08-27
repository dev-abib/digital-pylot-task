import React from 'react';
import Link from 'next/link';
import { Car, ShieldCheck, Clock, MapPin, Sparkles } from 'lucide-react';

export function CustomerFooter() {
  return (
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-900">
          {/* Col 1 */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-slate-950 font-black">
                <Car className="w-4 h-4 text-slate-950" />
              </div>
              <span className="font-bold text-lg text-white">LuxeDrive</span>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Curated luxury, sport, and electric vehicle rentals with seamless digital concierge and door-to-door delivery.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400/90 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>AI-Powered Concierge Active</span>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Vehicle Fleet</div>
            <ul className="space-y-2 text-xs">
              <li><Link href="/vehicles?category=Electric" className="hover:text-amber-400 transition">Electric & Tesla</Link></li>
              <li><Link href="/vehicles?category=SUV" className="hover:text-amber-400 transition">Luxury SUVs</Link></li>
              <li><Link href="/vehicles?category=Sports" className="hover:text-amber-400 transition">High Performance & Sports</Link></li>
              <li><Link href="/vehicles?category=Van" className="hover:text-amber-400 transition">Executive Shuttles</Link></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Rental Services</div>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-amber-500" /> Full Coverage Insurance</li>
              <li className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-amber-500" /> 24/7 Roadside Assistance</li>
              <li className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-amber-500" /> Airport VIP Valet Drop-off</li>
              <li><Link href="/admin" className="hover:text-amber-400 transition">Fleet Management Portal</Link></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <div className="text-xs font-bold uppercase tracking-wider text-white">Rental Policies</div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Minimum driver age is 21. Valid driver&apos;s license and credit card required. Free cancellation up to 48 hours prior to reservation.
            </p>
            <div className="text-[11px] text-slate-500">
              Automated reservation dispatch via Telegram bot webhook.
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} LuxeDrive Rental Systems. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/admin" className="text-amber-400/80 hover:text-amber-400">Admin Control Panel</Link>
            <a href="#policies" className="hover:text-slate-300">Privacy Policy</a>
            <a href="#policies" className="hover:text-slate-300">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
