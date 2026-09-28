import { create } from 'zustand';
import { z } from 'zod';
import type { RequestDraft, RequestStatus, SupportRequest } from './student-types';

export const studentStorageKey = 'htsv-student-requests-v1';
const requestSchema = z.object({
  id: z.string(), createdAt: z.iso.datetime(),
  status: z.enum(['WAITING', 'PROCESSING', 'READY', 'CANCELLED']),
  type: z.string(), fullName: z.string(), studentId: z.string(), reason: z.string(), notes: z.string(),
});
const storageSchema = z.record(z.string(), z.array(requestSchema));
type RequestBuckets = Record<string, SupportRequest[]>;

function readRequests(): { requests: RequestBuckets; storageError: string } {
  try {
    const raw = localStorage.getItem(studentStorageKey);
    return { requests: raw ? storageSchema.parse(JSON.parse(raw)) : {}, storageError: '' };
  } catch {
    return { requests: {}, storageError: 'Không đọc được hồ sơ đã lưu. Dữ liệu cũ được giữ nguyên. Hãy kiểm tra quyền lưu trữ của trình duyệt trước khi tạo hồ sơ.' };
  }
}

interface StudentState {
  requests: RequestBuckets;
  storageError: string;
  addRequest: (owner: string, draft: RequestDraft) => SupportRequest;
  updateStatus: (owner: string, id: string, status: RequestStatus) => void;
}

// Each account has its own bucket; the guest preview never shows an account's requests.
export const useStudentStore = create<StudentState>((set) => {
  const commit = (requests: RequestBuckets) => {
    try {
      localStorage.setItem(studentStorageKey, JSON.stringify(requests));
    } catch {
      throw new Error('Không thể lưu hồ sơ. Hãy cho phép lưu trữ hoặc giải phóng dung lượng trình duyệt rồi thử lại.');
    }
    set({ requests, storageError: '' });
  };
  return {
    ...readRequests(),
    addRequest: (owner, draft) => {
      const fresh = readRequests();
      if (fresh.storageError) throw new Error(fresh.storageError);
      const request: SupportRequest = { ...draft, id: `YC-${new Date().getFullYear()}-${crypto.randomUUID().slice(0, 8).toUpperCase()}`, createdAt: new Date().toISOString(), status: 'WAITING' };
      commit({ ...fresh.requests, [owner]: [request, ...(fresh.requests[owner] ?? [])] });
      return request;
    },
    updateStatus: (owner, id, status) => {
      const fresh = readRequests();
      if (fresh.storageError) throw new Error(fresh.storageError);
      commit({ ...fresh.requests, [owner]: (fresh.requests[owner] ?? []).map((request) => request.id === id ? { ...request, status } : request) });
    },
  };
});

export function requestOwner(userId?: number) { return userId === undefined ? 'guest' : `user-${userId}`; }
