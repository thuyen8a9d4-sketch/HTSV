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
  const { data } = useQuery<Report[]>({
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
      <h1 className="mb-4 text-xl font-bold text-slate-900">Báo cáo vi phạm</h1>
      <div className="space-y-3">
        {data?.map((report) => (
          <div key={report.id} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-2 flex items-center justify-between text-sm text-slate-500">
              <span>Báo cáo bởi {report.reporterUser?.fullName}</span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs">{report.status}</span>
            </div>
            <p className="mb-1 text-sm text-slate-600">Lý do: {report.reason}</p>
            <p className="mb-3 text-sm italic text-slate-500">
              Nội dung: {report.confession?.content ?? report.comment?.content}
            </p>
            {report.status === 'OPEN' && (
              <div className="flex gap-2">
                <button
                  onClick={() => resolve.mutate(report.id)}
                  className="rounded-lg bg-green-600 px-3 py-1 text-xs text-white"
                >
                  Đã xử lý
                </button>
                <button
                  onClick={() => dismiss.mutate(report.id)}
                  className="rounded-lg bg-slate-400 px-3 py-1 text-xs text-white"
                >
                  Bỏ qua
                </button>
              </div>
            )}
          </div>
        ))}
        {data?.length === 0 && <p className="text-slate-500">Không có báo cáo nào.</p>}
      </div>
    </div>
  );
}
