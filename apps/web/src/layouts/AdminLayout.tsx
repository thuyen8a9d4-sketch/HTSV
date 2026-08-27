import { Link, Outlet } from 'react-router-dom';

const NAV_ITEMS = [
  { to: '/admin', label: 'Tổng quan' },
  { to: '/admin/forum', label: 'Bài đăng' },
  { to: '/admin/reports', label: 'Báo cáo' },
  { to: '/admin/library', label: 'Tài liệu' },
  { to: '/admin/subjects', label: 'Môn học' },
  { to: '/admin/revenue', label: 'Doanh thu' },
  { to: '/admin/users', label: 'Người dùng' },
  { to: '/admin/roles', label: 'Vai trò' },
  { to: '/admin/permissions', label: 'Quyền' },
];

export function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <aside className="w-60 border-r border-slate-200 bg-white p-4">
        <div className="mb-6 text-lg font-bold text-slate-900">HTSV Admin</div>
        <nav className="flex flex-col gap-1 text-sm">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100 hover:text-slate-900"
            >
              {item.label}
            </Link>
          ))}
          <Link to="/" className="mt-4 rounded-lg px-3 py-2 text-slate-400 hover:bg-slate-100">
            ← Về trang chính
          </Link>
        </nav>
      </aside>
      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
