import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { dashboardApi } from '@/api/dashboard';
import { moleculesApi } from '@/api/molecules';
import type { DisclosureWindow } from '@/types/models';

export function useDisclosureWindows(status?: string) {
  return useQuery<DisclosureWindow[]>({
    queryKey: ['disclosure-windows', status],
    queryFn: () => dashboardApi.disclosureWindows(status),
  });
}

export function useStartDisclosureWindow() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (moleculeId: string) =>
      moleculesApi.startDisclosureWindow(moleculeId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['disclosure-windows'] });
    },
  });
}
