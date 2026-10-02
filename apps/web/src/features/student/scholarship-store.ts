import { create } from 'zustand';
import { z } from 'zod';

export const scholarshipStorageKey = 'htsv-scholarship-applications-v1';
export type ScholarshipStatus = 'PENDING' | 'APPROVED' | 'REJECTED';

export interface ScholarshipApplication {
  scholarshipId: string;
  note: string;
  status: ScholarshipStatus;
  submittedAt: string;
}

const applicationSchema = z.object({
  scholarshipId: z.string(), note: z.string(),
  status: z.enum(['PENDING', 'APPROVED', 'REJECTED']),
  submittedAt: z.iso.datetime(),
});
const storageSchema = z.record(z.string(), z.array(applicationSchema));
type ApplicationBuckets = Record<string, ScholarshipApplication[]>;

function readApplications(): { applications: ApplicationBuckets; storageError: string } {
  try {
    const raw = localStorage.getItem(scholarshipStorageKey);
    return { applications: raw ? storageSchema.parse(JSON.parse(raw)) : {}, storageError: '' };
  } catch {
    return { applications: {}, storageError: 'Không đọc được hồ sơ học bổng đã lưu. Dữ liệu cũ được giữ nguyên.' };
  }
}

interface ScholarshipState {
  applications: ApplicationBuckets;
  storageError: string;
  apply: (owner: string, scholarshipId: string, note: string) => void;
  decide: (owner: string, scholarshipId: string, status: 'APPROVED' | 'REJECTED') => void;
}

// Mỗi tài khoản có nhóm riêng, giống student-store.ts — dữ liệu chỉ mô phỏng, lưu trên trình duyệt.
export const useScholarshipStore = create<ScholarshipState>((set) => {
  const commit = (applications: ApplicationBuckets) => {
    try {
      localStorage.setItem(scholarshipStorageKey, JSON.stringify(applications));
    } catch {
      throw new Error('Không thể lưu hồ sơ học bổng. Hãy cho phép lưu trữ hoặc giải phóng dung lượng trình duyệt rồi thử lại.');
    }
    set({ applications, storageError: '' });
  };
  return {
    ...readApplications(),
    apply: (owner, scholarshipId, note) => {
      const fresh = readApplications();
      if (fresh.storageError) throw new Error(fresh.storageError);
      const list = fresh.applications[owner] ?? [];
      if (list.some((item) => item.scholarshipId === scholarshipId)) return;
      const application: ScholarshipApplication = { scholarshipId, note, status: 'PENDING', submittedAt: new Date().toISOString() };
      commit({ ...fresh.applications, [owner]: [...list, application] });
    },
    decide: (owner, scholarshipId, status) => {
      const fresh = readApplications();
      if (fresh.storageError) throw new Error(fresh.storageError);
      const list = (fresh.applications[owner] ?? []).map((item) => (item.scholarshipId === scholarshipId ? { ...item, status } : item));
      commit({ ...fresh.applications, [owner]: list });
    },
  };
});
