import { create } from 'zustand';
import { z } from 'zod';
import type { LecturerEvaluation } from './student-types';

export const evaluationStorageKey = 'htsv-lecturer-evaluations-v1';
const evaluationSchema = z.object({
  classSectionId: z.string(),
  ratings: z.record(z.string(), z.number()),
  comment: z.string(),
  submittedAt: z.iso.datetime(),
});
const storageSchema = z.record(z.string(), z.array(evaluationSchema));
type EvaluationBuckets = Record<string, LecturerEvaluation[]>;

function readEvaluations(): { evaluations: EvaluationBuckets; storageError: string } {
  try {
    const raw = localStorage.getItem(evaluationStorageKey);
    return { evaluations: raw ? storageSchema.parse(JSON.parse(raw)) : {}, storageError: '' };
  } catch {
    return { evaluations: {}, storageError: 'Không đọc được đánh giá đã lưu. Dữ liệu cũ được giữ nguyên.' };
  }
}

interface EvaluationState {
  evaluations: EvaluationBuckets;
  storageError: string;
  submitEvaluation: (owner: string, classSectionId: string, ratings: Record<string, number>, comment: string) => void;
}

// Mỗi tài khoản có nhóm riêng, giống student-store.ts — dữ liệu chỉ mô phỏng, lưu trên trình duyệt.
export const useClassSectionStore = create<EvaluationState>((set) => ({
  ...readEvaluations(),
  submitEvaluation: (owner, classSectionId, ratings, comment) => {
    const fresh = readEvaluations();
    if (fresh.storageError) throw new Error(fresh.storageError);
    const list = fresh.evaluations[owner] ?? [];
    if (list.some((item) => item.classSectionId === classSectionId)) return;
    const evaluation: LecturerEvaluation = { classSectionId, ratings, comment, submittedAt: new Date().toISOString() };
    const evaluations = { ...fresh.evaluations, [owner]: [...list, evaluation] };
    try {
      localStorage.setItem(evaluationStorageKey, JSON.stringify(evaluations));
    } catch {
      throw new Error('Không thể lưu đánh giá. Hãy cho phép lưu trữ hoặc giải phóng dung lượng trình duyệt rồi thử lại.');
    }
    set({ evaluations, storageError: '' });
  },
}));
