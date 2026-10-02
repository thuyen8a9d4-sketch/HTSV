import { create } from 'zustand';
import { z } from 'zod';
import { borrowDurationDays } from './library-data';

export const libraryStorageKey = 'htsv-library-borrows-v1';

export interface BorrowedBook {
  bookId: string;
  borrowedAt: string;
  dueAt: string;
}

const borrowSchema = z.object({ bookId: z.string(), borrowedAt: z.iso.datetime(), dueAt: z.iso.datetime() });
const storageSchema = z.record(z.string(), z.array(borrowSchema));
type BorrowBuckets = Record<string, BorrowedBook[]>;

function readBorrows(): { borrows: BorrowBuckets; storageError: string } {
  try {
    const raw = localStorage.getItem(libraryStorageKey);
    return { borrows: raw ? storageSchema.parse(JSON.parse(raw)) : {}, storageError: '' };
  } catch {
    return { borrows: {}, storageError: 'Không đọc được danh sách sách đã mượn. Dữ liệu cũ được giữ nguyên.' };
  }
}

interface LibraryState {
  borrows: BorrowBuckets;
  storageError: string;
  borrow: (owner: string, bookId: string) => void;
  returnBook: (owner: string, bookId: string) => void;
}

// Mỗi tài khoản có nhóm riêng, giống student-store.ts — dữ liệu chỉ mô phỏng, lưu trên trình duyệt.
export const useLibraryStore = create<LibraryState>((set) => {
  const commit = (borrows: BorrowBuckets) => {
    try {
      localStorage.setItem(libraryStorageKey, JSON.stringify(borrows));
    } catch {
      throw new Error('Không thể lưu. Hãy cho phép lưu trữ hoặc giải phóng dung lượng trình duyệt rồi thử lại.');
    }
    set({ borrows, storageError: '' });
  };
  return {
    ...readBorrows(),
    borrow: (owner, bookId) => {
      const fresh = readBorrows();
      if (fresh.storageError) throw new Error(fresh.storageError);
      const list = fresh.borrows[owner] ?? [];
      if (list.some((item) => item.bookId === bookId)) return;
      const now = new Date();
      const due = new Date(now);
      due.setDate(due.getDate() + borrowDurationDays);
      commit({ ...fresh.borrows, [owner]: [...list, { bookId, borrowedAt: now.toISOString(), dueAt: due.toISOString() }] });
    },
    returnBook: (owner, bookId) => {
      const fresh = readBorrows();
      if (fresh.storageError) throw new Error(fresh.storageError);
      commit({ ...fresh.borrows, [owner]: (fresh.borrows[owner] ?? []).filter((item) => item.bookId !== bookId) });
    },
  };
});
