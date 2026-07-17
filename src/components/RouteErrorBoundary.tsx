import { useRouteError, Link } from 'react-router-dom';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { Button } from './ui/Button';
import { GlassCard } from './ui/GlassCard';

export function RouteErrorBoundary() {
  const error = useRouteError() as any;
  console.error('RouteErrorBoundary caught:', error);

  const errorMessage =
    error?.message ||
    error?.statusText ||
    (typeof error === 'string' ? error : 'An unexpected error occurred.');

  return (
    <div className="flex min-h-[500px] items-center justify-center p-6 md:p-10 bg-pearl-50 dark:bg-zinc-950 transition-colors duration-300">
      <GlassCard variant="strong" className="max-w-md w-full p-8 text-center border border-white/20 dark:border-zinc-800 shadow-2xl">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10 text-red-500 dark:text-red-400">
          <AlertTriangle className="h-8 w-8" />
        </div>
        <h2 className="mb-2 text-2xl font-bold tracking-tight text-navy-900 dark:text-white font-display">
          Application Error
        </h2>
        <p className="mb-6 text-sm text-navy-500 dark:text-zinc-400 leading-relaxed font-mono bg-zinc-50 dark:bg-zinc-900/50 p-4 rounded-xl border border-zinc-200/50 dark:border-zinc-800/50 text-left overflow-auto max-h-[150px]">
          {errorMessage}
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="primary"
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 justify-center shadow-lg shadow-emerald-500/10"
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </Button>
          <Link to="/" className="w-full sm:w-auto">
            <Button
              variant="secondary"
              className="w-full flex items-center gap-2 justify-center"
            >
              <Home className="h-4 w-4" />
              <span>Go to Home</span>
            </Button>
          </Link>
        </div>
      </GlassCard>
    </div>
  );
}
