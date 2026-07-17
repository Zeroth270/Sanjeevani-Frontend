import { type HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'saffron' | 'strong';
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-2xl p-6 transition-all duration-300',
        variant === 'default' && 'glass',
        variant === 'saffron' && 'glass-saffron',
        variant === 'strong' && 'glass-strong',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);

GlassCard.displayName = 'GlassCard';

export { GlassCard };
export type { GlassCardProps };
