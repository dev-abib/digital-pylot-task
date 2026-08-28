import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Rubik } from 'next/font/google';
import './globals.css';

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  display: 'swap',
});

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Best Auto — Luxury Car Rental & Fleet Operations Platform',
  description: 'Enterprise-grade web-based car rental platform, live operations dashboard, 24/7 AI Concierge, and automated lead dispatch.',
  keywords: ['car rental', 'luxury cars', 'fleet management', 'car booking', 'best auto', 'luxedrive'],
  authors: [{ name: 'Best Auto Engineering Team' }],
  openGraph: {
    title: 'Best Auto — Luxury Car Rental Platform',
    description: 'Book executive and luxury cars with Zero-Excess protection and 24/7 AI concierge assistance.',
    type: 'website',
    locale: 'en_GB',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${rubik.variable}`}>
      <body className="min-h-screen bg-white text-black antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
