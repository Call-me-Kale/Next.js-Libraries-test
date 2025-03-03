'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const baseStyles = 'px-4 py-2 rounded-md font-medium transition';
    const variants = {
      primary: 'bg-blue-600 text-white hover:bg-blue-700',
      secondary: 'bg-gray-300 text-black hover:bg-gray-400',
      danger: 'bg-red-600 text-white hover:bg-red-700'
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], className!)}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';
