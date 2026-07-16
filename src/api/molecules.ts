import { apiClient } from './client';
import type { Molecule, DisclosureWindow } from '@/types/models';

export const moleculesApi = {
  getById: (id: string) =>
    apiClient.get<Molecule>(`/molecules/${id}`).then((r) => r.data),

  startDisclosureWindow: (id: string) =>
    apiClient
      .post<DisclosureWindow>(`/molecules/${id}/disclosure-window`)
      .then((r) => r.data),

  filePatent: (id: string) =>
    apiClient
      .post<{ filingId: string }>(`/molecules/${id}/patent-filing`)
      .then((r) => r.data),
};
