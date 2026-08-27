import React from 'react';

export function Card({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="border rounded p-4 shadow-sm">
      {title && <h3 className="font-semibold text-base mb-2">{title}</h3>}
      {children}
    </div>
  );
}
