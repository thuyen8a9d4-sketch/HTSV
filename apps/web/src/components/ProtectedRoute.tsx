import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '../lib/auth-store';

interface ProtectedRouteProps {
  roles?: string[];
}

export function ProtectedRoute({ roles }: ProtectedRouteProps) {
  const user = useAuthStore((s) => s.user);
  const location = useLocation();

  if (!user) {
    const next = location.pathname === '/forum/new' ? `?next=${encodeURIComponent(location.pathname + location.search)}` : '';
    return <Navigate to={`/login${next}`} replace />;
  }
  if (roles && !roles.some((r) => user.roles.includes(r))) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
