import { apiClient } from './client';
import type { Alert } from '@/types/models';

export const alertsApi = {
  list: (unread?: boolean) =>
    apiClient
      .get<Alert[]>('/alerts', { params: unread != null ? { unread } : {} })
      .then((r) => r.data),

  markRead: (id: string) =>
    apiClient.patch(`/alerts/${id}/read`).then((r) => r.data),
};
