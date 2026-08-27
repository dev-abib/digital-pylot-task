'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CustomerHomePage() {
  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <div className="border-b pb-4">
        <h1 className="text-2xl font-bold">LuxeDrive — Customer Storefront Scaffold</h1>
        <p className="text-sm text-muted-foreground">Functional skeleton ready for Figma design alignment.</p>
      </div>

      <div className="flex gap-4">
        <Link href="/vehicles">
          <Button>Browse Vehicles</Button>
        </Link>
        <Link href="/admin">
          <Button variant="outline">Admin Dashboard</Button>
        </Link>
      </div>
    </div>
  );
}
