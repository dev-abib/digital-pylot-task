'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X, Eye, EyeOff, Lock, Mail, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    setTimeout(() => {
      if (!email.includes('@') || password.length < 3) {
        setError('Please enter a valid email address and password.');
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
        // Ignore localStorage error
      }

      setIsLoading(false);
      if (isAdmin) {
        router.push('/admin');
      } else {
        router.push('/');
      }
    }, 350);
  };

  return (
    <div className="min-h-screen w-full bg-black/50 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 font-jakarta selection:bg-[#131825] selection:text-white">
      {/* Centered Modal Card */}
      <div className="relative w-full max-w-[440px] max-h-[92vh] overflow-y-auto bg-white rounded-[32px] shadow-[0_24px_70px_rgba(0,0,0,0.18)] p-8 sm:p-10 border border-gray-100/80 animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <Link
          href="/"
          aria-label="Return to Home"
          className="absolute top-6 right-6 w-8 h-8 rounded-full bg-gray-50 hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-800 transition-all active:scale-90 cursor-pointer shadow-2xs"
          title="Return to Home"
        >
          <X className="w-4 h-4" />
        </Link>

        {/* Brand Header */}
        <div className="text-center mb-7 space-y-2">
          <Link
            href="/"
            className="font-rubik text-3xl sm:text-4xl font-extrabold tracking-tight text-[#131825] hover:opacity-85 transition-opacity inline-block cursor-pointer"
            title="Best Auto Home"
          >
            Logo
          </Link>
          <div className="space-y-1 pt-1">
            <h2 className="font-rubik text-2xl sm:text-[28px] font-bold text-[#131825] tracking-tight">
              Welcome Back
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-normal">
              Log in to manage your car bookings and wishlist
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-5 p-3.5 bg-red-50/80 border border-red-200 text-red-700 rounded-xl text-xs font-medium animate-in fade-in">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-700">
              Email Address
            </label>
            <div className="relative group">
              <Mail className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                placeholder="user@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#FAFAFB] hover:bg-white focus:bg-white pl-10 pr-4 py-3 text-xs sm:text-sm border border-gray-200 hover:border-gray-300 rounded-2xl focus:ring-4 focus:ring-black/5 focus:border-[#131825] focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-semibold text-gray-700">
                Password
              </label>
              <a
                href="#forgot"
                onClick={(e) => {
                  e.preventDefault();
                  alert('Password reset instructions sent to your email.');
                }}
                className="text-[11px] font-semibold text-[#FA8B2B] hover:text-[#E07A1E] transition-colors"
              >
                Forgot?
              </a>
            </div>
            <div className="relative group">
              <Lock className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#FAFAFB] hover:bg-white focus:bg-white pl-10 pr-10 py-3 text-xs sm:text-sm border border-gray-200 hover:border-gray-300 rounded-2xl focus:ring-4 focus:ring-black/5 focus:border-[#131825] focus:outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 transition-colors cursor-pointer p-1"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#131825] hover:bg-black disabled:opacity-50 text-white py-3.5 rounded-2xl font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md hover:shadow-xl active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 mt-4"
          >
            <span>{isLoading ? 'Signing In...' : 'Log In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Switch Mode Footer */}
        <div className="text-center mt-6 pt-2 border-t border-gray-100/80 text-xs text-gray-500">
          Don&apos;t have an account?{' '}
          <Link
            href="/register"
            className="font-bold text-[#131825] hover:text-[#FA8B2B] transition-colors ml-1"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
