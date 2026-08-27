import React from 'react';

export function CommonHero({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="py-12 px-4 text-center bg-gray-50 border-b">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      {subtitle && <p className="text-gray-600">{subtitle}</p>}
    </section>
  );
}
