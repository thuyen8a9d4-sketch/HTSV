import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { apiClient } from '../../lib/api-client';

interface AttemptDetail {
  id: number;
  score: string | null;
  correctCount: number | null;
  wrongCount: number | null;
  status: string;
  cauTraLois: {
    id: number;
    isCorrect: boolean | null;
    examQuestion: { question: { content: string; dapAns: { optionLabel: string; content: string; isCorrect: boolean }[] } };
    selectedOptionId: number | null;
  }[];
}

export function ExamResultPage() {
  const { id } = useParams();
  const { data } = useQuery<AttemptDetail>({
    queryKey: ['attempt', id],
    queryFn: async () => (await apiClient.get(`/exam/attempts/${id}`)).data,
  });

  if (!data) return null;

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-2 text-xl font-bold text-slate-900">Kết quả bài thi</h1>
      <p className="mb-4 text-lg">
        Điểm: <strong>{Number(data.score ?? 0).toFixed(1)}</strong> / 10 — Đúng{' '}
        {data.correctCount} / Sai {data.wrongCount}
      </p>
      <div className="space-y-3">
        {data.cauTraLois.map((answer, idx) => (
          <div key={answer.id} className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="mb-2 font-medium text-slate-900">
              Câu {idx + 1}: {answer.examQuestion.question.content}
            </p>
            <ul className="text-sm">
              {answer.examQuestion.question.dapAns.map((opt) => (
                <li
                  key={opt.optionLabel}
                  className={
                    opt.isCorrect
                      ? 'font-semibold text-green-700'
                      : answer.selectedOptionId && !answer.isCorrect
                        ? 'text-slate-500'
                        : 'text-slate-500'
                  }
                >
                  {opt.optionLabel}. {opt.content} {opt.isCorrect && '✓'}
                </li>
              ))}
            </ul>
            <p className={`mt-1 text-xs ${answer.isCorrect ? 'text-green-600' : 'text-red-600'}`}>
              {answer.isCorrect ? 'Đúng' : 'Sai'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
