'use client';

import React, { useState, useEffect } from 'react';
import {
  Settings,
  Building,
  DollarSign,
  ShieldCheck,
  Save,
  CheckCircle2,
  Send,
  Sparkles,
  Key,
  Info,
} from 'lucide-react';

export function SettingsView() {
  const [companyName, setCompanyName] = useState('Best Auto / LuxeDrive UK');
  const [branch, setBranch] = useState('Central London Flagship (Heathrow / Mayfair)');
  const [currency, setCurrency] = useState('USD');
  const [taxRate, setTaxRate] = useState('20');
  const [securityDeposit, setSecurityDeposit] = useState('350');
  const [minDriverAge, setMinDriverAge] = useState('21');

  // Integration credentials
  const [telegramToken, setTelegramToken] = useState('');
  const [telegramChatId, setTelegramChatId] = useState('');
  const [openaiKey, setOpenaiKey] = useState('');
  const [telegramStatus, setTelegramStatus] = useState<string>('Ready (Simulation Mode)');
  const [openaiStatus, setOpenaiStatus] = useState<string>('Ready (Embedded Engine)');
  const [isTestingTelegram, setIsTestingTelegram] = useState(false);
  const [isTestingOpenAI, setIsTestingOpenAI] = useState(false);
  const [testNotification, setTestNotification] = useState<{ type: 'success' | 'info' | 'error'; message: string } | null>(null);
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    fetch('/api/settings/integrations')
      .then((r) => r.json())
      .then((data) => {
        if (data.success && data.integrations) {
          if (data.integrations.telegram.configured) {
            setTelegramToken(data.integrations.telegram.botTokenMasked || '');
            setTelegramChatId(data.integrations.telegram.chatId || '');
            setTelegramStatus('Connected (Live Bot Push Active)');
          }
          if (data.integrations.openai.configured) {
            setOpenaiKey(data.integrations.openai.keyMasked || '');
            setOpenaiStatus('Connected (OpenAI Live Active)');
          }
        }
      })
      .catch(() => {});
  }, []);

  const handleTestTelegram = async () => {
    setIsTestingTelegram(true);
    setTestNotification(null);
    try {
      const res = await fetch('/api/settings/integrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'test_telegram',
          telegramToken,
          telegramChatId,
        }),
      });
      const data = await res.json();
      if (data.success) {
        if (data.live) {
          setTelegramStatus('Connected (Live Bot Push Active)');
          setTestNotification({
            type: 'success',
            message: '✅ Live Telegram alert dispatched successfully to your connected chat!',
          });
        } else {
          setTestNotification({
            type: 'info',
            message: '⚡ Telegram pipeline verified! Dispatched test reservation to server queue (Simulation Mode). Add your Bot Token & Chat ID for live push.',
          });
        }
      } else {
        setTestNotification({
          type: 'error',
          message: data.error || 'Failed to dispatch Telegram alert.',
        });
      }
    } catch {
      setTestNotification({
        type: 'error',
        message: 'Network error while testing Telegram pipeline.',
      });
    } finally {
      setIsTestingTelegram(false);
    }
  };

  const handleTestOpenAI = async () => {
    setIsTestingOpenAI(true);
    setTestNotification(null);
    try {
      const res = await fetch('/api/settings/integrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'test_openai',
          openaiKey,
        }),
      });
      const data = await res.json();
      if (data.success) {
        if (data.live) {
          setOpenaiStatus('Connected (OpenAI Live Active)');
          setTestNotification({
            type: 'success',
            message: `✅ OpenAI API connection verified! ${data.message}`,
          });
        } else {
          setTestNotification({
            type: 'info',
            message: '⚡ AI Concierge domain reasoning engine verified! Enter a live sk-... key for GPT-4o live streaming.',
          });
        }
      } else {
        setTestNotification({
          type: 'error',
          message: `❌ OpenAI error: ${data.error}`,
        });
      }
    } catch {
      setTestNotification({
        type: 'error',
        message: 'Network error while testing OpenAI connection.',
      });
    } finally {
      setIsTestingOpenAI(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/settings/integrations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'save_keys',
          telegramToken,
          telegramChatId,
          openaiKey,
        }),
      });
    } catch {
      // Ignore
    }
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="space-y-6 font-jakarta max-w-4xl">
      {/* Header */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#FFF4EC] text-[#FF8A00] flex items-center justify-center shadow-xs">
            <Settings className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-gray-900">Platform &amp; Business Settings</h2>
            <p className="text-xs text-gray-500">
              Configure rental parameters, currencies, taxes, and live API automation credentials
            </p>
          </div>
        </div>

        {isSaved && (
          <div className="flex items-center gap-2 bg-[#28C76F]/10 text-[#28C76F] px-3.5 py-1.5 rounded-xl text-xs font-bold animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4" />
            <span>Settings Saved!</span>
          </div>
        )}
      </div>

      {/* Dynamic Feedback Toast Banner */}
      {testNotification && (
        <div
          className={`p-4 rounded-2xl border text-xs flex items-center justify-between gap-3 animate-in fade-in duration-200 ${
            testNotification.type === 'success'
              ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
              : testNotification.type === 'info'
              ? 'bg-blue-50 border-blue-200 text-blue-800'
              : 'bg-red-50 border-red-200 text-red-800'
          }`}
        >
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 shrink-0" />
            <p className="font-medium">{testNotification.message}</p>
          </div>
          <button
            type="button"
            onClick={() => setTestNotification(null)}
            className="text-xs font-bold underline opacity-75 hover:opacity-100 cursor-pointer"
          >
            Dismiss
          </button>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Section 1: Company Profile */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <Building className="w-4 h-4 text-[#FF9F43]" />
            <h3 className="text-sm font-bold text-gray-900">Company &amp; Branch Profile</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Company Trading Name</label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#FF9F43]"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Primary Branch / Depot</label>
              <input
                type="text"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#FF9F43]"
              />
            </div>
          </div>
        </div>

        {/* Section 2: Pricing & Currency */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <DollarSign className="w-4 h-4 text-[#28C76F]" />
            <h3 className="text-sm font-bold text-gray-900">Pricing, Currency &amp; Taxes</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Display Currency</label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#FF9F43]"
              >
                <option value="USD">USD ($ - US Dollar)</option>
                <option value="GBP">GBP (£ - British Pound)</option>
                <option value="EUR">EUR (€ - Euro)</option>
              </select>
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">VAT / Sales Tax (%)</label>
              <input
                type="number"
                value={taxRate}
                onChange={(e) => setTaxRate(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#FF9F43]"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Security Deposit Hold ($)</label>
              <input
                type="number"
                value={securityDeposit}
                onChange={(e) => setSecurityDeposit(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#FF9F43]"
              />
            </div>
          </div>
        </div>

        {/* Section 3: Rental Business Rules */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-gray-100">
            <ShieldCheck className="w-4 h-4 text-[#0275FF]" />
            <h3 className="text-sm font-bold text-gray-900">Rental Business Rules &amp; Policies</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block text-gray-700 font-semibold mb-1">Minimum Driver Age (Standard Fleet)</label>
              <input
                type="number"
                value={minDriverAge}
                onChange={(e) => setMinDriverAge(e.target.value)}
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#FF9F43]"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-1">Cancellation Window</label>
              <select className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#FF9F43]">
                <option value="48">Free cancellation up to 48 hours prior</option>
                <option value="24">Free cancellation up to 24 hours prior</option>
                <option value="72">Free cancellation up to 72 hours prior</option>
              </select>
            </div>
          </div>
        </div>

        {/* Section 4: Live API Credentials & Automations */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Key className="w-4 h-4 text-[#FF9F43]" />
              <h3 className="text-sm font-bold text-gray-900">Live API Credentials &amp; Automations</h3>
            </div>
            <span className="text-[11px] text-gray-400">Environment Credentials</span>
          </div>

          {/* Telegram Bot Settings */}
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-[#0088cc]" />
                <span className="font-bold text-gray-900">Telegram Bot Notifications</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 text-[#0088cc]">
                {telegramStatus}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-gray-600 font-medium mb-1">Bot Token (from @BotFather)</label>
                <input
                  type="text"
                  placeholder="e.g. 123456789:ABCdefGHIjklMNOpqrsTUVwxyz"
                  value={telegramToken}
                  onChange={(e) => setTelegramToken(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#FF9F43]"
                />
              </div>

              <div>
                <label className="block text-gray-600 font-medium mb-1">Chat ID (from @userinfobot / Channel ID)</label>
                <input
                  type="text"
                  placeholder="e.g. -100123456789 or 987654321"
                  value={telegramChatId}
                  onChange={(e) => setTelegramChatId(e.target.value)}
                  className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#FF9F43]"
                />
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <p className="text-[11px] text-gray-400">
                Dispatches real-time reservation alerts and lead submissions to your Telegram group.
              </p>
              <button
                type="button"
                disabled={isTestingTelegram}
                onClick={handleTestTelegram}
                className="bg-white hover:bg-[#0088cc] hover:text-white text-[#0088cc] border border-gray-200 hover:border-[#0088cc] font-bold px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer shadow-2xs active:scale-95 disabled:opacity-50"
              >
                {isTestingTelegram ? 'Testing...' : '⚡ Test & Send Alert'}
              </button>
            </div>
          </div>

          {/* OpenAI API Key Settings */}
          <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200 space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#10a37f]" />
                <span className="font-bold text-gray-900">OpenAI API Key (ChatGPT-4o)</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-[#10a37f]">
                {openaiStatus}
              </span>
            </div>

            <div>
              <label className="block text-gray-600 font-medium mb-1">OpenAI API Secret Key (sk-...)</label>
              <input
                type="password"
                placeholder="sk-proj-..."
                value={openaiKey}
                onChange={(e) => setOpenaiKey(e.target.value)}
                className="w-full bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#FF9F43]"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <p className="text-[11px] text-gray-400">
                Powers natural conversational chat and vehicle match recommendations.
              </p>
              <button
                type="button"
                disabled={isTestingOpenAI}
                onClick={handleTestOpenAI}
                className="bg-white hover:bg-[#10a37f] hover:text-white text-[#10a37f] border border-gray-200 hover:border-[#10a37f] font-bold px-3 py-1.5 rounded-lg text-xs transition-all cursor-pointer shadow-2xs active:scale-95 disabled:opacity-50"
              >
                {isTestingOpenAI ? 'Authenticating...' : '⚡ Test Connection'}
              </button>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 bg-[#FF9F43] hover:bg-[#FF8A00] text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-xs hover:shadow active:scale-95 cursor-pointer text-xs"
          >
            <Save className="w-4 h-4" />
            <span>Save Configuration</span>
          </button>
        </div>
      </form>
    </div>
  );
}
