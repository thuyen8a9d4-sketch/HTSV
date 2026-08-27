import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { apiClient } from '../../lib/api-client';

interface Subject {
  id: number;
  name: string;
}

interface QuestionRow {
  id: number;
  content: string;
  difficulty: string;
  status: string;
  dapAns: { optionLabel: string; content: string; isCorrect: boolean }[];
}

const LABELS = ['A', 'B', 'C', 'D'];

export function QuestionBankPage() {
  const queryClient = useQueryClient();
  const [subjectId, setSubjectId] = useState('');
  const [content, setContent] = useState('');
  const [difficulty, setDifficulty] = useState('MEDIUM');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const { data: subjects } = useQuery<Subject[]>({
    queryKey: ['subjects'],
    queryFn: async () => (await apiClient.get('/library/subjects')).data,
  });

  const { data: questions } = useQuery<QuestionRow[]>({
    queryKey: ['exam-questions', subjectId],
    queryFn: async () =>
      (await apiClient.get('/exam/questions', { params: { subjectId: subjectId || undefined } })).data,
  });

  const create = useMutation({
    mutationFn: () =>
      apiClient.post('/exam/questions', {
        subjectId: Number(subjectId),
        questionType: 'SINGLE_CHOICE',
        difficulty,
        content,
        answers: options.map((text, i) => ({
          optionLabel: LABELS[i],
          content: text,
          isCorrect: i === correctIndex,
        })),
      }),
    onSuccess: () => {
      setContent('');
      setOptions(['', '', '', '']);
      queryClient.invalidateQueries({ queryKey: ['exam-questions'] });
    },
    onError: (err: any) => setError(err.response?.data?.message ?? 'Tạo câu hỏi thất bại'),
  });

  const approve = useMutation({
    mutationFn: (id: number) => apiClient.put(`/exam/questions/${id}/approve`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['exam-questions'] }),
  });

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-4 text-xl font-bold text-slate-900">Ngân hàng câu hỏi</h1>

      <div className="mb-6 rounded-xl border border-slate-200 bg-white p-4">
        <select
          value={subjectId}
          onChange={(e) => setSubjectId(e.target.value)}
          className="mb-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="">Chọn môn học</option>
          {subjects?.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Nội dung câu hỏi"
          className="mb-2 w-full rounded-lg border border-slate-300 p-2 text-sm"
        />
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="mb-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        >
          <option value="EASY">Dễ (lý thuyết)</option>
          <option value="MEDIUM">Trung bình (ứng dụng)</option>
          <option value="HARD">Khó (thực hành)</option>
        </select>
        {options.map((opt, i) => (
          <div key={i} className="mb-2 flex items-center gap-2">
            <input
              type="radio"
              checked={correctIndex === i}
              onChange={() => setCorrectIndex(i)}
              title="Đáp án đúng"
            />
            <span className="w-5 text-sm font-medium">{LABELS[i]}</span>
            <input
              value={opt}
              onChange={(e) =>
                setOptions((prev) => prev.map((o, idx) => (idx === i ? e.target.value : o)))
              }
              placeholder={`Đáp án ${LABELS[i]}`}
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
          </div>
        ))}
        {error && <p className="mb-2 text-sm text-red-600">{error}</p>}
        <button
          onClick={() => create.mutate()}
          disabled={!subjectId || !content.trim() || options.some((o) => !o.trim())}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          Thêm câu hỏi
        </button>
      </div>

      <div className="space-y-2">
        {questions?.map((q) => (
          <div key={q.id} className="rounded-xl border border-slate-200 bg-white p-4">
            <div className="mb-1 flex items-center justify-between">
              <span className="font-medium text-slate-900">{q.content}</span>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs">{q.status}</span>
            </div>
            <ul className="mb-2 text-sm text-slate-600">
              {q.dapAns.map((a) => (
                <li key={a.optionLabel} className={a.isCorrect ? 'font-semibold text-green-700' : ''}>
                  {a.optionLabel}. {a.content}
                </li>
              ))}
            </ul>
            {q.status === 'PENDING_REVIEW' && (
              <button
                onClick={() => approve.mutate(q.id)}
                className="rounded-lg bg-green-600 px-3 py-1 text-xs text-white"
              >
                Duyệt câu hỏi
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
