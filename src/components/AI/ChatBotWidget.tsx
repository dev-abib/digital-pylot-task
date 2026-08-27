'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import {
  Bot,
  Send,
  Sparkles,
  X,
  CheckCircle2,
  ChevronRight,
  RotateCcw,
  Car,
  Shield,
  Plane,
  Clock,
  Zap,
  ArrowLeft,
  Calendar,
  Users,
  CreditCard,
} from 'lucide-react';
import { CarItem } from '@/data/mockData';
import { BookingModal } from '@/components/Cards/BookingModal';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  matchedCars?: CarItem[];
  timestamp: string;
}

interface QuickPromptCategory {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  query: string;
}

const QUICK_PROMPTS: QuickPromptCategory[] = [
  { icon: Car, label: 'Sports Cars', query: 'Recommend a high performance sports car' },
  { icon: Shield, label: 'Deposit Policy', query: 'What is your security deposit and insurance policy?' },
  { icon: Users, label: '7-Seater SUVs', query: 'I need a 7-seater SUV for family travel' },
  { icon: Calendar, label: 'Min Rental Day', query: 'What is the minimum renting day?' },
  { icon: Plane, label: 'Airport Delivery', query: 'Do you offer airport delivery at London Heathrow?' },
  { icon: Zap, label: 'Electric / EV', query: 'Show me available electric or hybrid luxury cars' },
  { icon: CreditCard, label: 'Payment Info', query: 'What payment methods do you accept?' },
  { icon: Clock, label: 'Cancellation', query: 'What is your booking cancellation policy?' },
];

const INITIAL_MESSAGE: Message = {
  id: 'welcome-1',
  sender: 'ai',
  text: '👋 Welcome to **Best Auto Concierge**!\n\nI am your 24/7 AI Luxury Rental Assistant. Ask me for vehicle recommendations, real-time rates, airport delivery, or rental policies.',
  timestamp: 'Just now',
};

const STORAGE_KEY = 'bestauto_ai_chat_history_v2';

