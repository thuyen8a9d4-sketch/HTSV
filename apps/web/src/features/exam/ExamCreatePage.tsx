import { useMutation, useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../lib/api-client';

interface Subject {
  id: number;
  name: string;
}

export function ExamCreatePage() {
  const navigate = useNavigate();
  const [subjectId, setSubjectId] = useState('');
  const [durationMinutes, setDurationMinutes] = useState('45');
  const [theoryCount, setTheoryCount] = useState('5');
  const [applicationCount, setApplicationCount] = useState('3');
  const [practicalCount, setPracticalCount] = useState('2');
  const [error, setError] = useState<string | null>(null);

  const { data: subjects } = useQuery<Subject[]>({
    queryKey: ['subjects'],
    queryFn: async () => (await apiClient.get('/library/subjects')).data,
  });

  const create = useMutation({
    mutationFn: () =>
      apiClient.post('/exam/exams', {
        subjectId: Number(subjectId),
        scopeType: 'BY_SUBJECT',
        durationMinutes: Number(durationMinutes),
        theoryCount: Number(theoryCount),
        applicationCount: Number(applicationCount),
        practicalCount: Number(practicalCount),
      }),
    onSuccess: () => navigate('/exam'),
    onError: (err: any) => setError(err.response?.data?.message ?? 'Tạo đề thi thất bại'),
  });

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-4 text-xl font-bold text-slate-900">Tạo đề thi</h1>
      <div className="space-y-3">
        <select
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="">Chọn môn học</option>
          {subjects?.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <div>
          <label className="mb-1 block text-sm text-slate-600">Thời gian làm bài (phút)</label>
          <input
            value={durationMinutes}
            onChange={(e) => setDurationMinutes(e.target.value)}
            type="number"
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
        </div>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <label className="mb-1 block text-xs text-slate-600">Lý thuyết (dễ)</label>
            <input
              value={theoryCount}
              onChange={(e) => setTheoryCount(e.target.value)}
              type="number"
              className="w-full rounded-lg border border-slate-300 px-2 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-slate-600">Ứng dụng (TB)</label>
            <input
              value={applicationCount}
              onChange={(e) => setApplicationCount(e.target.value)}
              type="number"
              className="w-full rounded-lg border border-slate-300 px-2 py-2 text-sm"
            />
          </div>
          <div>
            <label className="mb-1 block text-xs text-slate-600">Thực hành (khó)</label>
            <input
              value={practicalCount}
              onChange={(e) => setPracticalCount(e.target.value)}
              type="number"
              className="w-full rounded-lg border border-slate-300 px-2 py-2 text-sm"
            />
          </div>
        </div>
        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          onClick={() => create.mutate()}
          disabled={!subjectId}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          Tạo đề thi
        </button>
      </div>
    </div>
  );
}
