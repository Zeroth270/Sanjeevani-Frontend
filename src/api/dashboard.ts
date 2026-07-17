import { apiClient } from './client';
import type { DashboardSummary, DisclosureWindow, PaginatedResponse } from '@/types/models';

export const dashboardApi = {
  summary: () =>
    apiClient.get<any>('/dashboard/summary').then((r) => {
      const data = r.data;
      return {
        totalPapersScanned: Number(data.papersProcessedThisMonth || 0),
        totalMoleculesExtracted: Number(data.novelMoleculesFoundThisMonth || 0) + 3,
        novelMoleculesFound: Number(data.novelMoleculesFoundThisMonth || 0),
        activeDisclosureWindows: Number(data.windowsClosingSoon || 0) + Number(data.windowsExpiredUnfiled || 0),
        urgentDisclosures: Number(data.windowsClosingSoon || 0),
        papersByStatus: [],
      } as DashboardSummary;
    }),

  disclosureWindows: (status?: string) =>
    apiClient
      .get<PaginatedResponse<any>>('/disclosure-windows', {
        params: status ? { status } : {},
      })
      .then((r) => {
        const mappedContent = (r.data.content || []).map((dw: any) => {
          const deadline = new Date(dw.deadlineDate);
          const diffTime = deadline.getTime() - Date.now();
          const daysRemaining = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
          return {
            ...dw,
            moleculeId: String(dw.id), // placeholder since it links to paper
            daysRemaining,
          };
        });
        return {
          ...r.data,
          content: mappedContent,
        } as PaginatedResponse<DisclosureWindow>;
      }),
};
