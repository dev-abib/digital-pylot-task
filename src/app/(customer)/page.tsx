import React from 'react';
import { HomeHero } from '@/components/Pages/Home/HomeHero';

export default function HomePage() {
  return (
    <div>
      <HomeHero />
      <div className="mt-8 max-w-4xl mx-auto text-center">
        <p className="text-gray-600">Clean project structure ready for development.</p>
      </div>
    </div>
  );
}
