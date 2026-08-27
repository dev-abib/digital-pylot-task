import React from 'react';
import { CustomerNavbar } from '@/components/customer/CustomerNavbar';
import { CustomerFooter } from '@/components/customer/CustomerFooter';
import { ChatBotWidget } from '@/components/customer/ChatBotWidget';

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <CustomerNavbar />
      <main className="flex-1">{children}</main>
      <CustomerFooter />
      <ChatBotWidget />
    </div>
  );
}
