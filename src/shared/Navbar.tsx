import React from 'react';

export function Navbar() {
  return (
    <header className="border-b p-4 flex justify-between items-center">
      <div className="font-bold text-lg">App Logo</div>
      <nav className="flex gap-4 text-sm">
        <a href="/" className="hover:underline">Home</a>
        <a href="/admin" className="hover:underline">Admin</a>
      </nav>
    </header>
  );
}
