import { create } from 'zustand';
import { z } from 'zod';
import type { AppealStatus, GradeAppeal, GradeAppealDraft } from './student-types';

export const appealStorageKey = 'htsv-grade-appeals-v1';
const appealSchema = z.object({
  id: z.string(), createdAt: z.iso.datetime(),
  status: z.enum(['WAITING', 'REVIEWING', 'RESOLVED']),
  subjectName: z.string(), currentScore: z.number(), reason: z.string(),
  resolution: z.string(), resolvedAt: z.iso.datetime().nullable(),
});
const storageSchema = z.record(z.string(), z.array(appealSchema));
type AppealBuckets = Record<string, GradeAppeal[]>;

function readAppeals(): { appeals: AppealBuckets; storageError: string } {
  try {
    const raw = localStorage.getItem(appealStorageKey);
    return { appeals: raw ? storageSchema.parse(JSON.parse(raw)) : {}, storageError: '' };
  } catch {
    return { appeals: {}, storageError: 'Không đọc được yêu cầu phúc khảo đã lưu. Dữ liệu cũ được giữ nguyên.' };
  }
}

const nextStage: Record<AppealStatus, AppealStatus | null> = { WAITING: 'REVIEWING', REVIEWING: 'RESOLVED', RESOLVED: null };

interface AppealState {
  appeals: AppealBuckets;
  storageError: string;
  addAppeal: (owner: string, draft: GradeAppealDraft) => GradeAppeal;
  advance: (owner: string, id: string) => void;
}

// Mỗi tài khoản có nhóm riêng, giống student-store.ts — dữ liệu chỉ mô phỏng, lưu trên trình duyệt.
export const useGradeAppealStore = create<AppealState>((set) => {
  const commit = (appeals: AppealBuckets) => {
    try {
      localStorage.setItem(appealStorageKey, JSON.stringify(appeals));
    } catch {
      throw new Error('Không thể lưu yêu cầu phúc khảo. Hãy cho phép lưu trữ hoặc giải phóng dung lượng trình duyệt rồi thử lại.');
    }
    set({ appeals, storageError: '' });
  };
  return {
    ...readAppeals(),
    addAppeal: (owner, draft) => {
      const fresh = readAppeals();
      if (fresh.storageError) throw new Error(fresh.storageError);
      const appeal: GradeAppeal = { ...draft, id: `PK-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`, createdAt: new Date().toISOString(), status: 'WAITING', resolution: '', resolvedAt: null };
      commit({ ...fresh.appeals, [owner]: [appeal, ...(fresh.appeals[owner] ?? [])] });
      return appeal;
    },
    advance: (owner, id) => {
      const fresh = readAppeals();
      if (fresh.storageError) throw new Error(fresh.storageError);
      const list = (fresh.appeals[owner] ?? []).map((appeal) => {
        if (appeal.id !== id) return appeal;
        const status = nextStage[appeal.status];
        if (!status) return appeal;
        const resolved = status === 'RESOLVED';
        return {
          ...appeal,
          status,
          resolution: resolved ? 'Giảng viên xác nhận đã xem xét lại bài làm (kết quả mô phỏng, không phải kết quả chính thức từ nhà trường).' : appeal.resolution,
          resolvedAt: resolved ? new Date().toISOString() : appeal.resolvedAt,
        };
      });
      commit({ ...fresh.appeals, [owner]: list });
    },
  };
});
