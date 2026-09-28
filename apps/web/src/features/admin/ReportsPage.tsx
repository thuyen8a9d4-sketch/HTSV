import { Avatar } from '../../components/Avatar';
import { EmptyState } from '../../components/EmptyState';
import { GlassButton } from '../../components/GlassButton';
import { GlassCard } from '../../components/GlassCard';
import { Check, Close } from '../../components/Icons';
import { LoadingSkeleton } from '../../components/LoadingSkeleton';
import { PageHeading } from '../../components/PageHeading';
import { QueryError } from '../../components/QueryError';
import { StatusBadge } from '../../components/StatusBadge';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../lib/api-client';

interface Report {
  id: number;
  reason: string;
  status: string;
  reporterUser: { fullName: string };
  confession?: { content: string } | null;
  comment?: { content: string } | null;
  createdAt: string;
}

export function ReportsPage() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError, refetch } = useQuery<Report[]>({
    queryKey: ['admin-reports'],
    queryFn: async () => (await apiClient.get('/admin/reports')).data,
  });

  const resolve = useMutation({
    mutationFn: (id: number) => apiClient.put(`/admin/reports/${id}/resolve`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-reports'] }),
  });
  const dismiss = useMutation({
    mutationFn: (id: number) => apiClient.put(`/admin/reports/${id}/dismiss`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-reports'] }),
  });

  return (
    <div>
      <PageHeading eyebrow="Quản trị nội dung" title="Báo cáo vi phạm" description="Tiếp nhận phản ánh để giữ không gian chia sẻ an toàn cho mọi người." />
      {isLoading && <LoadingSkeleton />}
      {isError && <QueryError retry={() => { void refetch(); }} />}
      {(resolve.isError || dismiss.isError) && <p role="alert" className="mb-4 rounded-xl bg-red-50 p-3 text-red-700">Chưa thể cập nhật. Vui lòng thử lại.</p>}
      <div className="space-y-3">
        {data?.map((report) => (
          <GlassCard key={report.id} solid>
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-600">
              <span className="flex min-w-0 items-center gap-3"><Avatar name={report.reporterUser?.fullName} /><span className="min-w-0 break-words">Báo cáo bởi <strong>{report.reporterUser?.fullName}</strong></span></span>
              <StatusBadge status={report.status} />
            </div>
            <p className="mb-3 text-sm break-words text-slate-700">Lý do: {report.reason}</p>
            <p className="mb-5 rounded-xl bg-slate-50 p-4 text-sm whitespace-pre-wrap break-words text-slate-600">
              Nội dung: {report.confession?.content ?? report.comment?.content}
            </p>
            {report.status === 'OPEN' && (
              <div className="flex gap-2">
                <GlassButton
                  onClick={() => resolve.mutate(report.id)}
                  variant="success" disabled={resolve.isPending || dismiss.isPending} loading={resolve.isPending && resolve.variables === report.id}
                >
                  <Check className="h-4 w-4" />Đã xử lý
                </GlassButton>
                <GlassButton
                  onClick={() => dismiss.mutate(report.id)}
                  variant="secondary" disabled={resolve.isPending || dismiss.isPending} loading={dismiss.isPending && dismiss.variables === report.id}
                >
                  <Close className="h-4 w-4" />Bỏ qua
                </GlassButton>
              </div>
            )}
          </GlassCard>
        ))}
        {!isError && data?.length === 0 && <EmptyState title="Chưa có báo cáo" description="Các phản ánh từ cộng đồng sẽ xuất hiện tại đây." />}
      </div>
    </div>
  );
}
