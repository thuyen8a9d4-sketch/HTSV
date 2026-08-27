import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { apiClient } from '../../lib/api-client';

interface FlashcardSet {
  id: number;
  title: string;
  status: string;
  cardCount: number;
}

export function MyFlashcardSetsPage() {
  const { data } = useQuery<FlashcardSet[]>({
    queryKey: ['my-flashcard-sets'],
    queryFn: async () => (await apiClient.get('/library/flashcard-sets/my')).data,
  });

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-slate-900">Bộ thẻ của tôi</h1>
        <Link to="/flashcards/new" className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white">
          + Tạo bộ thẻ
        </Link>
      </div>
      <div className="space-y-2">
        {data?.map((set) => (
          <Link
            key={set.id}
            to={`/flashcards/${set.id}/edit`}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 hover:border-slate-400"
          >
            <span className="font-medium text-slate-900">{set.title}</span>
            <span className="text-xs text-slate-500">
              {set.cardCount} thẻ · {set.status === 'PUBLISHED' ? 'Đã xuất bản' : 'Nháp'}
            </span>
          </Link>
        ))}
        {data?.length === 0 && <p className="text-slate-500">Bạn chưa tạo bộ thẻ nào.</p>}
      </div>
    </div>
  );
}
