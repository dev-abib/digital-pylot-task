import React from 'react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authentication | Best Auto Luxury Rentals',
  description: 'Sign in or create your VIP account for luxury car rental and reservation management.',
};

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#131825] font-jakarta antialiased selection:bg-[#FF9F43]/20">
      {children}
    </div>
  );
}