export function ChatBotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCarForBooking, setSelectedCarForBooking] = useState<CarItem | null>(null);
  const [showPromptList, setShowPromptList] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // 1. Load chat history from localStorage on initial mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setMessages(parsed);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  // 2. Persist chat history to localStorage
  useEffect(() => {
    try {
      if (messages.length > 0) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      }
    } catch {
      // Ignore storage errors
    }
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [messages, isOpen]);

  // Lock body scroll on mobile viewport when chat is open
  useEffect(() => {
    if (isOpen && typeof window !== 'undefined' && window.innerWidth < 640) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const handleResetChat = () => {
    setMessages([INITIAL_MESSAGE]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  };

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || inputValue).trim();
    if (!query || isLoading) return;

    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInputValue('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query,
          history: messages.slice(-4).map((m) => ({ role: m.sender === 'user' ? 'user' : 'assistant', content: m.text })),
        }),
      });

      const data = await res.json();

      const aiMsg: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.reply || 'Here are our top available options matching your request.',
        matchedCars: data.matchedCars,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err) {
      console.error('Chat error:', err);
      setMessages((prev) => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'ai',
          text: 'Our concierge is refreshing fleet telemetry. Please explore our featured fleet on the homepage or try again in a moment!',
          timestamp: 'Just now',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* 1. Floating Launcher Button */}
      <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 font-jakarta">
        {!isOpen && (
          <button
            type="button"
            onClick={() => setIsOpen(true)}
            className="group relative flex items-center gap-3 bg-[#131825] hover:bg-black text-white pl-3.5 pr-5 py-3 rounded-full shadow-[0_10px_30px_rgba(0,0,0,0.3)] hover:shadow-[0_15px_35px_rgba(255,159,67,0.35)] hover:scale-105 active:scale-95 transition-all duration-300 border border-white/15 cursor-pointer"
            aria-label="Open AI Concierge"
          >
            <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF9F43] opacity-75" />
              <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#FF9F43]" />
            </span>

            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FF9F43] to-[#FF8A00] flex items-center justify-center text-white shadow-xs">
              <Sparkles className="w-4 h-4" />
            </div>

            <div className="text-left leading-tight">
              <p className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">AI Concierge</p>
              <p className="text-xs font-bold text-white">Ask Anything</p>
            </div>
          </button>
        )}
      </div>

      {/* 2. Responsive Chat Window (Native Full-Screen App on Mobile, Floating Luxury Card on Desktop) */}
      {isOpen && (
        <div className="fixed inset-0 sm:inset-auto sm:bottom-6 sm:right-6 w-full sm:w-[420px] h-[100dvh] sm:h-[640px] sm:max-h-[88vh] bg-white sm:rounded-3xl shadow-[0_25px_70px_rgba(0,0,0,0.3)] sm:border sm:border-gray-100 z-50 flex flex-col overflow-hidden font-jakarta animate-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="bg-[#131825] text-white px-4 py-3.5 sm:px-5 sm:py-4 flex items-center justify-between shrink-0 border-b border-white/10 select-none">
            <div className="flex items-center gap-3">
              {/* Mobile Back button */}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="sm:hidden -ml-1 w-8 h-8 rounded-full hover:bg-white/10 flex items-center justify-center text-gray-300"
                title="Back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>

              <div className="relative w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-[#FF9F43] to-[#FF8A00] flex items-center justify-center shadow-md shrink-0">
                <Bot className="w-5 h-5 text-white" />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#28C76F] ring-2 ring-[#131825]" />
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-bold text-sm text-white">Best Auto AI</h3>
                  <span className="text-[9px] bg-[#28C76F]/20 text-[#28C76F] font-extrabold px-1.5 py-0.2 rounded-full">
                    LIVE
                  </span>
                </div>
                <p className="text-[11px] text-gray-400 truncate max-w-[180px] sm:max-w-none">
                  Luxury Rental Concierge
                </p>
              </div>
            </div>

            {/* Header Action Buttons */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleResetChat}
                className="w-8 h-8 rounded-xl hover:bg-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
                title="Reset conversation"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="hidden sm:flex w-8 h-8 rounded-xl hover:bg-white/10 items-center justify-center text-gray-400 hover:text-white transition-colors cursor-pointer"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Body */}
          <div className="flex-1 p-3.5 sm:p-4 overflow-y-auto custom-scrollbar space-y-3.5 bg-[#F8F9FA]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-[88%] sm:max-w-[85%] rounded-2xl px-4 py-3 leading-relaxed text-[13px] ${
                    msg.sender === 'user'
                      ? 'bg-[#131825] text-white rounded-br-xs shadow-xs'
                      : 'bg-white text-gray-800 border border-gray-100 rounded-tl-xs shadow-xs'
                  }`}
                >
                  <p className="whitespace-pre-line">{msg.text}</p>
                </div>

                {/* Embedded Vehicle Match Cards */}
                {msg.matchedCars && msg.matchedCars.length > 0 && (
                  <div className="mt-2.5 w-full space-y-2">
                    <p className="text-[11px] font-bold text-gray-500 flex items-center gap-1.5 px-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#28C76F]" />
                      <span>Recommended Fleet Matches:</span>
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {msg.matchedCars.map((car) => (
                        <div
                          key={car.id}
                          className="bg-white p-2.5 sm:p-3 rounded-2xl border border-gray-100 shadow-xs flex items-center justify-between gap-3 hover:border-[#FF9F43] transition-all group"
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <div className="relative w-13 h-10 sm:w-14 sm:h-11 rounded-xl overflow-hidden bg-gray-50 border border-gray-100 shrink-0">
                              <Image
                                src={car.image}
                                alt={car.name}
                                fill
                                sizes="56px"
                                className="object-cover group-hover:scale-105 transition-transform"
                              />
                            </div>
                            <div className="min-w-0">
                              <p className="font-bold text-gray-900 truncate text-xs group-hover:text-[#FF9F43] transition-colors">
                                {car.name}
                              </p>
                              <p className="text-[10px] text-gray-400">
                                {car.seats} Seats • {car.transmission}
                              </p>
                            </div>
                          </div>

                          <div className="text-right shrink-0">
                            <p className="font-extrabold text-gray-900 text-xs">
                              ${car.price}
                              <span className="text-[10px] text-gray-400 font-normal">/d</span>
                            </p>
                            <button
                              type="button"
                              onClick={() => setSelectedCarForBooking(car)}
                              className="mt-1 bg-[#FF9F43] hover:bg-[#FF8A00] text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-2xs cursor-pointer transition-all active:scale-95 flex items-center gap-1"
                            >
                              <span>Book</span>
                              <ChevronRight className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <span className="text-[10px] text-gray-400 mt-1 px-1.5">{msg.timestamp}</span>
              </div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-gray-500 bg-white border border-gray-100 px-4 py-2.5 rounded-2xl w-fit shadow-xs animate-pulse">
                <Sparkles className="w-3.5 h-3.5 animate-spin text-[#FF9F43]" />
                <span className="text-xs font-medium">Concierge is typing...</span>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts - Complete Flex Wrap Section with Clean Wrap & Full Visibility */}
          <div className="p-2.5 bg-white border-t border-gray-100 shrink-0 select-none">
            <div className="flex items-center justify-between mb-1.5 px-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                Suggested Inquiries
              </span>
              <button
                type="button"
                onClick={() => setShowPromptList(!showPromptList)}
                className="text-[10px] text-gray-400 hover:text-gray-600 font-medium cursor-pointer"
              >
                {showPromptList ? 'Hide' : 'Show All'}
              </button>
            </div>

            {showPromptList && (
              <div className="flex flex-wrap items-center gap-1.5">
                {QUICK_PROMPTS.map((item, i) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleSendMessage(item.query)}
                      className="group inline-flex items-center gap-1.5 bg-[#F8F9FA] hover:bg-[#FFF4EC] text-[#334155] hover:text-[#FF8A00] border border-gray-200 hover:border-[#FFD8B2] text-[11px] font-semibold px-2.5 py-1.5 rounded-lg transition-all cursor-pointer shadow-2xs hover:shadow-xs active:scale-95"
                    >
                      <Icon className="w-3 h-3 text-[#FF9F43] group-hover:scale-110 transition-transform shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Input Footer Bar with Safe-Area support */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 sm:p-3.5 bg-white border-t border-gray-100 flex items-center gap-2 shrink-0 pb-[max(12px,env(safe-area-inset-bottom))]"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about cars, policies, rates..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#FF9F43]/20 focus:border-[#FF9F43] focus:bg-white transition-all"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="w-9 h-9 rounded-xl bg-[#FF9F43] hover:bg-[#FF8A00] disabled:opacity-40 text-white flex items-center justify-center transition-all cursor-pointer shrink-0 shadow-xs active:scale-95"
              title="Send Message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* Booking Modal triggered from chat */}
      <BookingModal
        car={selectedCarForBooking}
        isOpen={!!selectedCarForBooking}
        onClose={() => setSelectedCarForBooking(null)}
      />
    </>
  );
}
