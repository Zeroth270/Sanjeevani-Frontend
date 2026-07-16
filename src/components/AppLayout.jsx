import { Outlet, Navigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { useAuth } from '../contexts/AuthContext';

export function AppLayout() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden', background: '#0f172a' }}>
      <Sidebar />
      <main style={{ flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '36px 40px', minHeight: '100%' }}>
          <Outlet />
        </div>
      </main>
    </div>
  );
}
