import { Link, Outlet, useLocation } from 'react-router-dom';
import { Brand } from '../components/Brand';
import { GlassCard } from '../components/GlassCard';
import { ArrowLeft, Shield } from '../components/Icons';
import { ThemeToggle } from '../components/ThemeToggle';

const titles: Record<string, [string, string]> = {
  '/login': ['Chào mừng trở lại', 'Đăng nhập để cùng chia sẻ và kết nối.'],
  '/register': ['Bắt đầu cùng HTSV', 'Tạo tài khoản để tham gia cộng đồng sinh viên.'],
  '/verify-otp': ['Xác thực tài khoản', 'Chỉ một bước nữa để sẵn sàng kết nối.'],
  '/forgot-password': ['Quên mật khẩu?', 'Chúng mình sẽ giúp bạn lấy lại quyền truy cập.'],
  '/reset-password': ['Đặt lại mật khẩu', 'Chọn mật khẩu mới để bảo vệ tài khoản.'],
};
export function AuthLayout() {
  const { pathname } = useLocation();
  const [title, subtitle] = titles[pathname] ?? titles['/login'];
  return <div className="auth-canvas flex min-h-screen flex-col items-center justify-center px-4 py-8 sm:py-12">
    <a href="#auth-content" className="skip-link">Đến biểu mẫu</a>
    <div className="mb-6 flex w-full max-w-md items-center justify-between gap-3"><Link to="/forum" className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm text-slate-600"><ArrowLeft className="h-4 w-4" />Về diễn đàn</Link><ThemeToggle /></div>
    <GlassCard className="w-full max-w-md rounded-3xl p-6 sm:p-8">
      <div className="mb-7"><Brand /></div>
      <main id="auth-content" tabIndex={-1}><h1 className="text-2xl font-bold">{title}</h1><p className="mt-2 mb-7 text-slate-600">{subtitle}</p><Outlet /></main>
    </GlassCard>
    <p className="mt-6 flex items-center gap-2 text-xs text-slate-600"><Shield className="h-4 w-4" />Đồng hành cùng cộng đồng sinh viên</p>
  </div>;
}
