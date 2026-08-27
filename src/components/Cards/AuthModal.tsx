'use client';

import React, { useState } from 'react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'register';
  onClose: () => void;
  onSuccess: (user: { name: string; email: string }) => void;
}

export function AuthModal({ isOpen, initialMode, onClose, onSuccess }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSuccess({
      name: name || (email.split('@')[0] || 'User'),
      email: email || 'demo@bestauto.com',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs font-jakarta animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl p-7 border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-5 right-5 p-2 rounded-full hover:bg-gray-100 text-gray-400 hover:text-black cursor-pointer transition-colors"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h2 className="font-rubik text-2xl sm:text-3xl font-bold text-[#131825]">
            {mode === 'login' ? 'Welcome Back' : 'Create an Account'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            {mode === 'login'
              ? 'Log in to manage your car bookings and wishlist'
              : 'Join Best Auto to enjoy exclusive deals and discounts'}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                required
                placeholder="Viezh Robert"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm border rounded-xl focus:ring-2 focus:ring-black/10 focus:outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm border rounded-xl focus:ring-2 focus:ring-black/10 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm border rounded-xl focus:ring-2 focus:ring-black/10 focus:outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#131825] text-white py-3 rounded-[4px] font-bold hover:bg-black active:scale-98 cursor-pointer transition-all shadow-md mt-2"
          >
            {mode === 'login' ? 'Log In' : 'Sign Up'}
          </button>
        </form>

        {/* Switch Mode Footer */}
        <div className="text-center mt-6 text-xs text-gray-600">
          {mode === 'login' ? (
            <p>
              Don&apos;t have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="font-bold text-[#131825] hover:underline cursor-pointer ml-1"
              >
                Sign Up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setMode('login')}
                className="font-bold text-[#131825] hover:underline cursor-pointer ml-1"
              >
                Log In
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
