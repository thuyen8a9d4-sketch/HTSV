import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiClient } from '../../lib/api-client';

interface CardRow {
  id?: number;
  term: string;
  definition: string;
  position: number;
}

interface SetDetail {
  id: number;
  title: string;
  description: string | null;
  status: string;
  cards: CardRow[];
}

export function FlashcardEditorPage() {
  const { id } = useParams();
  const isNew = !id;
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cards, setCards] = useState<CardRow[]>([{ term: '', definition: '', position: 0 }]);

  const { data: set } = useQuery<SetDetail>({
    queryKey: ['flashcard-set', id],
    queryFn: async () => (await apiClient.get(`/library/flashcard-sets/${id}`)).data,
    enabled: !isNew,
  });

  useEffect(() => {
    if (set) {
      setTitle(set.title);
      setDescription(set.description ?? '');
      setCards(set.cards.length ? set.cards : [{ term: '', definition: '', position: 0 }]);
    }
  }, [set]);

  const createSet = useMutation({
    mutationFn: async () => {
      const res = await apiClient.post('/library/flashcard-sets', { title, description });
      return res.data as SetDetail;
    },
    onSuccess: (newSet) => navigate(`/flashcards/${newSet.id}/edit`, { replace: true }),
  });

  const saveCards = useMutation({
    mutationFn: () =>
      apiClient.put(`/library/flashcard-sets/${id}/cards`, {
        cards: cards
          .filter((c) => c.term.trim() && c.definition.trim())
          .map((c, i) => ({ ...c, position: i })),
      }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['flashcard-set', id] }),
  });

  const publish = useMutation({
    mutationFn: () => apiClient.put(`/library/flashcard-sets/${id}/publish`),
    onSuccess: () => navigate(`/flashcards/${id}`),
  });

  const updateCard = (index: number, field: 'term' | 'definition', value: string) => {
    setCards((prev) => prev.map((c, i) => (i === index ? { ...c, [field]: value } : c)));
  };

  const addCard = () => setCards((prev) => [...prev, { term: '', definition: '', position: prev.length }]);
  const removeCard = (index: number) => setCards((prev) => prev.filter((_, i) => i !== index));

  if (isNew) {
    return (
      <div className="mx-auto max-w-xl">
        <h1 className="mb-4 text-xl font-bold text-slate-900">Tạo bộ thẻ ghi nhớ</h1>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Tên bộ thẻ"
          className="mb-2 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Mô tả"
          className="mb-3 w-full rounded-lg border border-slate-300 p-2 text-sm"
        />
        <button
          onClick={() => createSet.mutate()}
          disabled={!title.trim()}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white disabled:opacity-50"
        >
          Tạo và thêm thẻ
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-4 text-xl font-bold text-slate-900">{title}</h1>
      <div className="space-y-3">
        {cards.map((card, i) => (
          <div key={card.id ?? i} className="flex gap-2 rounded-xl border border-slate-200 bg-white p-3">
            <input
              value={card.term}
              onChange={(e) => updateCard(i, 'term', e.target.value)}
              placeholder="Thuật ngữ"
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            <input
              value={card.definition}
              onChange={(e) => updateCard(i, 'definition', e.target.value)}
              placeholder="Định nghĩa"
              className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
            />
            <button onClick={() => removeCard(i)} className="text-xs text-red-600">
              Xóa
            </button>
          </div>
        ))}
      </div>
      <div className="mt-3 flex gap-2">
        <button onClick={addCard} className="rounded-lg border border-slate-300 px-4 py-2 text-sm">
          + Thêm thẻ
        </button>
        <button
          onClick={() => saveCards.mutate()}
          className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white"
        >
          Lưu
        </button>
        {set?.status !== 'PUBLISHED' && (
          <button
            onClick={() => publish.mutate()}
            className="rounded-lg bg-green-600 px-4 py-2 text-sm text-white"
          >
            Xuất bản
          </button>
        )}
      </div>
    </div>
  );
}
