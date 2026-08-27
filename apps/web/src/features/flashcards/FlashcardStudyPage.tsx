import { useQuery, useMutation } from '@tanstack/react-query';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { apiClient } from '../../lib/api-client';

interface QueueItem {
  card: { id: number; term: string; definition: string };
  result: { masteryStatus: string } | null;
}

export function FlashcardStudyPage() {
  const { id } = useParams();
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [done, setDone] = useState(false);

  const { data: queue } = useQuery<QueueItem[]>({
    queryKey: ['flashcard-study', id],
    queryFn: async () => (await apiClient.get(`/library/flashcard-sets/${id}/study`)).data,
  });

  const review = useMutation({
    mutationFn: (payload: { cardId: number; correct: boolean }) =>
      apiClient.post(`/library/flashcard-sets/${id}/review`, payload),
  });

  if (!queue || queue.length === 0) {
    return <p className="text-slate-500">Bộ thẻ này chưa có thẻ nào.</p>;
  }

  if (done) {
    return (
      <div className="mx-auto max-w-md text-center">
        <h1 className="mb-4 text-xl font-bold text-slate-900">Hoàn thành lượt luyện tập! 🎉</h1>
        <Link to={`/flashcards/${id}`} className="rounded-lg bg-slate-900 px-4 py-2 text-sm text-white">
          Quay lại bộ thẻ
        </Link>
      </div>
    );
  }

  const current = queue[index];

  const handleAnswer = (correct: boolean) => {
    review.mutate({ cardId: current.card.id, correct });
    if (index + 1 >= queue.length) {
      setDone(true);
    } else {
      setIndex(index + 1);
      setFlipped(false);
    }
  };

  return (
    <div className="mx-auto max-w-md text-center">
      <p className="mb-4 text-sm text-slate-500">
        Thẻ {index + 1} / {queue.length}
      </p>
      <div className="mb-6 [perspective:1000px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.card.id + (flipped ? '-back' : '-front')}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setFlipped((f) => !f)}
            className="flex h-56 cursor-pointer items-center justify-center rounded-2xl border border-slate-200 bg-white p-6 text-xl font-medium text-slate-900 shadow-sm"
          >
            {flipped ? current.card.definition : current.card.term}
          </motion.div>
        </AnimatePresence>
      </div>
      <p className="mb-4 text-xs text-slate-400">Nhấn vào thẻ để lật</p>
      {flipped && (
        <div className="flex justify-center gap-3">
          <button
            onClick={() => handleAnswer(false)}
            className="rounded-lg bg-red-100 px-4 py-2 text-sm text-red-700"
          >
            Chưa nhớ
          </button>
          <button
            onClick={() => handleAnswer(true)}
            className="rounded-lg bg-green-100 px-4 py-2 text-sm text-green-700"
          >
            Đã nhớ
          </button>
        </div>
      )}
    </div>
  );
}
