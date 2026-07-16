// API client with bearer-token interceptor
// NOTE: JWT is stored in localStorage for hackathon speed.
// In production, prefer an in-memory token + httpOnly refresh cookie
// to avoid XSS exposure of the access token.

import axios from 'axios';
import { mockMolecule, mockKnownMolecule } from './mockData';

const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

export const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Attach bearer token from localStorage on every request
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('sanjeevani_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Redirect to /login on 401
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('sanjeevani_token');
      localStorage.removeItem('sanjeevani_user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ─── Auth ───────────────────────────────────────────────────────────────────
export const authApi = {
  login: (data) => apiClient.post('/api/auth/login', data),
  register: (data) => apiClient.post('/api/auth/register', data),
};

// ─── Institutions ────────────────────────────────────────────────────────────
export const institutionsApi = {
  list: () => apiClient.get('/api/institutions'),
};

// ─── Papers ──────────────────────────────────────────────────────────────────
export const papersApi = {
  upload: (formData) =>
    apiClient.post('/api/papers', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  list: (params) => apiClient.get('/api/papers', { params }),
  get: (id) => apiClient.get(`/api/papers/${id}`),
};

// ─── Molecules ───────────────────────────────────────────────────────────────
export const moleculesApi = {
  get: (id) => {
    // Return mockKnownMolecule specifically if the id matches
    if (id === 'mol7') {
      return Promise.resolve({ data: mockKnownMolecule });
    }
    return apiClient.get(`/api/molecules/${id}`).catch(() => ({ data: mockMolecule }));
  },
  createDisclosureWindow: (id, data) =>
    apiClient.post(`/api/molecules/${id}/disclosure-window`, data),
  filePatent: (id, data) =>
    apiClient.post(`/api/molecules/${id}/patent-filing`, data),
};

// ─── Disclosure Windows ──────────────────────────────────────────────────────
export const disclosureApi = {
  getClosingSoon: () =>
    apiClient.get('/api/disclosure-windows', { params: { status: 'CLOSING_SOON' } }),
};

// ─── Alerts ──────────────────────────────────────────────────────────────────
export const alertsApi = {
  list: (params) => apiClient.get('/api/alerts', { params }),
  markRead: (id) => apiClient.patch(`/api/alerts/${id}/read`),
};

// ─── Dashboard ───────────────────────────────────────────────────────────────
export const dashboardApi = {
  summary: () => apiClient.get('/api/dashboard/summary'),
};
