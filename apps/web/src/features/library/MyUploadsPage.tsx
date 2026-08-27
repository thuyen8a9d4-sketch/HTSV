import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { apiClient } from '../../lib/api-client';

interface Material {
  id: number;
  title: string;
  type: string;
  status: string;
  price: string | null;
  createdAt: string;
}

const STATUS_LABEL: Record<string, string> = {
  DRAFT: 'Nháp',
  PENDING: 'Chờ duyệt',
  PUBLISHED: 'Đã duyệt',
  REJECTED: 'Bị từ chối',
};

export function MyUploadsPage() {
  const { data } = useQuery<Material[]>({
    queryKey: ['my-uploads'],
    queryFn: async () => (await apiClient.get('/library/my-uploads')).data,
  });

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900">Giáo trình của tôi</h1>
        <Link to="/library/upload" className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white">
          + Đăng giáo trình
        </Link>
      </div>
      <table className="w-full overflow-hidden rounded-xl border border-slate-200 bg-white text-sm">
        <thead className="bg-slate-100 text-left text-slate-600">
          <tr>
            <th className="p-3">Tiêu đề</th>
            <th className="p-3">Loại</th>
            <th className="p-3">Trạng thái</th>
            <th className="p-3">Ngày tạo</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((m) => (
            <tr key={m.id} className="border-t border-slate-100">
              <td className="p-3">
                <Link to={`/library/${m.id}`} className="hover:underline">
                  {m.title}
                </Link>
              </td>
              <td className="p-3">{m.type}</td>
              <td className="p-3">{STATUS_LABEL[m.status] ?? m.status}</td>
              <td className="p-3">{new Date(m.createdAt).toLocaleDateString('vi-VN')}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
