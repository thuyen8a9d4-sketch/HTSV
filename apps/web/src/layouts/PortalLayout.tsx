import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Avatar } from '../components/Avatar';
import { GlassButton } from '../components/GlassButton';
import { GlassModal } from '../components/GlassModal';
import { ScrollToTop } from '../components/ScrollToTop';
import { ThemeToggle } from '../components/ThemeToggle';
import { NavbarActionMenu } from '../components/NavbarActionMenu';
import { Bell, Search, User, Logout, Menu, Plus, Shield } from '../components/Icons';
import { StudentSearch } from '../features/student/StudentSearch';
import { studentNavigation as primaryNav } from '../features/student/student-navigation';
import { StudentIcon } from '../features/student/StudentIcon';
import { SubmitRequestModal } from '../features/student/SubmitRequestModal';
import { requestOwner, useStudentStore } from '../features/student/student-store';
import type { StudentPortalContext, StudentService } from '../features/student/student-types';
import { apiClient } from '../lib/api-client';
import { useAuthStore } from '../lib/auth-store';
import { PortalFooter } from './PortalFooter';

export function PortalLayout() {
  const user = useAuthStore((s) => s.user);
  const clearSession = useAuthStore((s) => s.clearSession);
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [menuOpen, setMenuOpen] = useState(false);
  const [actionMenu, setActionMenu] = useState<'auth' | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [requestType, setRequestType] = useState<string | null>(null);
  const [service, setService] = useState<StudentService | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileMenu = useRef<HTMLDetailsElement>(null);
  const readyCount = useStudentStore((s) => (s.requests[requestOwner(user?.id)] ?? []).filter((r) => r.status === 'READY').length);

  useEffect(() => {
    const media = window.matchMedia('(min-width: 1024px)');
    const close = () => { if (media.matches) setMenuOpen(false); };
    media.addEventListener('change', close);
    const dismissProfile = (event: PointerEvent) => {
      if (profileMenu.current && !profileMenu.current.contains(event.target as Node)) {
        profileMenu.current.open = false;
      }
    };
    document.addEventListener('pointerdown', dismissProfile);
    return () => {
      media.removeEventListener('change', close);
      document.removeEventListener('pointerdown', dismissProfile);
    };
  }, []);

  const logout = async () => {
    setLoggingOut(true);
    await apiClient.post('/auth/logout').catch(() => {});
    clearSession();
    setMenuOpen(false);
    setLoggingOut(false);
    navigate('/login');
  };

  const openRequest = (type = 'Hỗ trợ học vụ') => {
    setService(null);
    setRequestType(type);
  };

  const openService = (item: StudentService) => {
    if (item.path) navigate(item.path);
    else if (item.requestType) openRequest(item.requestType);
    else setService(item);
  };

  const closeProfileMenu = () => {
    if (profileMenu.current) profileMenu.current.open = false;
  };

  const context: StudentPortalContext = { openRequest, openService };

  return (
    <div className="student-portal min-h-screen ambient-canvas">
      <a href="#main-content" className="skip-link">Đến nội dung chính</a>

      {/* Liquid Glass Navigation Bar */}
      <header className={`liquid-glass-nav-container ${isHome ? 'is-home-header' : ''}`}>
        <div className="liquid-glass-navbar">
          {/* Left: Brand & Mobile Toggle */}
          <div className="flex items-center gap-1 sm:gap-3">
            <GlassButton
              className="shrink-0 px-2.5 py-1.5 lg:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Mở menu"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
            >
              <Menu className="h-5 w-5" />
            </GlassButton>
            <Link to="/" className="portal-wordmark focus-ring" aria-label="HTSV — Trang chủ">
              <img src={`${import.meta.env.BASE_URL}assets/logo-dnc-transparent.png`} alt="Đại học Nam Cần Thơ" width={118} height={103} className="portal-wordmark-logo" />
              <span className="portal-wordmark-copy">
                <span className="portal-wordmark-name">HTSV</span>
                <span className="portal-wordmark-caption">Cổng sinh viên</span>
              </span>
            </Link>
          </div>

          {/* Center: Desktop Liquid Glass Nav Pills */}
          <nav className="liquid-nav-track hidden lg:inline-flex" aria-label="Điều hướng chính">
            {primaryNav.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) => `liquid-nav-pill ${isActive ? 'liquid-nav-pill-active' : ''}`}
              >
                <StudentIcon name={item.icon} className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            ))}
            {user?.roles.includes('ADMIN') && (
              <NavLink
                to="/admin"
                className={({ isActive }) => `liquid-nav-pill ${isActive ? 'liquid-nav-pill-active' : ''}`}
              >
                <Shield className="h-4 w-4 shrink-0 text-amber-600" />
                <span>Quản trị</span>
              </NavLink>
            )}
          </nav>

          {/* Right: Theme, Search, Notifications, Profile */}
          <div className="flex shrink-0 items-center gap-1 sm:gap-3">
            <ThemeToggle />
            <button type="button" className="btn-nav-action-icon" aria-label="Tìm kiếm" title="Tìm kiếm"
              aria-haspopup="dialog" aria-expanded={searchOpen}
              onClick={() => { setActionMenu(null); setSearchOpen(true); }}>
              <Search className="h-5 w-5" />
            </button>

            <Link
              to="/requests"
              className="student-header-icon notification-bell focus-ring"
              aria-label={readyCount ? `Thông báo: ${readyCount} hồ sơ mẫu đã hoàn tất` : 'Thông báo: chưa có hồ sơ mẫu hoàn tất'}
              title={readyCount ? `${readyCount} hồ sơ mẫu đã hoàn tất — xem yêu cầu` : 'Thông báo — xem yêu cầu'}
            >
              <Bell className="h-5 w-5" />
              {readyCount > 0 && (
                <span className="notification-badge" aria-hidden="true">
                  {readyCount > 99 ? '99+' : readyCount}
                </span>
              )}
            </Link>

            {user ? (
              <details
                ref={profileMenu}
                className="relative ml-1"
                onKeyDown={(event) => {
                  if (event.key === 'Escape') {
                    closeProfileMenu();
                    profileMenu.current?.querySelector('summary')?.focus();
                  }
                }}
              >
                <summary
                  className="focus-ring flex min-h-10 cursor-pointer list-none items-center gap-2 rounded-xl p-1"
                  aria-label="Thông tin tài khoản"
                >
                  <Avatar name={user.fullName} />
                  <span className="hidden max-w-28 truncate text-xs font-semibold text-slate-700 2xl:block">
                    {user.fullName}
                  </span>
                </summary>
                <div className="absolute top-full right-0 mt-3 w-64 rounded-2xl border border-white/80 bg-white/95 p-3 shadow-xl backdrop-blur-md">
                  <div className="border-b border-slate-100 px-3 py-2">
                    <p className="truncate font-semibold text-slate-800">{user.fullName}</p>
                    <p className="text-xs break-words text-slate-500">{user.email}</p>
                    <div className="mt-1.5 flex items-center gap-1.5">
                      <span className="liquid-pill text-[10px] font-bold uppercase text-blue-700 bg-blue-50 border-blue-200">
                        {user.roles.includes('ADMIN') ? 'Quản trị viên' : 'Sinh viên'}
                      </span>
                    </div>
                  </div>
                  <div className="py-1">
                    <button
                      type="button"
                      className="nav-item w-full text-sm"
                      onClick={() => {
                        closeProfileMenu();
                        setProfileOpen(true);
                      }}
                    >
                      Hồ sơ sinh viên
                    </button>
                    <Link to="/requests" className="nav-item text-sm" onClick={closeProfileMenu}>
                      Trạng thái yêu cầu / phản ánh
                    </Link>
                    {user.roles.includes('ADMIN') && (
                      <Link to="/admin" className="nav-item text-sm font-medium text-amber-700" onClick={closeProfileMenu}>
                        Quản trị hệ thống
                      </Link>
                    )}
                    <Link to="/forgot-password" className="nav-item text-sm" onClick={closeProfileMenu}>
                      Đổi mật khẩu
                    </Link>
                  </div>
                  <div className="border-t border-slate-100 pt-1">
                    <GlassButton
                      onClick={logout}
                      loading={loggingOut}
                      variant="ghost"
                      className="w-full justify-start text-red-700"
                    >
                      <Logout className="h-4 w-4" />
                      Đăng xuất
                    </GlassButton>
                  </div>
                </div>
              </details>
            ) : (
              <NavbarActionMenu label="Đăng nhập" className="btn-nav-login"
                open={actionMenu === 'auth'} onOpenChange={(open) => setActionMenu(open ? 'auth' : null)}
                items={[
                  { label: 'Đăng nhập', to: '/login', icon: <User className="h-5 w-5" /> },
                  { label: 'Đăng ký', to: '/register', icon: <Plus className="h-5 w-5" /> },
                ]}>
                Đăng nhập
              </NavbarActionMenu>
            )}
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <GlassModal open={menuOpen} drawer onClose={() => setMenuOpen(false)} title="Menu HTSV">
        <nav aria-label="Điều hướng di động" className="space-y-1">
          {primaryNav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className="nav-item"
              onClick={() => setMenuOpen(false)}
            >
              <StudentIcon name={item.icon} className="h-5 w-5 shrink-0" />
              <span>{item.label}</span>
            </NavLink>
          ))}
          {user?.roles.includes('ADMIN') && (
            <NavLink
              to="/admin"
              className="nav-item font-semibold text-amber-700"
              onClick={() => setMenuOpen(false)}
            >
              <Shield className="h-5 w-5 shrink-0" />
              <span>Quản trị hệ thống</span>
            </NavLink>
          )}
        </nav>

        {!user && (
          <div className="mt-4 flex flex-col gap-2">
            <Link
              to="/login"
              onClick={() => setMenuOpen(false)}
              className="btn-nav-login w-full text-center"
            >
              Đăng nhập
            </Link>
          </div>
        )}
      </GlassModal>

      {/* Main Content Area */}
      <div className="min-w-0 w-full">
        <main id="main-content" tabIndex={-1} className={isHome ? 'min-h-screen' : 'student-main'}>
          <Outlet context={context} />
        </main>
        {!isHome && <PortalFooter />}

        {/* ── Mobile Bottom Navigation ── */}
        <nav className="bottom-nav md:hidden" aria-label="Điều hướng nhanh">
          {[
            { to: '/', label: 'Trang chủ', icon: 'home' as const, end: true },
            { to: '/forum', label: 'Diễn đàn', icon: 'people' as const, end: false },
            { to: '/services', label: 'Tiện ích', icon: 'clipboard' as const, end: false },
            { to: '/support', label: 'Hồ sơ', icon: 'headset' as const, end: false },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
            >
              <StudentIcon name={item.icon} className="h-5 w-5" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <ScrollToTop />

      {/* Modal Actions */}
      <GlassModal open={searchOpen} onClose={() => setSearchOpen(false)} title="Tìm kiếm">
        {searchOpen && <StudentSearch inlineResults autoFocus onSelect={() => setSearchOpen(false)} onService={openService} />}
        <p className="mt-4 text-xs text-slate-600">Tìm trang, tiện ích và câu hỏi thường gặp trên HTSV.</p>
      </GlassModal>
      {requestType !== null && (
        <SubmitRequestModal
          key={`${user?.id ?? 'guest'}-${requestType}`}
          initialType={requestType}
          onClose={() => setRequestType(null)}
          onTrack={() => {
            setRequestType(null);
            navigate('/requests');
          }}
        />
      )}

      <GlassModal open={!!service} onClose={() => setService(null)} title={service?.name ?? 'Thông tin dịch vụ'}>
        {service && (
          <div className="space-y-5">
            <StudentIcon name={service.icon} className="h-10 w-10 text-blue-600" />
            <p className="rounded-xl bg-white p-4 leading-7 text-slate-700">{service.guidance}</p>
            <GlassButton variant="primary" onClick={() => openRequest(service.requestType ?? 'Hỗ trợ sinh viên')}>
              Tạo yêu cầu / Báo cáo mẫu
            </GlassButton>
          </div>
        )}
      </GlassModal>

      <GlassModal open={profileOpen} onClose={() => setProfileOpen(false)} title="Hồ sơ tài khoản">
        {user && (
          <div className="space-y-4 break-words">
            <Avatar name={user.fullName} />
            <p className="font-semibold text-base">{user.fullName}</p>
            <p className="text-sm text-slate-600">Email: {user.email}</p>
            <p className="text-sm text-slate-600">Tên đăng nhập: {user.username}</p>
            <div className="rounded-xl bg-slate-50 p-3 text-xs text-slate-600 space-y-1">
              <p><strong>Vai trò:</strong> {user.roles.join(', ')}</p>
              <p className="text-slate-500">Mã sinh viên, lớp học và ngành học sẽ tự động đồng bộ khi xác thực sinh viên thành công.</p>
            </div>
          </div>
        )}
      </GlassModal>
    </div>
  );
}
