import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './contexts/AuthContext';
import { AppLayout } from './components/AppLayout';

import Landing from './pages/Landing';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import PapersList from './pages/PapersList';
import PaperDetail from './pages/PaperDetail';
import UploadPaper from './pages/UploadPaper';
import MoleculeDetail from './pages/MoleculeDetail';
import PatentDossier from './pages/PatentDossier';
import Alerts from './pages/Alerts';
import InstitutionAdmin from './pages/InstitutionAdmin';
import Settings from './pages/Settings';

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            {/* Public */}
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Authenticated */}
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/papers" element={<PapersList />} />
              <Route path="/papers/upload" element={<UploadPaper />} />
              <Route path="/papers/:id" element={<PaperDetail />} />
              <Route path="/molecules/:id" element={<MoleculeDetail />} />
              <Route path="/molecules/:id/dossier" element={<PatentDossier />} />
              <Route path="/alerts" element={<Alerts />} />
              <Route path="/admin/institution" element={<InstitutionAdmin />} />
              <Route path="/settings" element={<Settings />} />
            </Route>

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}
