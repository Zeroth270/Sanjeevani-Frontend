import { cn } from '@/lib/utils';

interface SkeletonLoaderProps {
  className?: string;
  variant?: 'text' | 'card' | 'image' | 'table';
  count?: number;
}

function Skeleton({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-navy-200/40',
        className
      )}
      aria-hidden="true"
    />
  );
}

function TextSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: lines }).map((_, i) => (
        <Skeleton
          key={i}
          className={cn('h-4', i === lines - 1 ? 'w-3/4' : 'w-full')}
        />
      ))}
    </div>
  );
}

function CardSkeleton() {
  return (
    <div className="glass rounded-2xl p-6">
      <Skeleton className="mb-4 h-5 w-1/2" />
      <Skeleton className="mb-2 h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
    </div>
  );
}

function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="space-y-3">
      <div className="flex gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-4 flex-1" />
        ))}
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex gap-4">
          {Array.from({ length: 4 }).map((_, j) => (
            <Skeleton key={j} className="h-4 flex-1" />
          ))}
        </div>
      ))}
    </div>
  );
}

export function SkeletonLoader({
  className,
  variant = 'text',
  count = 1,
}: SkeletonLoaderProps) {
  const items = Array.from({ length: count });

  switch (variant) {
    case 'card':
      return (
        <div className={cn('grid gap-4 md:grid-cols-2 lg:grid-cols-3', className)}>
          {items.map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      );
    case 'table':
      return (
        <div className={cn(className)}>
          <TableSkeleton rows={count} />
        </div>
      );
    case 'text':
      return (
        <div className={cn('space-y-4', className)}>
          {items.map((_, i) => (
            <TextSkeleton key={i} lines={3} />
          ))}
        </div>
      );
    default:
      return (
        <div className={cn('space-y-2', className)}>
          {items.map((_, i) => (
            <Skeleton key={i} className="h-4 w-full" />
          ))}
        </div>
      );
  }
}
