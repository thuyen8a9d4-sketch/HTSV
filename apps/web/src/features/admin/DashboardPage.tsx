import { useQuery } from '@tanstack/react-query';
import { apiClient } from '../../lib/api-client';

interface Summary {
  postCount: number;
  pendingPostCount: number;
  commentCount: number;
  openReportCount: number;
  accountCount: number;
}

function StatCard({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-1 text-2xl font-bold text-slate-900">{value}</div>
    </div>
  );
}

export function DashboardPage() {
  const { data } = useQuery<Summary>({
    queryKey: ['admin-dashboard'],
    queryFn: async () => (await apiClient.get('/admin/dashboard')).data,
  });

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold text-slate-900">Tổng quan</h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <StatCard label="Bài đăng" value={data?.postCount ?? '-'} />
        <StatCard label="Chờ duyệt" value={data?.pendingPostCount ?? '-'} />
        <StatCard label="Bình luận" value={data?.commentCount ?? '-'} />
        <StatCard label="Báo cáo mở" value={data?.openReportCount ?? '-'} />
        <StatCard label="Tài khoản" value={data?.accountCount ?? '-'} />
      </div>
    </div>
  );
}
