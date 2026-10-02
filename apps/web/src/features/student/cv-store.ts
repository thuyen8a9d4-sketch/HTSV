import { create } from 'zustand';
import { z } from 'zod';

export const cvStorageKey = 'htsv-cv-draft-v1';
export type CvTemplate = 'classic' | 'modern';

export interface CvDraft {
  fullName: string;
  email: string;
  phone: string;
  objective: string;
  education: string;
  skills: string;
  experience: string;
  template: CvTemplate;
}

export function emptyCvDraft(fullName = '', email = ''): CvDraft {
  return { fullName, email, phone: '', objective: '', education: '', skills: '', experience: '', template: 'classic' };
}

const draftSchema = z.object({
  fullName: z.string(), email: z.string(), phone: z.string(), objective: z.string(),
  education: z.string(), skills: z.string(), experience: z.string(), template: z.enum(['classic', 'modern']),
});
const storageSchema = z.record(z.string(), draftSchema);
type CvBuckets = Record<string, CvDraft>;

function readDrafts(): { drafts: CvBuckets; storageError: string } {
  try {
    const raw = localStorage.getItem(cvStorageKey);
    return { drafts: raw ? storageSchema.parse(JSON.parse(raw)) : {}, storageError: '' };
  } catch {
    return { drafts: {}, storageError: 'Không đọc được hồ sơ đã lưu. Dữ liệu cũ được giữ nguyên.' };
  }
}

interface CvState {
  drafts: CvBuckets;
  storageError: string;
  save: (owner: string, draft: CvDraft) => void;
}

// Mỗi tài khoản giữ đúng 1 bản nháp CV, lưu trên trình duyệt — giống cách student-store.ts lưu hồ sơ mẫu.
export const useCvStore = create<CvState>((set) => ({
  ...readDrafts(),
  save: (owner, draft) => {
    const fresh = readDrafts();
    if (fresh.storageError) throw new Error(fresh.storageError);
    const drafts = { ...fresh.drafts, [owner]: draft };
    try {
      localStorage.setItem(cvStorageKey, JSON.stringify(drafts));
    } catch {
      throw new Error('Không thể lưu hồ sơ. Hãy cho phép lưu trữ hoặc giải phóng dung lượng trình duyệt rồi thử lại.');
    }
    set({ drafts, storageError: '' });
  },
}));
