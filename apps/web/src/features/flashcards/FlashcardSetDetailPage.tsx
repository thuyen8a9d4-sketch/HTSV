import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';
import { apiClient } from '../../lib/api-client';
import { useAuthStore } from '../../lib/auth-store';

interface SetDetail {
  id: number;
  title: string;
  description: string | null;
  ownerUserId: number;
  cards: { id: number; term: string; definition: string }[];
}

export function FlashcardSetDetailPage() {
  const { id } = useParams();
  const user = useAuthStore((s) => s.user);
  const { data: set } = useQuery<SetDetail>({
    queryKey: ['flashcard-set', id],
    queryFn: async () => (await apiClient.get(`/library/flashcard-sets/${id}`)).data,
  });

  if (!set) return null;

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">{set.title}</h1>
          <p className="text-sm text-slate-600">{set.description}</p>
        </div>
        {user && (
          <Link
            to={`/flashcards/${id}/study`}
            className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white"
          >
            Bắt đầu luyện tập
          </Link>
        )}
      </div>
      <div className="space-y-2">
        {set.cards.map((c) => (
          <div key={c.id} className="grid grid-cols-2 gap-4 rounded-xl border border-slate-200 bg-white p-4">
            <div className="font-medium text-slate-900">{c.term}</div>
            <div className="text-slate-600">{c.definition}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
