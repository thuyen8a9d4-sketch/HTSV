import { useEffect, useState } from 'react';
import type { AxiosResponse } from 'axios';
import { apiClient } from './api-client';
import { useAuthStore } from './auth-store';
import type { AuthUser } from './auth-store';

let bootstrapPromise: Promise<AxiosResponse<{ accessToken: string; user: AuthUser }>> | null = null;

export function useAuthBootstrap() {
  const [ready, setReady] = useState(false);
  const setSession = useAuthStore((s) => s.setSession);
  const clearSession = useAuthStore((s) => s.clearSession);

  useEffect(() => {
    let cancelled = false;
    bootstrapPromise ??= apiClient.post('/auth/refresh').finally(() => { bootstrapPromise = null; });
    bootstrapPromise
      .then((res) => {
        if (!cancelled) setSession(res.data.accessToken, res.data.user);
      })
      .catch(() => {
        if (!cancelled) clearSession();
      })
      .finally(() => {
        if (!cancelled) setReady(true);
      });
    return () => {
      cancelled = true;
    };
  }, [setSession, clearSession]);

  return ready;
}
