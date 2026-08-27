import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '../lib/auth-store';

interface ProtectedRouteProps {
  roles?: string[];
}

export function ProtectedRoute({ roles }: ProtectedRouteProps) {
  const user = useAuthStore((s) => s.user);

  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (roles && !roles.some((r) => user.roles.includes(r))) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
}
