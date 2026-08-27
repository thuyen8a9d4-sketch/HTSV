import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { apiClient } from '../../lib/api-client';
import { useAuthStore } from '../../lib/auth-store';

interface FlashcardSet {
  id: number;
  title: string;
  description: string | null;
  cardCount: number;
  owner: { fullName: string } | null;
  subject: { name: string } | null;
}

export function FlashcardSetsPage() {
  const user = useAuthStore((s) => s.user);
  const { data } = useQuery<FlashcardSet[]>({
    queryKey: ['flashcard-sets'],
    queryFn: async () => (await apiClient.get('/library/flashcard-sets')).data,
  });

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900">Flashcard</h1>
        {user && (
          <div className="flex gap-2">
            <Link to="/flashcards/my" className="rounded-lg border border-slate-300 px-4 py-2 text-sm">
              Bộ của tôi
            </Link>
            <Link to="/flashcards/new" className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white">
              + Tạo bộ thẻ
            </Link>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {data?.map((set) => (
          <Link
            key={set.id}
            to={`/flashcards/${set.id}`}
            className="rounded-xl border border-slate-200 bg-white p-4 hover:border-slate-400"
          >
            <div className="mb-1 text-xs text-slate-500">{set.subject?.name ?? 'Chung'}</div>
            <div className="mb-2 font-semibold text-slate-900">{set.title}</div>
            <p className="line-clamp-2 text-sm text-slate-600">{set.description}</p>
            <div className="mt-2 text-xs text-slate-500">{set.cardCount} thẻ · {set.owner?.fullName}</div>
          </Link>
        ))}
        {data?.length === 0 && <p className="text-slate-500">Chưa có bộ thẻ nào.</p>}
      </div>
    </div>
  );
}
