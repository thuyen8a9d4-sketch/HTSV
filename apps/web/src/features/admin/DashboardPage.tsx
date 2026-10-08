import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { GlassCard } from '../../components/GlassCard';
import { ChatBubble, Clock, FileText, Shield, User, ArrowRight } from '../../components/Icons';
import { LoadingSkeleton } from '../../components/LoadingSkeleton';
import { PageHeading } from '../../components/PageHeading';
import { QueryError } from '../../components/QueryError';
import { apiClient } from '../../lib/api-client';

interface Summary { postCount: number; pendingPostCount: number; commentCount: number; openReportCount: number; accountCount: number; }
const stats = [
  { key: 'postCount', label: 'Bài đăng', icon: FileText, tone: 'bg-blue-50 text-blue-700', accent: 'bg-blue-500' },
  { key: 'pendingPostCount', label: 'Chờ duyệt', icon: Clock, tone: 'bg-amber-50 text-amber-800', accent: 'bg-amber-500' },
  { key: 'commentCount', label: 'Bình luận', icon: ChatBubble, tone: 'bg-cyan-50 text-cyan-800', accent: 'bg-cyan-500' },
  { key: 'openReportCount', label: 'Báo cáo mở', icon: Shield, tone: 'bg-red-50 text-red-700', accent: 'bg-red-500' },
  { key: 'accountCount', label: 'Tài khoản', icon: User, tone: 'bg-indigo-50 text-indigo-700', accent: 'bg-indigo-500' },
] as const;
export function DashboardPage() {
  const { data, isLoading, isError, refetch } = useQuery<Summary>({
    queryKey: ['admin-dashboard'],
    queryFn: async () => (await apiClient.get('/admin/dashboard')).data,
  });

  return (
    <div>
      <PageHeading
        eyebrow="Không gian quản trị"
        title="Tổng quan hệ thống"
        description="Theo dõi hoạt động và giữ cộng đồng HTSV an toàn, tích cực."
      />

      {isLoading && <LoadingSkeleton variant="stats" count={5} />}
      {isError && <QueryError retry={() => { void refetch(); }} />}

      {data && (
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-5">
          {stats.map(({ key, label, icon: Icon, tone, accent }) => (
            <GlassCard key={key} className="relative overflow-hidden">
              <span className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}>
                <Icon />
              </span>
              <p className="text-sm text-slate-600">
                {label}
              </p>
              <p className="mt-1 text-3xl font-extrabold tracking-tight">
                {data[key].toLocaleString('vi-VN')}
              </p>
              <span className={`absolute right-6 bottom-0 left-6 h-0.5 rounded-full ${accent}`} aria-hidden="true" />
            </GlassCard>
          ))}
        </div>
      )}

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link to="/admin/forum" className="focus-ring rounded-2xl border border-slate-200 bg-white/70 p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-semibold">
              Kiểm duyệt bài đăng
            </h2>
            <ArrowRight className="h-4 w-4 text-blue-700" />
          </div>
          <p className="mt-2 text-sm text-slate-600">
            Xem và duyệt các câu chuyện gửi đến cộng đồng.
          </p>
        </Link>
        <Link to="/admin/reports" className="focus-ring rounded-2xl border border-slate-200 bg-white/70 p-5">
          <div className="flex items-center justify-between gap-3">
            <h2 className="font-semibold">
              Xử lý báo cáo
            </h2>
            <ArrowRight className="h-4 w-4 text-blue-700" />
          </div>
          <p className="mt-2 text-sm text-slate-600">
            Tiếp nhận và xử lý phản ánh từ thành viên.
          </p>
        </Link>
      </div>
    </div>
  );
}
