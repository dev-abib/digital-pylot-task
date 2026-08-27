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
  title: 'Best Auto - Web-Based Car Rental System',
  description: 'A high-performing web-based car rental system for any rent-a-car company and website.',
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
