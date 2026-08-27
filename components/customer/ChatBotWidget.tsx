'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  X,
  Send,
  Sparkles,
  Bot,
  User,
  RefreshCw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Vehicle } from '@/lib/types';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  suggestedVehicles?: Vehicle[];
}

interface ChatBotWidgetProps {
  onSelectVehicle?: (vehicle: Vehicle) => void;
}

const quickPrompts = [
  'Recommend a car for a family of 5',
  'What is the security deposit & age limit?',
  'Best electric car for a road trip?',
  'What is the cancellation policy?'
];

export function ChatBotWidget({ onSelectVehicle }: ChatBotWidgetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init-1',
      role: 'assistant',
      content:
        "👋 Welcome to LuxeDrive! I'm your AI Fleet Concierge powered by OpenAI. Ask me anything about our vehicles, rental terms, or let me recommend the perfect ride for your trip!",
      timestamp: 'Active'
    }
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef(1);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    counterRef.current += 1;
    const userMsgId = `msg-${counterRef.current}`;
    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMessage: Message = {
      id: userMsgId,
      role: 'user',
      content: query,
      timestamp: currentTime
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInput('');
    setLoading(true);

    try {
      const res = await fetch('/app/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userQuery: query,
          messages: [...messages, userMessage].map((m) => ({
            role: m.role,
            content: m.content
          }))
        })
      });

      const data = await res.json();
      counterRef.current += 1;
      const botMsgId = `bot-${counterRef.current}`;

      const botMessage: Message = {
        id: botMsgId,
        role: 'assistant',
        content: data.reply || "I'm here to help with your rental inquiry. Could you provide a bit more detail?",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedVehicles: data.suggestedVehicles
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch {
      counterRef.current += 1;
      setMessages((prev) => [
        ...prev,
        {
          id: `bot-err-${counterRef.current}`,
          role: 'assistant',
          content: 'Sorry, I encountered a temporary connection issue. Please feel free to browse our fleet or try again!',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Trigger Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-slate-900 text-white shadow-2xl hover:bg-slate-800 border border-amber-500/30 hover:scale-105 transition-all duration-300"
          aria-label="Open AI Rental Concierge"
        >
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 shadow-md">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="text-left pr-1">
            <div className="text-xs font-bold flex items-center gap-1.5">
              <span>AI Concierge</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            </div>
            <div className="text-[10px] text-slate-400">Ask policies & recommendations</div>
          </div>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="w-[380px] sm:w-[420px] h-[580px] max-h-[85vh] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
          {/* Chat Header */}
          <div className="p-4 bg-slate-950 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-slate-950 font-black shadow">
                <Bot className="w-5 h-5 text-slate-950" />
              </div>
              <div>
                <div className="text-sm font-bold flex items-center gap-1.5">
                  <span>LuxeDrive AI Concierge</span>
                  <Badge variant="secondary" className="bg-amber-500/20 text-amber-300 text-[10px] px-1.5 py-0 border-0 font-normal">
                    OpenAI
                  </Badge>
                </div>
                <div className="text-[11px] text-slate-400">
                  Fleet Guide & Policy Assistant
                </div>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-2.5 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                )}

                <div className="max-w-[82%] space-y-2">
                  <div
                    className={`p-3 rounded-2xl leading-relaxed whitespace-pre-line ${
                      msg.role === 'user'
                        ? 'bg-amber-500 text-slate-950 font-medium rounded-tr-xs'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-xs'
                    }`}
                  >
                    {msg.content}
                  </div>

                  {/* If assistant attached suggested vehicles */}
                  {msg.suggestedVehicles && msg.suggestedVehicles.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Matched Fleet Options
                      </div>
                      {msg.suggestedVehicles.map((v) => (
                        <div
                          key={v.id}
                          className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 flex items-center justify-between gap-2 shadow-sm hover:border-amber-500 transition"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-8 bg-slate-200 dark:bg-slate-700 rounded-md overflow-hidden flex-shrink-0">
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img src={v.imageUrl} alt={v.name} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 dark:text-white line-clamp-1">{v.name}</div>
                              <div className="text-[10px] text-amber-500 font-semibold">${v.pricePerDay}/day • {v.category}</div>
                            </div>
                          </div>
                          {onSelectVehicle && (
                            <Button
                              size="sm"
                              onClick={() => {
                                onSelectVehicle(v);
                                setIsOpen(false);
                              }}
                              className="h-7 text-[10px] px-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold"
                            >
                              Book
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <div className={`text-[10px] text-slate-400 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                    {msg.timestamp}
                  </div>
                </div>

                {msg.role === 'user' && (
                  <div className="w-6 h-6 rounded-full bg-slate-900 text-slate-200 flex items-center justify-center shrink-0 mt-0.5">
                    <User className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <div className="w-6 h-6 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center animate-spin">
                  <RefreshCw className="w-3.5 h-3.5" />
                </div>
                <span>AI Concierge is thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Chips */}
          <div className="px-3 py-2 bg-slate-50 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800/80 overflow-x-auto whitespace-nowrap flex gap-1.5 no-scrollbar">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(prompt)}
                className="text-[10px] px-2.5 py-1 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-amber-500 hover:text-amber-500 transition shrink-0"
              >
                {prompt}
              </button>
            ))}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2"
          >
            <Input
              placeholder="Ask about deposits, cars, rules..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="text-xs h-9 bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700"
            />
            <Button
              type="submit"
              size="icon"
              disabled={loading || !input.trim()}
              className="h-9 w-9 bg-amber-500 hover:bg-amber-600 text-slate-950 shrink-0"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      )}
    </div>
  );
}
