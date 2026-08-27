import { useMutation } from '@tanstack/react-query';
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiClient } from '../../lib/api-client';

interface StartResponse {
  attemptId: number;
  durationMinutes: number | null;
  questions: {
    examQuestionId: number;
    content: string;
    options: { id: number; optionLabel: string; content: string }[];
  }[];
}

export function TakeExamPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [started, setStarted] = useState<StartResponse | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const submittedRef = useRef(false);

  const start = useMutation({
    mutationFn: async () => (await apiClient.post(`/exam/exams/${id}/start`)).data as StartResponse,
    onSuccess: (data) => {
      setStarted(data);
      if (data.durationMinutes) setSecondsLeft(data.durationMinutes * 60);
    },
  });

  const answer = useMutation({
    mutationFn: (payload: { examQuestionId: number; selectedOptionId: number }) =>
      apiClient.post(`/exam/attempts/${started?.attemptId}/answer`, payload),
  });

  const submit = useMutation({
    mutationFn: () => apiClient.post(`/exam/attempts/${started?.attemptId}/submit`),
    onSuccess: () => navigate(`/exam/attempts/${started?.attemptId}`),
  });

  useEffect(() => {
    if (secondsLeft === null) return;
    if (secondsLeft <= 0) {
      if (!submittedRef.current) {
        submittedRef.current = true;
        submit.mutate();
      }
      return;
    }
    const timer = setTimeout(() => setSecondsLeft((s) => (s ?? 1) - 1), 1000);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft]);

  const selectAnswer = (examQuestionId: number, optionId: number) => {
    setAnswers((prev) => ({ ...prev, [examQuestionId]: optionId }));
    answer.mutate({ examQuestionId, selectedOptionId: optionId });
  };

  if (!started) {
    return (
      <div className="mx-auto max-w-md text-center">
        <h1 className="mb-4 text-xl font-bold text-slate-900">Sẵn sàng làm bài?</h1>
        <button
          onClick={() => start.mutate()}
          className="rounded-lg bg-slate-900 px-6 py-2 text-sm text-white"
        >
          Bắt đầu
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900">Đang làm bài</h1>
        {secondsLeft !== null && (
          <div className="rounded-lg bg-slate-900 px-3 py-1 text-sm text-white">
            {Math.floor(secondsLeft / 60)}:{String(secondsLeft % 60).padStart(2, '0')}
          </div>
        )}
      </div>
      <div className="space-y-4">
        {started.questions.map((q, idx) => (
          <div key={q.examQuestionId} className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="mb-2 font-medium text-slate-900">
              Câu {idx + 1}: {q.content}
            </p>
            <div className="space-y-1">
              {q.options.map((opt) => (
                <label key={opt.id} className="flex items-center gap-2 text-sm">
                  <input
                    type="radio"
                    name={`q-${q.examQuestionId}`}
                    checked={answers[q.examQuestionId] === opt.id}
                    onChange={() => selectAnswer(q.examQuestionId, opt.id)}
                  />
                  {opt.optionLabel}. {opt.content}
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={() => {
          submittedRef.current = true;
          submit.mutate();
        }}
        className="mt-4 rounded-lg bg-slate-900 px-6 py-2 text-sm text-white"
      >
        Nộp bài
      </button>
    </div>
  );
}
