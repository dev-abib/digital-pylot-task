import React from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn('px-4 py-2 bg-slate-900 text-white rounded hover:bg-slate-800 transition', className)}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
