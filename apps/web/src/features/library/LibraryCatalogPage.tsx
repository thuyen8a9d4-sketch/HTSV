import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { apiClient } from '../../lib/api-client';
import { useAuthStore } from '../../lib/auth-store';

interface Subject {
  id: number;
  name: string;
}

interface Material {
  id: number;
  title: string;
  type: string;
  isFree: boolean;
  price: string | null;
  averageRating: string | null;
  ratingCount: number;
  subject: Subject | null;
}

export function LibraryCatalogPage() {
  const user = useAuthStore((s) => s.user);
  const [q, setQ] = useState('');
  const [subjectId, setSubjectId] = useState<number | undefined>();

  const { data: subjects } = useQuery<Subject[]>({
    queryKey: ['subjects'],
    queryFn: async () => (await apiClient.get('/library/subjects')).data,
  });

  const { data: materials } = useQuery<Material[]>({
    queryKey: ['materials', q, subjectId],
    queryFn: async () =>
      (await apiClient.get('/library/materials', { params: { q: q || undefined, subjectId } })).data,
  });

  const canUpload = user?.roles.some((r) => r === 'LECTURER' || r === 'ADMIN');

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-xl font-bold text-slate-900">Thư viện tài liệu</h1>
        {canUpload && (
          <div className="flex gap-2">
            <Link to="/library/my-uploads" className="rounded-lg border border-slate-300 px-4 py-2 text-sm">
              Giáo trình của tôi
            </Link>
            <Link to="/library/upload" className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white">
              + Đăng giáo trình
            </Link>
          </div>
        )}
      </div>

      <div className="mb-6 flex flex-wrap gap-2">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Tìm tài liệu..."
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        <select
          value={subjectId ?? ''}
          onChange={(e) => setSubjectId(e.target.value ? Number(e.target.value) : undefined)}
          className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="">Tất cả môn học</option>
          {subjects?.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {materials?.map((m) => (
          <Link
            key={m.id}
            to={`/library/${m.id}`}
            className="rounded-xl border border-slate-200 bg-white p-4 hover:border-slate-400"
          >
            <div className="mb-1 text-xs text-slate-500">{m.subject?.name ?? m.type}</div>
            <div className="mb-2 font-semibold text-slate-900">{m.title}</div>
            <div className="flex items-center justify-between text-sm">
              <span className={m.isFree ? 'text-green-600' : 'text-slate-700'}>
                {m.isFree ? 'Miễn phí' : m.price ? `${Number(m.price).toLocaleString('vi-VN')}đ` : ''}
              </span>
              {m.ratingCount > 0 && (
                <span className="text-amber-500">
                  ★ {Number(m.averageRating).toFixed(1)} ({m.ratingCount})
                </span>
              )}
            </div>
          </Link>
        ))}
        {materials?.length === 0 && <p className="text-slate-500">Chưa có tài liệu nào.</p>}
      </div>
    </div>
  );
}
