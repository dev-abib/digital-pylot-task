'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (!email.includes('@') || password.length < 3) {
        setError('Please enter a valid email and password.');
        setIsLoading(false);
        return;
      }

      const isAdmin = email.toLowerCase().includes('admin');
      const user = {
        name: isAdmin ? 'Operations Admin' : email.split('@')[0],
        email,
        role: isAdmin ? 'Admin' : 'Customer',
      };

      try {
        localStorage.setItem('bestauto_current_user', JSON.stringify(user));
      } catch {
        // Ignore
      }

      setIsLoading(false);
      if (isAdmin) {
        router.push('/admin');
      } else {
        router.push('/');
      }
    }, 400);
  };

  const handleDemoFill = (role: 'driver' | 'admin') => {
    if (role === 'admin') {
      setEmail('admin@bestauto.co.uk');
      setPassword('admin2026');
    } else {
      setEmail('alex.sterling@london-vip.co.uk');
      setPassword('password123');
    }
  };

  return (
    <div className="min-h-screen w-full flex font-jakarta bg-white selection:bg-[#FF9F43]/20">
      {/* Left Visual Hero (50% on Desktop, Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#0D1117] flex-col justify-between p-12 xl:p-16 overflow-hidden">
        {/* Full-bleed Luxury Car Background */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/promo_banner_1.jpg"
            alt="Luxury Fleet"
            fill
            priority
            sizes="50vw"
            className="object-cover opacity-60 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0D1117] via-[#0D1117]/50 to-transparent" />
          <div className="absolute inset-0 bg-radial from-transparent to-[#0D1117]/80" />
        </div>

        {/* Top Branding */}
        <div className="relative z-10">
          <Link href="/" className="inline-block">
            <span className="font-rubik text-2xl font-black tracking-tight text-white">
              Logo
            </span>
          </Link>
        </div>

        {/* Bottom Editorial Caption */}
        <div className="relative z-10 space-y-4 max-w-lg">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#FF9F43] bg-[#FF9F43]/15 px-3 py-1 rounded-full border border-[#FF9F43]/30">
            Premium Mobility
          </span>
          <h1 className="font-rubik text-3xl xl:text-4xl font-extrabold text-white leading-tight tracking-tight">
            Effortless car rental for discerning drivers across the UK.
          </h1>
          <p className="text-sm text-gray-300 font-normal leading-relaxed">
            Access our curated fleet of luxury sedans, sports coupes, and family SUVs with transparent pricing and 24/7 concierge delivery.
          </p>
        </div>

        {/* Legal / Copyright */}
        <div className="relative z-10 text-xs text-gray-400">
          © 2026 Best Auto Luxury Fleet Ltd. All rights reserved.
        </div>
      </div>

      {/* Right Form Area (50% on Desktop, 100% on Mobile) */}
      <div className="flex-1 flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-16 bg-white overflow-y-auto">
        {/* Top Navbar */}
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to fleet</span>
          </Link>

          <p className="text-xs text-gray-500">
            New to Best Auto?{' '}
            <Link href="/register" className="font-bold text-[#FF9F43] hover:text-[#FF8A00] transition-colors">
              Create an account
            </Link>
          </p>
        </div>

        {/* Center Form Body */}
        <div className="max-w-md w-full mx-auto my-auto py-8 space-y-7">
          <div className="space-y-2">
            <h2 className="font-rubik text-2xl sm:text-3xl font-extrabold text-[#131825] tracking-tight">
              Sign in to your account
            </h2>
            <p className="text-xs sm:text-sm text-gray-500">
              Welcome back! Please enter your credentials to continue.
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-medium animate-in fade-in">
              {error}
            </div>
          )}

          {/* Social Logins */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleDemoFill('driver')}
              className="flex items-center justify-center gap-2.5 py-3 px-4 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 transition-all cursor-pointer shadow-2xs hover:border-gray-300"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                />
                <path
                  fill="#34A853"
                  d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2-6.4-4.8L1.9 16.9C3.7 20.6 7.5 23.5 12 23.5z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.2s.7 5.5 1.9 7.9l3.7-2.9z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={() => handleDemoFill('admin')}
              className="flex items-center justify-center gap-2.5 py-3 px-4 bg-white hover:bg-gray-50 border border-gray-200 rounded-xl text-xs font-bold text-gray-700 transition-all cursor-pointer shadow-2xs hover:border-gray-300"
            >
              <svg className="w-4 h-4 fill-current text-gray-900" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.85c.66-.8 1.11-1.92.99-3.04-.96.04-2.12.64-2.8 1.44-.59.69-1.12 1.82-.98 2.91 1.07.08 2.15-.55 2.79-1.31z" />
              </svg>
              <span>Apple</span>
            </button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-gray-200 w-full" />
            <span className="bg-white px-3 text-[11px] font-semibold text-gray-400 uppercase tracking-wider absolute">
              or continue with email
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#131825]/10 focus:border-[#131825] transition-all"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-gray-700">
                  Password
                </label>
                <a href="#forgot" className="text-[11px] font-semibold text-[#FF9F43] hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-xl pl-4 pr-11 py-3 text-xs text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#131825]/10 focus:border-[#131825] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-[#131825] rounded border-gray-300 focus:ring-0 cursor-pointer"
                />
                <span className="text-xs text-gray-600 font-medium">Keep me signed in</span>
              </label>

              {/* Demo Account Pills */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => handleDemoFill('driver')}
                  className="text-[10px] font-bold bg-gray-100 hover:bg-gray-200 text-gray-700 px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                >
                  Driver Demo
                </button>
                <button
                  type="button"
                  onClick={() => handleDemoFill('admin')}
                  className="text-[10px] font-bold bg-[#131825] hover:bg-black text-white px-2.5 py-1 rounded-md transition-colors cursor-pointer"
                >
                  Admin Demo
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#131825] hover:bg-black disabled:opacity-50 text-white font-bold py-3.5 rounded-xl text-xs sm:text-sm tracking-wide transition-all shadow-md hover:shadow-lg active:scale-98 cursor-pointer flex items-center justify-center gap-2 mt-3"
            >
              <span>{isLoading ? 'Authenticating...' : 'Sign In'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Bottom Support */}
        <div className="text-center text-xs text-gray-400 pt-4">
          Need help? Contact our Concierge at{' '}
          <a href="tel:+442079460912" className="font-semibold text-gray-700 hover:underline">
            +44 20 7946 0912
          </a>
        </div>
      </div>
    </div>
  );
}
