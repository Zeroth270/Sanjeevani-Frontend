import { apiClient } from './client';
import type { Alert, PaginatedResponse } from '@/types/models';

export const alertsApi = {
  list: (unread?: boolean) =>
    apiClient
      .get<PaginatedResponse<any>>('/alerts', { params: unread != null ? { unread } : {} })
      .then((r) => {
        const mappedContent = (r.data.content || []).map((a: any) => {
          let typeMapped: Alert['type'] = 'SYSTEM';
          let title = 'System Alert';

          if (a.alertType === 'NOVEL_MOLECULE_FOUND') {
            typeMapped = 'NOVELTY_FOUND';
            title = 'Novel Molecule Found';
          } else if (a.alertType === 'DISCLOSURE_URGENT') {
            typeMapped = 'DISCLOSURE_URGENT';
            title = 'Disclosure Window Closing';
          } else if (a.alertType === 'PATENT_DEADLINE') {
            typeMapped = 'PATENT_DEADLINE';
            title = 'Patent Grace Period Expired';
          }

          return {
            id: String(a.id),
            type: typeMapped,
            title,
            message: a.message,
            read: !!a.isRead,
            createdAt: a.createdAt,
            moleculeId: a.disclosureWindowId ? String(a.disclosureWindowId) : undefined,
          } as Alert;
        });

        return {
          ...r.data,
          content: mappedContent,
        } as PaginatedResponse<Alert>;
      }),

  markRead: (id: string) =>
    apiClient.patch(`/alerts/${id}/read`).then((r) => r.data),
};
