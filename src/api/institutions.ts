import { apiClient } from './client';
import type { Institution } from '@/types/models';

export const institutionApi = {
  list: () =>
    apiClient.get<Institution[]>('/institutions').then((r) => r.data),
};
