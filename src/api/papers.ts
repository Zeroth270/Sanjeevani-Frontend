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
      .get<PaginatedResponse<any>>('/papers', { params })
      .then((r) => {
        const mappedContent = (r.data.content || []).map((p: any) => {
          let statusMapped = p.status;
          if (statusMapped === 'PROCESSED') statusMapped = 'COMPLETED';
          if (statusMapped === 'PENDING') statusMapped = 'PROCESSING';
          return {
            ...p,
            id: String(p.id),
            uploadedAt: p.createdAt,
            status: statusMapped,
            moleculeCount: p.molecules ? p.molecules.length : 0,
            novelMoleculeCount: p.molecules ? p.molecules.filter((m: any) => m.latestScan?.isNovel).length : 0,
          };
        });
        return {
          ...r.data,
          content: mappedContent,
        } as PaginatedResponse<Paper>;
      }),

  getById: (id: string) =>
    apiClient.get<any>(`/papers/${id}`).then((r) => {
      const data = r.data;
      let statusMapped = data.status;
      if (statusMapped === 'PROCESSED') statusMapped = 'COMPLETED';
      if (statusMapped === 'PENDING') statusMapped = 'PROCESSING';
      return {
        id: String(data.id),
        title: data.title,
        authors: data.authors,
        status: statusMapped,
        uploadedAt: data.createdAt,
        molecules: (data.molecules || []).map((m: any) => {
          let status = 'UNCERTAIN';
          if (m.latestScan) {
            status = m.latestScan.isNovel ? 'NOVEL' : 'KNOWN';
          }
          return {
            id: String(m.id),
            smiles: m.smiles,
            iupacName: m.iupacName || m.extractedNameRaw,
            confidenceScore: m.extractionConfidence != null ? Number(m.extractionConfidence) : 0,
            status: status,
            noveltyScore: m.latestScan ? Number(m.latestScan.noveltyScore) : 0,
            tanimotoSimilarity: m.latestScan ? Number(m.latestScan.tanimotoSimilarity) : 0,
            closestKnownMatch: m.latestScan ? m.latestScan.closestMatchId : undefined,
          };
        }),
      } as any;
    }),

  upload: (formData: FormData) =>
    apiClient
      .post<Paper>('/papers', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      .then((r) => r.data),
};
