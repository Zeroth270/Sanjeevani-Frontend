import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info';
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className, variant = 'default', children, ...props }, ref) => (
    <span
      ref={ref}
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold tracking-wide',

        variant === 'default' && 'bg-navy-100 text-navy-700',
        variant === 'success' && 'bg-emerald-100 text-emerald-700',
        variant === 'warning' && 'bg-saffron-100 text-saffron-700',
        variant === 'danger' && 'bg-red-100 text-red-700',
        variant === 'info' && 'bg-blue-100 text-blue-700',

        className
      )}
      {...props}
    >
      {children}
    </span>
  )
);

Badge.displayName = 'Badge';

export { Badge };
export type { BadgeProps };
