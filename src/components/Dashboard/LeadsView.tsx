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
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  List,
  X,
  CheckCircle2,
  DollarSign,
  Send,
  Filter,
} from 'lucide-react';

export interface LeadItem {
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

type SortOption = 'newest' | 'oldest' | 'name-asc' | 'price-desc';

export function LeadsView() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [viewMode, setViewMode] = useState<'table' | 'cards'>('table');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
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

  // Filter & Sort leads
  const filteredAndSortedLeads = useMemo(() => {
    const result = leads.filter((lead) => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        lead.customerName.toLowerCase().includes(q) ||
        lead.customerEmail.toLowerCase().includes(q) ||
        (lead.carName && lead.carName.toLowerCase().includes(q)) ||
        (lead.notes && lead.notes.toLowerCase().includes(q));

      const matchesStatus =
        selectedStatus === 'All' || lead.status.toLowerCase() === selectedStatus.toLowerCase();

      return matchesSearch && matchesStatus;
    });

    switch (sortBy) {
      case 'newest':
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'name-asc':
        result.sort((a, b) => a.customerName.localeCompare(b.customerName));
        break;
      case 'price-desc':
        result.sort((a, b) => (b.totalPrice || 0) - (a.totalPrice || 0));
        break;
      default:
        break;
    }

    return result;
  }, [leads, searchQuery, selectedStatus, sortBy]);

  // Pagination calculation
  const totalItems = filteredAndSortedLeads.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
  const validPage = Math.min(currentPage, totalPages);
  const startIndex = (validPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const paginatedLeads = filteredAndSortedLeads.slice(startIndex, endIndex);

  // KPI calculations
  const totalPipeline = useMemo(() => {
    return leads.reduce((sum, l) => sum + (l.totalPrice || 0), 0);
  }, [leads]);

  const aiLeadsCount = useMemo(() => {
    return leads.filter(
      (l) =>
        l.source.toLowerCase().includes('ai') ||
        l.source.toLowerCase().includes('chatbot')
    ).length;
  }, [leads]);

  const handleCreateTestLead = async () => {
    setIsSimulating(true);
    setDispatchStatus(null);
    try {
      const names = [
        'Victoria Crawford',
        'Julian Vance',
        'Oliver Sterling',
        'Claire Beaumont',
      ];
      const cars = [
        'Range Rover Velar',
        'Porsche 911 Carrera',
        'Mercedes-Benz S-Class',
        'Tesla Model S',
      ];
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
          pickupDate: new Date(Date.now() + 86400000 * 2)
            .toISOString()
            .split('T')[0],
          returnDate: new Date(Date.now() + 86400000 * 6)
            .toISOString()
            .split('T')[0],
          totalPrice: 540,
          source: 'ai_concierge',
          notes:
            'Immediate VIP booking inquiry dispatched via Live CRM simulation.',
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

  const handleUpdateStatus = (leadId: string, newStatus: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
  };

  return (
    <div className="space-y-6 font-jakarta w-full">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-11 h-11 min-w-[44px] min-h-[44px] aspect-square rounded-2xl bg-gradient-to-tr from-[#FF9F43] to-[#FF8A00] text-white flex items-center justify-center shadow-md shrink-0">
            <Users className="w-6 h-6 shrink-0" />
          </div>
          <div className="min-w-0">
            <h2 className="text-lg font-bold text-gray-900 leading-tight">Inbound Leads &amp; AI Inquiries CRM</h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Multi-channel lead intake feed with automated instant Telegram notification routing
            </p>
          </div>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2 w-full md:w-auto shrink-0 justify-between sm:justify-end">
          <button
            type="button"
            onClick={handleCreateTestLead}
            disabled={isSimulating}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-[#131825] hover:bg-black text-white px-4 py-2 rounded-xl text-xs font-bold shadow-xs hover:shadow transition-all active:scale-95 cursor-pointer disabled:opacity-50 whitespace-nowrap"
          >
            <Zap className="w-3.5 h-3.5 text-[#FF9F43] shrink-0" />
            <span>{isSimulating ? 'Dispatching...' : 'Simulate Inbound Lead'}</span>
          </button>

          <button
            type="button"
            onClick={fetchLeads}
            className="p-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer shrink-0"
            title="Refresh Leads"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-[#FF8A00]' : ''}`} />
          </button>
        </div>
      </div>

      {dispatchStatus && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-semibold animate-in fade-in flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#28C76F]" />
            <span>{dispatchStatus}</span>
          </div>
          <button
            type="button"
            onClick={() => setDispatchStatus(null)}
            className="text-xs text-emerald-600 hover:underline"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {/* Total Inquiries */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-400">Total Inquiries</p>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 font-rubik tracking-tight">
              {leads.length}
            </h3>
            <p className="text-[11px] text-gray-500 font-medium">All capture channels</p>
          </div>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-orange-50 text-[#FF9F43] flex items-center justify-center shrink-0">
            <Users className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>

        {/* AI Qualified */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-400">AI Qualified</p>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-[#28C76F] font-rubik tracking-tight">
              {aiLeadsCount}
            </h3>
            <p className="text-[11px] text-[#28C76F] font-medium flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Auto-converted by bot
            </p>
          </div>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 text-[#28C76F] flex items-center justify-center shrink-0">
            <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>

        {/* Pipeline Value */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-400">Pipeline Value</p>
            <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 font-rubik tracking-tight">
              ${totalPipeline.toLocaleString()}
            </h3>
            <p className="text-[11px] text-gray-500 font-medium">Active inquiry total</p>
          </div>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-blue-50 text-[#0275FF] flex items-center justify-center shrink-0">
            <DollarSign className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>

        {/* Telegram Routing */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-xs flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-xs font-semibold text-gray-400">Telegram Bot</p>
            <div className="flex items-center gap-1.5 pt-0.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#28C76F] shrink-0 animate-pulse" />
              <h3 className="text-base sm:text-lg font-bold text-gray-900 font-rubik tracking-tight">
                Live Dispatched
              </h3>
            </div>
            <p className="text-[11px] text-gray-500 font-medium">Instant staff notifications</p>
          </div>
          <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Send className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </div>
      </div>

      {/* Filter, Search, Sort & View Toolbar */}
      <div className="bg-white rounded-2xl p-4 sm:p-6 border border-gray-100 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          {/* Status Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5">
            {['All', 'Qualified', 'Contacted', 'Converted', 'New'].map((status) => (
              <button
                key={status}
                type="button"
                onClick={() => {
                  setSelectedStatus(status);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  selectedStatus === status
                    ? 'bg-[#131825] text-white shadow-2xs'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          {/* Search, Sort, and View Controls */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            {/* Search Box */}
            <div className="relative flex-1 sm:w-60 min-w-[180px]">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search leads, customer, car..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg pl-9 pr-8 py-1.5 text-xs text-gray-800 focus:outline-none focus:border-[#FF9F43] transition-colors"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative shrink-0">
              <select
                value={sortBy}
                onChange={(e) => {
                  setSortBy(e.target.value as SortOption);
                  setCurrentPage(1);
                }}
                aria-label="Sort leads"
                className="bg-gray-50 border border-gray-200 text-gray-700 text-xs rounded-lg px-3 py-1.5 pr-8 focus:outline-none focus:border-[#FF9F43] cursor-pointer appearance-none font-medium"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name-asc">Customer Name (A-Z)</option>
                <option value="price-desc">Highest Pipeline ($)</option>
              </select>
              <ArrowUpDown className="w-3.5 h-3.5 text-gray-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-gray-100 p-0.5 rounded-lg shrink-0">
              <button
                type="button"
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'table' ? 'bg-white text-[#131825] shadow-xs' : 'text-gray-400 hover:text-gray-700'
                }`}
                title="Table View"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode('cards')}
                className={`p-1.5 rounded-md transition-colors cursor-pointer ${
                  viewMode === 'cards' ? 'bg-white text-[#131825] shadow-xs' : 'text-gray-400 hover:text-gray-700'
                }`}
                title="Cards View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between text-xs text-gray-500 pt-1">
          <p>
            Showing <span className="font-bold text-gray-900">{totalItems === 0 ? 0 : startIndex + 1}</span> to{' '}
            <span className="font-bold text-gray-900">{endIndex}</span> of{' '}
            <span className="font-bold text-gray-900">{totalItems}</span> leads
          </p>

          <div className="flex items-center gap-2">
            <span className="text-[11px] text-gray-400 hidden sm:inline">Per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              aria-label="Leads per page"
              className="bg-gray-50 border border-gray-200 text-gray-700 text-[11px] rounded px-2 py-0.5 focus:outline-none cursor-pointer"
            >
              <option value={5}>5</option>
              <option value={8}>8</option>
              <option value={12}>12</option>
              <option value={20}>20</option>
            </select>
          </div>
        </div>

        {/* Zero Results State */}
        {paginatedLeads.length === 0 ? (
          <div className="py-16 text-center space-y-3 bg-gray-50/60 rounded-2xl border border-dashed border-gray-200">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 mx-auto">
              <Filter className="w-6 h-6" />
            </div>
            <h3 className="text-sm font-bold text-gray-900">No leads match your criteria</h3>
            <p className="text-xs text-gray-500 max-w-sm mx-auto">
              Try adjusting your search keywords, switching status tabs, or simulate a new inbound lead.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedStatus('All');
                setSearchQuery('');
                setSortBy('newest');
              }}
              className="text-xs font-bold text-[#FF8A00] hover:underline cursor-pointer"
            >
              Clear Filters
            </button>
          </div>
        ) : viewMode === 'table' ? (
          /* TABLE VIEW */
          <div className="overflow-x-auto border border-gray-100 rounded-2xl">
            <table className="w-full text-left text-xs min-w-[700px]">
              <thead>
                <tr className="bg-gray-50 text-gray-500 font-semibold border-b border-gray-100">
                  <th className="py-3 px-4">Customer</th>
                  <th className="py-3 px-4">Requested Vehicle</th>
                  <th className="py-3 px-4">Source</th>
                  <th className="py-3 px-4">Pipeline Est.</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Quick Contact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-medium">
                {paginatedLeads.map((lead) => {
                  const isAI = lead.source.toLowerCase().includes('ai');
                  return (
                    <tr key={lead.id} className="hover:bg-gray-50/80 transition-colors">
                      {/* Customer Info */}
                      <td className="py-3.5 px-4">
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-bold text-gray-900">{lead.customerName}</p>
                            <span className="text-[10px] font-mono text-gray-400">({lead.id})</span>
                          </div>
                          <p className="text-[11px] text-gray-400 mt-0.5">{lead.customerEmail}</p>
                        </div>
                      </td>

                      {/* Requested Vehicle */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5 text-gray-700">
                          <Car className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span className="font-semibold">{lead.carName || 'General Fleet Inquiry'}</span>
                        </div>
                      </td>

                      {/* Source */}
                      <td className="py-3.5 px-4">
                        <span
                          className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            isAI
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-blue-100 text-blue-700'
                          }`}
                        >
                          {isAI ? <Sparkles className="w-3 h-3" /> : null}
                          {lead.source}
                        </span>
                      </td>

                      {/* Pipeline Est */}
                      <td className="py-3.5 px-4 font-bold text-gray-900">
                        {lead.totalPrice ? `$${lead.totalPrice}` : 'Custom Quote'}
                      </td>

                      {/* Status Selector */}
                      <td className="py-3.5 px-4">
                        <select
                          value={lead.status}
                          onChange={(e) => handleUpdateStatus(lead.id, e.target.value)}
                          aria-label="Update lead status"
                          className={`text-[11px] font-bold px-2.5 py-1 rounded-full border cursor-pointer focus:outline-none ${
                            lead.status === 'Qualified'
                              ? 'bg-emerald-50 text-[#28C76F] border-emerald-200'
                              : lead.status === 'Contacted'
                              ? 'bg-blue-50 text-[#0275FF] border-blue-200'
                              : lead.status === 'Converted'
                              ? 'bg-purple-50 text-purple-700 border-purple-200'
                              : 'bg-orange-50 text-[#FF8A00] border-orange-200'
                          }`}
                        >
                          <option value="New">New</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Qualified">Qualified</option>
                          <option value="Converted">Converted</option>
                        </select>
                      </td>

                      {/* Contact Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {lead.phone && (
                            <a
                              href={`tel:${lead.phone}`}
                              className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-[#FF8A00] hover:text-white hover:border-[#FF8A00] transition-colors"
                              title={`Call ${lead.phone}`}
                            >
                              <Phone className="w-3.5 h-3.5" />
                            </a>
                          )}
                          <a
                            href={`mailto:${lead.customerEmail}`}
                            className="p-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-[#131825] hover:text-white hover:border-[#131825] transition-colors"
                            title={`Email ${lead.customerEmail}`}
                          >
                            <Mail className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          /* CARDS VIEW */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paginatedLeads.map((lead) => {
              const isAI = lead.source.toLowerCase().includes('ai');
              return (
                <div
                  key={lead.id}
                  className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-2xs hover:shadow-md transition-all space-y-3"
                >
                  <div className="flex items-center justify-between border-b border-gray-50 pb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-gray-900">{lead.customerName}</h4>
                        <span className="text-[10px] font-mono text-gray-400">({lead.id})</span>
                      </div>
                      <p className="text-xs text-gray-400">{lead.customerEmail}</p>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isAI ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      {lead.source}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 bg-gray-50/80 p-2.5 rounded-xl">
                    <div>
                      <span className="text-[10px] text-gray-400 block">Requested Car</span>
                      <span className="font-bold text-gray-900 truncate block">
                        {lead.carName || 'General Inquiry'}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-gray-400 block">Est. Value</span>
                      <span className="font-bold text-[#28C76F] block">
                        {lead.totalPrice ? `$${lead.totalPrice}` : 'Quote Request'}
                      </span>
                    </div>
                  </div>

                  {lead.notes && (
                    <p className="text-xs text-gray-500 italic bg-amber-50/60 border border-amber-100 p-2 rounded-lg">
                      &ldquo;{lead.notes}&rdquo;
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-1 text-[11px] text-gray-400">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{new Date(lead.createdAt).toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {lead.phone && (
                        <a
                          href={`tel:${lead.phone}`}
                          className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-100"
                        >
                          <Phone className="w-3 h-3" />
                          <span>Call</span>
                        </a>
                      )}
                      <a
                        href={`mailto:${lead.customerEmail}`}
                        className="flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-lg bg-[#131825] text-white hover:bg-black"
                      >
                        <Mail className="w-3 h-3" />
                        <span>Email</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-gray-100">
            <p className="text-xs text-gray-500">
              Page <span className="font-bold text-gray-900">{validPage}</span> of{' '}
              <span className="font-bold text-gray-900">{totalPages}</span>
            </p>

            <div className="flex items-center gap-1.5">
              {/* Prev Button */}
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={validPage === 1}
                className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                title="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {/* Page Numbers */}
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  type="button"
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-8 h-8 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    validPage === pageNum
                      ? 'bg-[#131825] text-white shadow-xs'
                      : 'text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {pageNum}
                </button>
              ))}

              {/* Next Button */}
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={validPage === totalPages}
                className="p-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
                title="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
