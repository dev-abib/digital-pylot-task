import React from 'react';
import { HomeHero } from '@/components/Pages/Home/HomeHero';
import { HowItWorks } from '@/components/Pages/Home/HowItWorks';
import { PromoBanners } from '@/components/Pages/Home/PromoBanners';
import { PopularDeals } from '@/components/Pages/Home/PopularDeals';
import { WhyChooseUs } from '@/components/Pages/Home/WhyChooseUs';
import { Testimonials } from '@/components/Pages/Home/Testimonials';

export default function HomePage() {
  return (
    <div>
      <HomeHero />
      <HowItWorks />
      <PromoBanners />
      <PopularDeals />
      <WhyChooseUs />
      <Testimonials />
    </div>
  );
}
