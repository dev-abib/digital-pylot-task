import React from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b p-4 bg-gray-900 text-white flex justify-between">
        <span className="font-bold">Admin Console</span>
        <a href="/" className="text-sm underline">Back to Main Site</a>
      </header>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
