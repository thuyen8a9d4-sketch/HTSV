import { create } from 'zustand';
import { z } from 'zod';

export const savedJobsStorageKey = 'htsv-saved-jobs-v1';
const storageSchema = z.record(z.string(), z.array(z.string()));
type SavedJobBuckets = Record<string, string[]>;

function readSavedJobs(): { saved: SavedJobBuckets; storageError: string } {
  try {
    const raw = localStorage.getItem(savedJobsStorageKey);
    return { saved: raw ? storageSchema.parse(JSON.parse(raw)) : {}, storageError: '' };
  } catch {
    return { saved: {}, storageError: 'Không đọc được tin đã lưu. Dữ liệu cũ được giữ nguyên.' };
  }
}

interface JobState {
  saved: SavedJobBuckets;
  storageError: string;
  toggleSave: (owner: string, jobId: string) => void;
}

// Mỗi tài khoản có nhóm riêng, giống student-store.ts — dữ liệu chỉ mô phỏng, lưu trên trình duyệt.
export const useJobStore = create<JobState>((set) => ({
  ...readSavedJobs(),
  toggleSave: (owner, jobId) => {
    const fresh = readSavedJobs();
    if (fresh.storageError) throw new Error(fresh.storageError);
    const current = fresh.saved[owner] ?? [];
    const next = current.includes(jobId) ? current.filter((id) => id !== jobId) : [...current, jobId];
    const saved = { ...fresh.saved, [owner]: next };
    try {
      localStorage.setItem(savedJobsStorageKey, JSON.stringify(saved));
    } catch {
      throw new Error('Không thể lưu tin. Hãy cho phép lưu trữ hoặc giải phóng dung lượng trình duyệt rồi thử lại.');
    }
    set({ saved, storageError: '' });
  },
}));
