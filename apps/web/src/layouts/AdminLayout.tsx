import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Avatar } from '../components/Avatar';
import { Brand } from '../components/Brand';
import { GlassButton } from '../components/GlassButton';
import { GlassModal } from '../components/GlassModal';
import { ThemeToggle } from '../components/ThemeToggle';
import { ArrowLeft, Compass, FileText, Logout, Menu, Settings, Shield, User } from '../components/Icons';
import { apiClient } from '../lib/api-client';
import { useAuthStore } from '../lib/auth-store';

const NAV_ITEMS = [
  { to: '/admin', label: 'Tổng quan', icon: Compass },
  { to: '/admin/forum', label: 'Bài đăng', icon: FileText },
  { to: '/admin/reports', label: 'Báo cáo', icon: Shield },
  { to: '/admin/users', label: 'Người dùng', icon: User },
  { to: '/admin/roles', label: 'Vai trò', icon: Shield },
  { to: '/admin/permissions', label: 'Quyền', icon: Settings },
];
export function AdminLayout() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const user = useAuthStore((s) => s.user);
  const clearSession = useAuthStore((s) => s.clearSession);
  const navigate = useNavigate();
  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    const close = () => { if (media.matches) setMenuOpen(false); };
    media.addEventListener('change', close);
    return () => media.removeEventListener('change', close);
  }, []);
  const logout = async () => {
    setLoggingOut(true);
    await apiClient.post('/auth/logout').catch(() => {});
    clearSession();
    navigate('/login');
  };
  const navigation = <nav aria-label="Quản trị" className="space-y-1">{NAV_ITEMS.map(({ to, label, icon: Icon }) => <NavLink key={to} to={to} end={to === '/admin'} className="nav-item" onClick={() => setMenuOpen(false)}><Icon />{label}</NavLink>)}</nav>;
  const account = <div className="mt-auto border-t border-slate-200/80 pt-5">
    <Link to="/forum" className="nav-item" onClick={() => setMenuOpen(false)}><ArrowLeft />Về cổng sinh viên</Link>
    <div className="my-4 flex min-w-0 items-center gap-3"><Avatar name={user?.fullName} /><div className="min-w-0"><p className="truncate font-semibold" title={user?.fullName}>{user?.fullName}</p><p className="text-xs text-slate-600">Quản trị viên</p></div></div>
    <GlassButton variant="ghost" onClick={logout} loading={loggingOut} className="w-full justify-start text-red-700"><Logout />Đăng xuất</GlassButton>
  </div>;
  return <div className="ambient-canvas min-h-screen">
    <a href="#main-content" className="skip-link">Đến nội dung chính</a>
    <aside className="liquid-glass-header fixed inset-y-0 left-0 hidden w-64 flex-col overflow-y-auto border-r border-slate-200/70 p-5 lg:flex">
      <Brand subtitle="Không gian quản trị" /><div className="mt-5 flex items-center justify-between px-1"><span className="text-xs font-semibold text-slate-500">Chế độ hiển thị</span><ThemeToggle /></div><p className="mt-7 mb-3 px-3 text-[11px] font-bold tracking-widest text-slate-600 uppercase">Quản lý hệ thống</p>{navigation}{account}
    </aside>
    <header className="liquid-glass-header sticky top-0 z-30 flex flex-wrap items-center justify-between gap-2 px-4 py-3 lg:hidden"><Brand subtitle="Không gian quản trị" /><div className="flex items-center gap-2"><ThemeToggle /><GlassButton onClick={() => setMenuOpen(true)} className="px-3" aria-label="Mở menu quản trị" aria-haspopup="dialog" aria-expanded={menuOpen}><Menu /></GlassButton></div></header>
    <GlassModal open={menuOpen} onClose={() => setMenuOpen(false)} title="Quản trị HTSV" drawer><div className="flex min-h-[75dvh] flex-col">{navigation}{account}</div></GlassModal>
    <main id="main-content" tabIndex={-1} className="min-w-0 px-4 py-8 sm:px-6 lg:ml-64 lg:px-10 lg:py-10"><div className="mx-auto max-w-6xl"><Outlet /></div></main>
  </div>;
}
