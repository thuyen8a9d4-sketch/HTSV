import { Link, Outlet, useNavigate } from 'react-router-dom';
import { apiClient } from '../lib/api-client';
import { useAuthStore } from '../lib/auth-store';

export function PortalLayout() {
  const user = useAuthStore((s) => s.user);
  const clearSession = useAuthStore((s) => s.clearSession);
  const navigate = useNavigate();

  const logout = async () => {
    await apiClient.post('/auth/logout').catch(() => {});
    clearSession();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
          <Link to="/" className="text-lg font-bold text-slate-900">
            HTSV
          </Link>
          <nav className="flex items-center gap-6 text-sm text-slate-600">
            <Link to="/forum" className="hover:text-slate-900">
              Diễn đàn
            </Link>
            {user?.roles.includes('ADMIN') && (
              <Link to="/admin" className="hover:text-slate-900">
                Quản trị
              </Link>
            )}
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-slate-500">{user.fullName}</span>
                <button onClick={logout} className="text-red-600 hover:underline">
                  Đăng xuất
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="hover:text-slate-900">
                  Đăng nhập
                </Link>
                <Link to="/register" className="hover:text-slate-900">
                  Đăng ký
                </Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">
        <Outlet />
      </main>
    </div>
  );
}
