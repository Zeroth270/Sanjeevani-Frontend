import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { ProtectedRoute } from '@/components/ProtectedRoute';

const LandingPage = lazy(() => import('@/features/landing/LandingPage'));
const LoginPage = lazy(() => import('@/features/auth/LoginPage'));
const RegisterPage = lazy(() => import('@/features/auth/RegisterPage'));
const DashboardPage = lazy(() => import('@/features/dashboard/DashboardPage'));
const PapersPage = lazy(() => import('@/features/papers/PapersPage'));
const PaperUploadPage = lazy(() => import('@/features/papers/PaperUploadPage'));
const PaperDetailPage = lazy(() => import('@/features/papers/PaperDetailPage'));
const MoleculeDetailPage = lazy(
  () => import('@/features/molecules/MoleculeDetailPage')
);
const AlertsPage = lazy(() => import('@/features/alerts/AlertsPage'));
const AdminInstitutionPage = lazy(
  () => import('@/features/admin/AdminInstitutionPage')
);
const SettingsPage = lazy(() => import('@/features/settings/SettingsPage'));

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/login', element: <LoginPage /> },
      { path: '/register', element: <RegisterPage /> },
      {
        path: '/dashboard',
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/papers',
        element: (
          <ProtectedRoute>
            <PapersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/papers/upload',
        element: (
          <ProtectedRoute>
            <PaperUploadPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/papers/:id',
        element: (
          <ProtectedRoute>
            <PaperDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/molecules/:id',
        element: (
          <ProtectedRoute>
            <MoleculeDetailPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/alerts',
        element: (
          <ProtectedRoute>
            <AlertsPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/admin/institution',
        element: (
          <ProtectedRoute requiredRole="ADMIN">
            <AdminInstitutionPage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/settings',
        element: (
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        ),
      },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);
