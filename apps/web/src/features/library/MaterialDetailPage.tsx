import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiClient } from '../../lib/api-client';
import { useAuthStore } from '../../lib/auth-store';

interface MaterialDetail {
  id: number;
  title: string;
  description: string | null;
  isFree: boolean;
  isSellable: boolean;
  price: string | null;
  averageRating: string | null;
  ratingCount: number;
  hasAccess: boolean;
  owner: { fullName: string } | null;
  phienBanTaiLieus: { versionNo: number; pageCount: number | null; fileSize: number }[];
}

interface Question {
  id: number;
  title: string;
  body: string;
  status: string;
  owner: { fullName: string } | null;
  answers: { id: number; body: string; isAccepted: boolean; owner: { fullName: string } | null }[];
}

interface Rating {
  id: number;
  rating: number;
  comment: string | null;
  owner: { fullName: string } | null;
}

type Tab = 'read' | 'qna' | 'ratings';

export function MaterialDetailPage() {
  const { id } = useParams();
  const user = useAuthStore((s) => s.user);
  const queryClient = useQueryClient();
  const [tab, setTab] = useState<Tab>('read');
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionBody, setQuestionBody] = useState('');
  const [ratingValue, setRatingValue] = useState(5);
  const [ratingComment, setRatingComment] = useState('');

  const { data: material } = useQuery<MaterialDetail>({
    queryKey: ['material', id],
    queryFn: async () => (await apiClient.get(`/library/materials/${id}`)).data,
  });

  const { data: questions } = useQuery<Question[]>({
    queryKey: ['material-questions', id],
    queryFn: async () => (await apiClient.get(`/library/materials/${id}/questions`)).data,
    enabled: tab === 'qna',
  });

  const { data: ratings } = useQuery<Rating[]>({
    queryKey: ['material-ratings', id],
    queryFn: async () => (await apiClient.get(`/library/materials/${id}/ratings`)).data,
    enabled: tab === 'ratings',
  });

  const buy = useMutation({
    mutationFn: () => apiClient.post('/library/buy', { materialId: Number(id) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['material', id] }),
  });

  const askQuestion = useMutation({
    mutationFn: () =>
      apiClient.post(`/library/materials/${id}/questions`, { title: questionTitle, body: questionBody }),
    onSuccess: () => {
      setQuestionTitle('');
      setQuestionBody('');
      queryClient.invalidateQueries({ queryKey: ['material-questions', id] });
    },
  });

  const submitRating = useMutation({
    mutationFn: () =>
      apiClient.put(`/library/materials/${id}/ratings`, { rating: ratingValue, comment: ratingComment }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['material-ratings', id] });
      queryClient.invalidateQueries({ queryKey: ['material', id] });
    },
  });

  if (!material) return null;

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-1 text-2xl font-bold text-slate-900">{material.title}</h1>
      <p className="mb-4 text-sm text-slate-500">
        {material.owner?.fullName}
        {material.ratingCount > 0 && (
          <span className="ml-2 text-amber-500">
            ★ {Number(material.averageRating).toFixed(1)} ({material.ratingCount} đánh giá)
          </span>
        )}
      </p>
      <p className="mb-6 text-slate-700">{material.description}</p>

      <div className="mb-4 flex gap-4 border-b border-slate-200 text-sm">
        {(['read', 'qna', 'ratings'] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`border-b-2 pb-2 ${tab === t ? 'border-slate-900 font-semibold' : 'border-transparent text-slate-500'}`}
          >
            {t === 'read' ? 'Đọc tài liệu' : t === 'qna' ? 'Hỏi đáp' : 'Đánh giá'}
          </button>
        ))}
      </div>

      {tab === 'read' &&
        (material.hasAccess ? (
          <div className="rounded-xl border border-slate-200 bg-white p-6">
            <p className="mb-3 text-slate-700">
              Phiên bản {material.phienBanTaiLieus[0]?.versionNo} ·{' '}
              {material.phienBanTaiLieus[0]?.pageCount ?? '?'} trang
            </p>
            <a
              href={`/api/library/materials/${id}/download`}
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-lg bg-slate-900 px-4 py-2 text-sm text-white"
            >
              Tải xuống / Xem tài liệu
            </a>
          </div>
        ) : (
          <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
            <p className="mb-4 text-slate-600">
              🔒 Bạn cần mua tài liệu này để xem toàn bộ nội dung.
            </p>
            {!user ? (
              <p className="text-sm text-slate-500">Vui lòng đăng nhập để mua tài liệu.</p>
            ) : material.isSellable && material.price ? (
              <button
                onClick={() => buy.mutate()}
                className="rounded-lg bg-slate-900 px-6 py-2 text-sm text-white"
              >
                Mua ngay – {Number(material.price).toLocaleString('vi-VN')}đ
              </button>
            ) : (
              <p className="text-sm text-slate-500">Tài liệu hiện không thể mua.</p>
            )}
          </div>
        ))}

      {tab === 'qna' && (
        <div className="space-y-4">
          {user && (
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <input
                value={questionTitle}
                onChange={(e) => setQuestionTitle(e.target.value)}
                placeholder="Tiêu đề câu hỏi"
                className="mb-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
              />
              <textarea
                value={questionBody}
                onChange={(e) => setQuestionBody(e.target.value)}
                placeholder="Nội dung câu hỏi..."
                className="mb-2 w-full rounded-lg border border-slate-300 p-2 text-sm"
              />
              <button
                onClick={() => askQuestion.mutate()}
                disabled={!questionTitle.trim() || !questionBody.trim()}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white disabled:opacity-50"
              >
                Đặt câu hỏi
              </button>
            </div>
          )}
          {questions?.map((q) => (
            <div key={q.id} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="mb-1 font-semibold text-slate-900">{q.title}</div>
              <div className="mb-2 text-xs text-slate-500">{q.owner?.fullName}</div>
              <p className="mb-2 text-sm text-slate-700">{q.body}</p>
              <div className="ml-4 space-y-2 border-l-2 border-slate-100 pl-3">
                {q.answers.map((a) => (
                  <div key={a.id} className="text-sm">
                    <span className="text-slate-500">{a.owner?.fullName}: </span>
                    {a.body}
                    {a.isAccepted && <span className="ml-1 text-green-600">✓ Câu trả lời hay nhất</span>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {tab === 'ratings' && (
        <div className="space-y-4">
          {user && (
            <div className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="mb-2 flex gap-1">
                {[1, 2, 3, 4, 5].map((v) => (
                  <button
                    key={v}
                    onClick={() => setRatingValue(v)}
                    className={v <= ratingValue ? 'text-amber-500' : 'text-slate-300'}
                  >
                    ★
                  </button>
                ))}
              </div>
              <textarea
                value={ratingComment}
                onChange={(e) => setRatingComment(e.target.value)}
                placeholder="Nhận xét (không bắt buộc)..."
                className="mb-2 w-full rounded-lg border border-slate-300 p-2 text-sm"
              />
              <button
                onClick={() => submitRating.mutate()}
                className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white"
              >
                Gửi đánh giá
              </button>
            </div>
          )}
          {ratings?.map((r) => (
            <div key={r.id} className="rounded-xl border border-slate-200 bg-white p-4">
              <div className="mb-1 text-amber-500">{'★'.repeat(r.rating)}</div>
              <div className="mb-1 text-xs text-slate-500">{r.owner?.fullName}</div>
              {r.comment && <p className="text-sm text-slate-700">{r.comment}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
