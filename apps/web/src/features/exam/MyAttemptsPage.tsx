import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { apiClient } from '../../lib/api-client';

interface Attempt {
  id: number;
  score: string | null;
  status: string;
  startedAt: string;
  exam: { subject: { name: string } };
}

export function MyAttemptsPage() {
  const { data } = useQuery<Attempt[]>({
    queryKey: ['my-attempts'],
    queryFn: async () => (await apiClient.get('/exam/my-attempts')).data,
  });

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-4 text-xl font-bold text-slate-900">Lịch sử làm bài</h1>
      <div className="space-y-2">
        {data?.map((a) => (
          <Link
            key={a.id}
            to={`/exam/attempts/${a.id}`}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 hover:border-slate-400"
          >
            <div>
              <div className="font-medium text-slate-900">{a.exam.subject.name}</div>
              <div className="text-xs text-slate-500">
                {new Date(a.startedAt).toLocaleString('vi-VN')}
              </div>
            </div>
            <span className="text-sm">
              {a.status === 'SUBMITTED' ? `${Number(a.score).toFixed(1)} điểm` : 'Đang làm'}
            </span>
          </Link>
        ))}
        {data?.length === 0 && <p className="text-slate-500">Chưa có lượt làm bài nào.</p>}
      </div>
    </div>
  );
}
