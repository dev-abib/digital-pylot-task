'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Lead } from '@/lib/types';
import { Button } from '@/components/ui/button';

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ignore = false;
    fetch('/app/api/leads')
      .then((res) => res.json())
      .then((data) => {
        if (!ignore && data.data) {
          setLeads(data.data);
        }
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <div className="border-b pb-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Leads & Inquiries CRM Scaffold</h1>
          <p className="text-sm text-muted-foreground">Connected to /app/api/leads + Telegram Automation</p>
        </div>
        <Link href="/admin"><Button variant="outline" size="sm">Back to Dashboard</Button></Link>
      </div>

      {loading ? (
        <p className="text-sm text-muted-foreground">Loading leads...</p>
      ) : (
        <ul className="divide-y border rounded-lg">
          {leads.map((l) => (
            <li key={l.id} className="p-3 flex items-center justify-between text-xs">
              <div>
                <span className="font-bold">{l.name}</span> ({l.email || l.phone})
                <div className="text-muted-foreground">Vehicle: {l.targetVehicleName || 'General'} • Source: {l.source}</div>
              </div>
              <span className="capitalize px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded font-semibold">{l.status}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
