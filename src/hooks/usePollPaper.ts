import { useQuery } from '@tanstack/react-query';
import { papersApi } from '@/api/papers';
import type { Paper } from '@/types/models';

export function usePollPaper(paperId: string | undefined, enabled: boolean) {
  return useQuery<Paper>({
    queryKey: ['paper', paperId],
    queryFn: () => papersApi.getById(paperId!),
    enabled: enabled && !!paperId,
    refetchInterval: (query) =>
      query.state.data?.status === 'COMPLETED' ||
      query.state.data?.status === 'FAILED'
        ? false
        : 3000,
  });
}
