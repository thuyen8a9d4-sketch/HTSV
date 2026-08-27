import { useQuery } from '@tanstack/react-query';
import { apiClient } from './api-client';

export function useSettings() {
  return useQuery<{ monetizationEnabled: boolean }>({
    queryKey: ['settings'],
    queryFn: async () => (await apiClient.get('/settings')).data,
    staleTime: 60_000,
  });
}
