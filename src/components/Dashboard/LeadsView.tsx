'use client';

import React, { useState, useEffect } from 'react';
import { Users, Send, CheckCircle2, MessageSquare, Clock, RefreshCw } from 'lucide-react';

interface LeadItem {
  id: string;
  customerName: string;
  customerEmail: string;
  phone?: string;
  carName?: string;
  totalPrice?: number;
  source: string;
  status: string;
  createdAt: string;
  notes?: string;
}

export function LeadsView() {
  const [leads, setLeads] = useState<LeadItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs font-jakarta space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Inbound Leads &amp; AI Inquiries CRM</h2>
          <p className="text-xs text-gray-500">Live feed of captured inquiries and Telegram automation notifications</p>
        </div>

        <button
          type="button"
          onClick={fetchLeads}
          className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-[#FF9F43]' : ''}`} />
          <span>Refresh Leads</span>
        </button>
      </div>

      <div className="space-y-3">
        {leads.length === 0 ? (
          <div className="py-12 text-center text-gray-400 text-xs">
            <Users className="w-8 h-8 mx-auto text-gray-300 mb-2" />
            <p className="font-semibold text-gray-700">No leads captured yet</p>
            <p className="text-gray-400 mt-0.5">Submit a booking on the homepage or ask the AI Concierge to generate live leads!</p>
          </div>
        ) : (
          leads.map((lead) => (
            <div
              key={lead.id}
              className="p-4 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-white hover:shadow-xs transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900 text-sm">{lead.customerName}</span>
                  <span className="bg-[#FF9F43]/10 text-[#FF8A00] font-bold text-[10px] px-2 py-0.5 rounded">
                    {lead.source}
                  </span>
                  <span className="text-[10px] text-gray-400">
                    {new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p className="text-gray-600 font-medium">{lead.customerEmail} {lead.phone && `• ${lead.phone}`}</p>
                {lead.carName && (
                  <p className="text-gray-500 text-[11px]">
                    Vehicle Interest: <span className="font-bold text-gray-800">{lead.carName}</span>
                    {lead.totalPrice ? ` (Estimated $${lead.totalPrice})` : ''}
                  </p>
                )}
                {lead.notes && <p className="text-[11px] text-gray-400 italic">{lead.notes}</p>}
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                <span className="inline-flex items-center gap-1 text-[11px] text-[#28C76F] font-bold bg-[#28C76F]/10 px-2.5 py-1 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Qualified
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
