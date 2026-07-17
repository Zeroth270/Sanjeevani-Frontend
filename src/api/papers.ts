import { apiClient } from './client';
import type { Paper, PaginatedResponse } from '@/types/models';

export interface PapersQueryParams {
  status?: string;
  institution?: string;
  search?: string;
  page?: number;
  size?: number;
}

export const papersApi = {
  list: (params?: PapersQueryParams) =>
    apiClient
      .get<PaginatedResponse<Paper>>('/papers', { params })
      .then((r) => r.data),

  getById: (id: string) =>
    apiClient.get<Paper>(`/papers/${id}`).then((r) => r.data),

  upload: (formData: FormData) =>
    apiClient
      .post<Paper>('/papers', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((r) => r.data),
};
