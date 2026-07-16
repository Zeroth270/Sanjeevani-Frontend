import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { SkeletonLoader } from './SkeletonLoader';

export function Layout() {
  return (
    <div className="min-h-screen">
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
