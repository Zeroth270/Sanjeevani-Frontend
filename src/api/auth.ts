import { apiClient } from './client';
import type { LoginRequest, RegisterRequest, AuthResponse } from '@/types/auth';

export const authApi = {
  login: (data: LoginRequest) =>
    apiClient.post<AuthResponse>('/auth/login', data).then((r) => r.data),

  register: (data: RegisterRequest) =>
    apiClient.post<AuthResponse>('/auth/register', data).then((r) => r.data),

  refresh: (refreshToken: string) =>
    apiClient
      .post<{ accessToken: string }>('/auth/refresh', { refreshToken })
      .then((r) => r.data),

  me: () => apiClient.get('/auth/me').then((r) => r.data),
};
