'use client';

import React, { useState, useEffect, useMemo } from 'react';
import {
  Users,
  RefreshCw,
  Search,
  Zap,
  Sparkles,
  Phone,
  Mail,
  Car,
  Clock,
} from 'lucide-react';

interface LeadItem {
  id: string;
  customerName: string;
  customerEmail: string;
  phone?: string;
  carName?: string;
  totalPrice?: number;
  source: string;
  status: 'Qualified' | 'Contacted' | 'New' | 'Converted' | string;
  createdAt: string;
  notes?: string;
}

export function LeadsView() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [isSimulating, setIsSimulating] = useState(false);
  const [dispatchStatus, setDispatchStatus] = useState<string | null>(null);

  const fetchLeads = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/leads');
      const data = await res.json();
      if (data.success && data.leads) {
        setLeads(data.leads);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Filtered leads
  const filteredLeads = useMemo(() => {
    return leads.filter((lead) => {
      const matchesSearch =
        lead.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.customerEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (lead.carName && lead.carName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (lead.notes && lead.notes.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesStatus =
        selectedStatus === 'All' || lead.status.toLowerCase() === selectedStatus.toLowerCase();

      return matchesSearch && matchesStatus;
    });
  }, [leads, searchQuery, selectedStatus]);

  // KPI calculations
  const totalPipeline = useMemo(() => {
    return leads.reduce((sum, l) => sum + (l.totalPrice || 0), 0);
  }, [leads]);

  const aiLeadsCount = useMemo(() => {
    return leads.filter((l) => l.source.toLowerCase().includes('ai') || l.source.toLowerCase().includes('chatbot')).length;
  }, [leads]);

  const handleCreateTestLead = async () => {
    setIsSimulating(true);
    setDispatchStatus(null);
    try {
      const names = ['Victoria Crawford', 'Julian Vance', 'Oliver Sterling', 'Claire Beaumont'];
      const cars = ['Range Rover Velar', 'Porsche 911 Carrera', 'Mercedes-Benz S-Class', 'Tesla Model S'];
      const randomName = names[Math.floor(Math.random() * names.length)];
      const randomCar = cars[Math.floor(Math.random() * cars.length)];

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: randomName,
          customerEmail: `${randomName.toLowerCase().replace(' ', '.')}@example.com`,
          phone: '+44 7700 900554',
          carName: randomCar,
          carPrice: 135,
          pickupDate: new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0],
          returnDate: new Date(Date.now() + 86400000 * 6).toISOString().split('T')[0],
          totalPrice: 540,
          source: 'ai_concierge',
          notes: 'Immediate VIP booking inquiry dispatched via Live CRM simulation.',
        }),
      });

      const data = await res.json();
      if (data.success) {
        setDispatchStatus('✅ Lead captured & Telegram alert dispatched!');
        fetchLeads();
      }
    } catch {
      setDispatchStatus('❌ Error dispatching test lead');
    } finally {
      setIsSimulating(false);
      setTimeout(() => setDispatchStatus(null), 4000);
    }
  };

  return (
    <div className="space-y-6 font-jakarta">
      {/* Top Header Card */}
      <div className="bg-white rounded-3xl p-6 sm:p-7 border border-gray-100 shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-gray-100">
          <div className="space-y-1">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-[#FA8B2B]/10 flex items-center justify-center text-[#FA8B2B]">
                <Users className="w-4 h-4" />
              </div>
              <h2 className="font-rubik text-xl sm:text-2xl font-bold text-[#131825]">
                Inbound Leads &amp; AI Inquiries CRM
              </h2>
            </div>
            <p className="text-xs text-gray-500">
              Real-time multi-channel lead capture feed with automated Telegram notification routing
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <button
              type="button"
              onClick={handleCreateTestLead}
              disabled={isSimulating}
              className="inline-flex items-center gap-2 bg-[#131825] hover:bg-black text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-xs hover:shadow transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <Zap className="w-3.5 h-3.5 text-[#FA8B2B]" />
              <span>{isSimulating ? 'Dispatching...' : 'Simulate Inbound Lead'}</span>
            </button>

            <button
              type="button"
              onClick={fetchLeads}
              className="inline-flex items-center gap-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 px-3.5 py-2.5 rounded-xl text-xs font-semibold border border-gray-200 transition-colors cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#FA8B2B]' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {dispatchStatus && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold animate-in fade-in flex items-center justify-between">
            <span>{dispatchStatus}</span>
          </div>
        )}

        {/* KPI Mini-Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-2xl bg-[#F8F9FB] border border-gray-100 space-y-1">
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Total Inquiries</span>
            <p className="font-rubik text-xl sm:text-2xl font-bold text-[#131825]">{leads.length}</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8F9FB] border border-gray-100 space-y-1">
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">AI Qualified</span>
            <div className="flex items-center gap-1.5">
              <p className="font-rubik text-xl sm:text-2xl font-bold text-[#28C76F]">{aiLeadsCount}</p>
              <Sparkles className="w-4 h-4 text-[#28C76F]" />
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8F9FB] border border-gray-100 space-y-1">
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Pipeline Est.</span>
            <p className="font-rubik text-xl sm:text-2xl font-bold text-[#131825]">${totalPipeline.toLocaleString()}</p>
          </div>

          <div className="p-4 rounded-2xl bg-[#F8F9FB] border border-gray-100 space-y-1">
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">Telegram Routing</span>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#28C76F] animate-pulse" />
              <p className="text-xs font-bold text-gray-800">Active Live Dispatch</p>
            </div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search leads, customer, car..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F8F9FB] pl-10 pr-4 py-2 text-xs border border-gray-200 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-black/5 focus:border-[#131825] transition-all"
            />
          </div>

          {/* Status Filter Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {['All', 'Qualified', 'Contacted', 'Converted', 'New'].map((status) => {
              const active = selectedStatus === status;
              return (
                <button
                  key={status}
                  type="button"
                  onClick={() => setSelectedStatus(status)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    active
                      ? 'bg-[#131825] text-white shadow-2xs'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
                  }`}
                >
                  {status}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Leads Cards Grid */}
      <div className="space-y-3">
        {filteredLeads.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-gray-100 shadow-xs space-y-3">
            <Users className="w-10 h-10 mx-auto text-gray-300" />
            <p className="font-bold text-gray-800 text-sm">No leads match your filter</p>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              Try adjusting your search criteria or click &quot;Simulate Inbound Lead&quot; to test lead generation.
            </p>
          </div>
        ) : (
          filteredLeads.map((lead) => {
            const isAI = lead.source.toLowerCase().includes('ai');
            return (
              <div
                key={lead.id}
                className="bg-white rounded-2xl p-5 border border-gray-100 shadow-2xs hover:shadow-md transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1 min-w-0">
                  {/* Row 1: Name, Source Badge, Status, Time */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-rubik text-sm sm:text-base font-bold text-[#131825]">
                      {lead.customerName}
                    </span>
                    <span className="text-[11px] font-mono text-gray-400 font-medium">
                      ({lead.id})
                    </span>
                    <span
                      className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isAI
                          ? 'bg-purple-50 text-purple-700 border border-purple-100'
                          : 'bg-[#FA8B2B]/10 text-[#FA8B2B] border border-[#FA8B2B]/20'
                      }`}
                    >
                      {isAI && <Sparkles className="w-3 h-3" />}
                      {lead.source === 'ai_concierge'
                        ? 'AI Concierge'
                        : lead.source === 'storefront_booking'
                        ? 'Storefront Booking'
                        : lead.source === 'contact_form'
                        ? 'Contact Form'
                        : lead.source}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        lead.status === 'Qualified'
                          ? 'bg-emerald-50 text-emerald-700'
                          : lead.status === 'Converted'
                          ? 'bg-blue-50 text-blue-700'
                          : lead.status === 'Contacted'
                          ? 'bg-amber-50 text-amber-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {lead.status}
                    </span>
                    <span className="text-[10px] text-gray-400 ml-auto lg:ml-0 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(lead.createdAt).toLocaleDateString()} at{' '}
                      {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  {/* Row 2: Contact Details */}
                  <div className="flex items-center gap-4 text-xs text-gray-600 flex-wrap">
                    <div className="flex items-center gap-1">
                      <Mail className="w-3.5 h-3.5 text-gray-400" />
                      <span>{lead.customerEmail}</span>
                    </div>
                    {lead.phone && (
                      <div className="flex items-center gap-1">
                        <Phone className="w-3.5 h-3.5 text-gray-400" />
                        <span>{lead.phone}</span>
                      </div>
                    )}
                  </div>

                  {/* Row 3: Vehicle Interest & Estimated Value */}
                  {lead.carName && (
                    <div className="flex items-center gap-2 text-xs">
                      <Car className="w-3.5 h-3.5 text-gray-400" />
                      <span className="text-gray-500">Vehicle Request:</span>
                      <span className="font-bold text-gray-800">{lead.carName}</span>
                      {lead.totalPrice ? (
                        <span className="text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded text-[11px]">
                          ${lead.totalPrice} Est. Total
                        </span>
                      ) : null}
                    </div>
                  )}

                  {/* Row 4: Notes / Inquiries */}
                  {lead.notes && (
                    <p className="text-xs text-gray-500 italic bg-gray-50/80 p-2.5 rounded-xl border border-gray-100">
                      &ldquo;{lead.notes}&rdquo;
                    </p>
                  )}
                </div>

                {/* Right Action buttons */}
                <div className="flex items-center gap-2 shrink-0 border-t lg:border-t-0 pt-2 lg:pt-0">
                  <a
                    href={`mailto:${lead.customerEmail}?subject=Best Auto Luxury Rental Inquiry - ${encodeURIComponent(lead.carName || 'Fleet')}`}
                    className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-semibold transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-gray-500" />
                    <span>Email Lead</span>
                  </a>

                  {lead.phone && (
                    <a
                      href={`tel:${lead.phone}`}
                      className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#131825] hover:bg-black text-white text-xs font-semibold transition-colors"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#FA8B2B]" />
                      <span>Call Client</span>
                    </a>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
