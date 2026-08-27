import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { apiClient } from '../../lib/api-client';
import { useAuthStore } from '../../lib/auth-store';

interface ExamRow {
  id: number;
  subject: { name: string };
  totalQuestions: number;
  durationMinutes: number | null;
  createdAt: string;
}

export function ExamListPage() {
  const user = useAuthStore((s) => s.user);
  const canManage = user?.roles.some((r) => r === 'LECTURER' || r === 'ADMIN');

  const { data } = useQuery<ExamRow[]>({
    queryKey: ['exams'],
    queryFn: async () => (await apiClient.get('/exam/exams')).data,
  });

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900">Thi cử</h1>
        <div className="flex gap-2">
          <Link to="/exam/my-attempts" className="rounded-lg border border-slate-300 px-4 py-2 text-sm">
            Lịch sử làm bài
          </Link>
          {canManage && (
            <>
              <Link to="/exam/questions" className="rounded-lg border border-slate-300 px-4 py-2 text-sm">
                Ngân hàng câu hỏi
              </Link>
              <Link to="/exam/new" className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white">
                + Tạo đề thi
              </Link>
            </>
          )}
        </div>
      </div>
      <div className="space-y-2">
        {data?.map((exam) => (
          <div
            key={exam.id}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4"
          >
            <div>
              <div className="font-medium text-slate-900">{exam.subject.name}</div>
              <div className="text-xs text-slate-500">
                {exam.totalQuestions} câu · {exam.durationMinutes ?? '-'} phút
              </div>
            </div>
            <Link
              to={`/exam/${exam.id}/take`}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white"
            >
              Làm bài
            </Link>
          </div>
        ))}
        {data?.length === 0 && <p className="text-slate-500">Chưa có đề thi nào.</p>}
      </div>
    </div>
  );
}
