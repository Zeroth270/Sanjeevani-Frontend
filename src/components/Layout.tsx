import { Suspense } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { SkeletonLoader } from './SkeletonLoader';
import { FlaskConical, Sun, Moon } from 'lucide-react';
import { useDarkMode } from '@/hooks/useDarkMode';

export function Layout() {
  const { isDark, toggle } = useDarkMode();
  const location = useLocation();

  const navLinks = [
    { label: 'Dashboard', href: '/dashboard' },
    { label: 'Papers', href: '/papers' },
    { label: 'Alerts', href: '/alerts' },
    { label: 'Settings', href: '/settings' },
  ];

  const isLanding = location.pathname === '/';

  return (
    <div className="min-h-screen bg-pearl-50 dark:bg-zinc-950 transition-colors duration-500">
      {!isLanding && (
        <header className="sticky top-0 z-50 flex items-center justify-between px-6 py-3 md:px-8 max-w-7xl mx-auto border-b border-zinc-200/50 dark:border-zinc-800/50 bg-pearl-50/80 dark:bg-zinc-950/80 backdrop-blur-md">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-purple-500 to-purple-400 text-white shadow-md shadow-purple-500/20">
              <FlaskConical className="h-4.5 w-4.5" />
            </div>
            <span className="text-lg font-bold tracking-tight text-zinc-900 dark:text-white font-display">
              sanjeevani<span className="text-purple-400">.</span>
            </span>
          </Link>

          <nav className="flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`relative px-3 py-1.5 text-xs font-medium rounded-full border border-transparent transition-all duration-200 ${
                  location.pathname === link.href
                    ? 'border-purple-500/50 text-zinc-500 dark:text-zinc-400'
                    : 'text-zinc-500 dark:text-zinc-400 hover:border-purple-500/30'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <button
            onClick={toggle}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200/50 dark:border-zinc-800/50 bg-white/60 dark:bg-white/5 backdrop-blur-sm text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer"
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="h-4 w-4 text-saffron-400" />
            ) : (
              <Moon className="h-4 w-4 text-zinc-650" />
            )}
          </button>
        </header>
      )}

      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center p-8">
            <SkeletonLoader variant="card" count={3} />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </div>
  );
}
