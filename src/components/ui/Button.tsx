import { type ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'primary',
      size = 'md',
      loading = false,
      disabled,
      children,
      ...props
    },
    ref
  ) => (
    <button
      ref={ref}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-saffron-400 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',

        size === 'sm' && 'px-3 py-1.5 text-sm',
        size === 'md' && 'px-5 py-2.5 text-sm',
        size === 'lg' && 'px-7 py-3 text-base',

        variant === 'primary' &&
          'bg-saffron-500 text-white shadow-md shadow-saffron-200 hover:bg-saffron-600 active:bg-saffron-700',
        variant === 'secondary' &&
          'glass text-navy-800 hover:bg-white/90 active:bg-white/80',
        variant === 'ghost' &&
          'text-navy-600 hover:bg-navy-50 hover:text-navy-800',
        variant === 'danger' &&
          'bg-danger text-white shadow-md hover:bg-red-600 active:bg-red-700',

        className
      )}
      {...props}
    >
      {loading && <Loader2 className="h-4 w-4 animate-spin" />}
      {children}
    </button>
  )
);

Button.displayName = 'Button';

export { Button };
export type { ButtonProps };
