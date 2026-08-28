'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { X, Eye, EyeOff, Lock, Mail, User, Phone, ArrowRight } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!agreeTerms) {
      setError('Please agree to the Terms of Service to proceed.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      if (!fullName.trim() || !email.includes('@') || password.length < 3) {
        setError('Please complete all required fields.');
        setIsLoading(false);
        return;
      }

      const user = {
        name: fullName.trim(),
        email,
        phone,
        role: 'Customer',
      };

      try {
        localStorage.setItem('bestauto_current_user', JSON.stringify(user));
      } catch {
        // Ignore localStorage error
      }

      setIsLoading(false);
      router.push('/');
    }, 350);
  };

  return (
    <div className="min-h-screen w-full bg-black/50 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 font-jakarta selection:bg-[#131825] selection:text-white">
      {/* Centered Modal Card */}
      <div className="relative w-full max-w-[460px] max-h-[92vh] overflow-y-auto bg-white rounded-[32px] shadow-[0_24px_70px_rgba(0,0,0,0.18)] p-8 sm:p-10 border border-gray-100/80 animate-in fade-in zoom-in-95 duration-200">
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
        <div className="text-center mb-6 space-y-2">
          <Link
            href="/"
            className="font-rubik text-3xl sm:text-4xl font-extrabold tracking-tight text-[#131825] hover:opacity-85 transition-opacity inline-block cursor-pointer"
            title="Best Auto Home"
          >
            Logo
          </Link>
          <div className="space-y-1 pt-1">
            <h2 className="font-rubik text-2xl sm:text-[28px] font-bold text-[#131825] tracking-tight">
              Create an Account
            </h2>
            <p className="text-xs sm:text-sm text-gray-500 font-normal">
              Join Best Auto to enjoy exclusive deals and discounts
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-5 p-3.5 bg-red-50/80 border border-red-200 text-red-700 rounded-xl text-xs font-medium animate-in fade-in">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleRegister} className="space-y-3.5">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-700">
              Full Name
            </label>
            <div className="relative group">
              <User className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                placeholder="Viezh Robert"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full bg-[#FAFAFB] hover:bg-white focus:bg-white pl-10 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm border border-gray-200 hover:border-gray-300 rounded-2xl focus:ring-4 focus:ring-black/5 focus:border-[#131825] focus:outline-none transition-all"
              />
            </div>
          </div>

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
                className="w-full bg-[#FAFAFB] hover:bg-white focus:bg-white pl-10 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm border border-gray-200 hover:border-gray-300 rounded-2xl focus:ring-4 focus:ring-black/5 focus:border-[#131825] focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-700">
              Phone Number
            </label>
            <div className="relative group">
              <Phone className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-[#FAFAFB] hover:bg-white focus:bg-white pl-10 pr-4 py-2.5 sm:py-3 text-xs sm:text-sm border border-gray-200 hover:border-gray-300 rounded-2xl focus:ring-4 focus:ring-black/5 focus:border-[#131825] focus:outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-semibold text-gray-700">
              Password
            </label>
            <div className="relative group">
              <Lock className="w-4 h-4 text-gray-400 group-hover:text-gray-600 transition-colors absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#FAFAFB] hover:bg-white focus:bg-white pl-10 pr-10 py-2.5 sm:py-3 text-xs sm:text-sm border border-gray-200 hover:border-gray-300 rounded-2xl focus:ring-4 focus:ring-black/5 focus:border-[#131825] focus:outline-none transition-all"
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

          <div className="pt-1">
            <label className="flex items-center gap-2 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 text-[#131825] rounded border-gray-300 focus:ring-0 cursor-pointer"
              />
              <span className="text-xs text-gray-600">
                I agree to the{' '}
                <a href="#terms" className="font-semibold text-[#131825] hover:text-[#FA8B2B] transition-colors">
                  Terms of Service
                </a>
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-[#131825] hover:bg-black disabled:opacity-50 text-white py-3.5 rounded-2xl font-bold text-xs sm:text-sm tracking-wide transition-all shadow-md hover:shadow-xl active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 mt-4"
          >
            <span>{isLoading ? 'Creating Account...' : 'Sign Up'}</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </form>

        {/* Switch Mode Footer */}
        <div className="text-center mt-6 text-xs text-gray-500">
          Already have an account?{' '}
          <Link
            href="/login"
            className="font-bold text-[#131825] hover:text-[#FA8B2B] transition-colors ml-1"
          >
            Log In
          </Link>
        </div>
      </div>
    </div>
  );
}
