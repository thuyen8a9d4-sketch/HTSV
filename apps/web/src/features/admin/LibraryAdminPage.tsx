import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '../../lib/api-client';

interface Material {
  id: number;
  title: string;
  type: string;
  status: string;
  owner?: { fullName: string } | null;
}

export function LibraryAdminPage() {
  const queryClient = useQueryClient();
  const { data } = useQuery<Material[]>({
    queryKey: ['admin-materials'],
    queryFn: async () => (await apiClient.get('/admin/library/materials')).data,
  });

  const publish = useMutation({
    mutationFn: (id: number) => apiClient.put(`/admin/library/materials/${id}/publish`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-materials'] }),
  });
  const reject = useMutation({
    mutationFn: (id: number) => apiClient.put(`/admin/library/materials/${id}/reject`, {}),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['admin-materials'] }),
  });

  return (
    <div>
      <h1 className="mb-4 text-xl font-bold text-slate-900">Duyệt tài liệu</h1>
      <table className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white text-sm">
        <thead className="bg-slate-100 text-left text-slate-600">
          <tr>
            <th className="p-3">Tiêu đề</th>
            <th className="p-3">Loại</th>
            <th className="p-3">Người đăng</th>
            <th className="p-3">Trạng thái</th>
            <th className="p-3">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((m) => (
            <tr key={m.id} className="border-t border-slate-100">
              <td className="p-3">{m.title}</td>
              <td className="p-3">{m.type}</td>
              <td className="p-3">{m.owner?.fullName ?? '-'}</td>
              <td className="p-3">{m.status}</td>
              <td className="p-3">
                {m.status !== 'PUBLISHED' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => publish.mutate(m.id)}
                      className="rounded-lg bg-green-600 px-3 py-1 text-xs text-white"
                    >
                      Xuất bản
                    </button>
                    <button
                      onClick={() => reject.mutate(m.id)}
                      className="rounded-lg bg-red-600 px-3 py-1 text-xs text-white"
                    >
                      Từ chối
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
