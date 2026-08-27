import { useEffect, useState } from 'react';
import { apiClient } from './api-client';
import { useAuthStore } from './auth-store';

export function useAuthBootstrap() {
  const [ready, setReady] = useState(false);
  const setSession = useAuthStore((s) => s.setSession);
  const clearSession = useAuthStore((s) => s.clearSession);

  useEffect(() => {
    let cancelled = false;
    apiClient
      .post('/auth/refresh')
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ready;
}
