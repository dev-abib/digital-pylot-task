'use client';

import { Bell, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface AdminHeaderProps {
  title?: string;
  subtitle?: string;
  onRefresh?: () => void;
  isLoading?: boolean;
}

export function AdminHeader({
  title = 'Executive Dashboard',
  subtitle = 'Real-time fleet utilization, revenue trends, and booking logistics',
  onRefresh,
  isLoading = false
}: AdminHeaderProps) {
  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20">
      <div>
        <h1 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
            {subtitle}
          </p>
        )}
      </div>

      <div className="flex items-center gap-3">
        {onRefresh && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRefresh}
            disabled={isLoading}
            className="text-xs h-8 gap-1.5 border-slate-300 dark:border-slate-700"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-amber-500' : ''}`} />
            <span className="hidden md:inline">Refresh Data</span>
          </Button>
        )}

        {/* Notifications */}
        <Button variant="ghost" size="icon" className="relative h-8 w-8 text-slate-600 dark:text-slate-300">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
        </Button>

        <div className="h-4 w-px bg-slate-200 dark:bg-slate-700" />

        {/* Admin Profile */}
        <div className="flex items-center gap-2.5 pl-1">
          <Avatar className="h-8 w-8 border border-amber-500/30">
            <AvatarImage src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80" />
            <AvatarFallback className="bg-amber-600 text-white text-xs font-bold">AD</AvatarFallback>
          </Avatar>
          <div className="hidden lg:block text-left">
            <div className="text-xs font-semibold text-slate-900 dark:text-slate-100">Alex Morgan</div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">Head of Operations</div>
          </div>
        </div>
      </div>
    </header>
  );
}
