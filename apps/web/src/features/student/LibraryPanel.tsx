import { useState } from 'react';
import { EmptyState } from '../../components/EmptyState';
import { GlassButton } from '../../components/GlassButton';
import { useAuthStore } from '../../lib/auth-store';
import { lateFeePerDay, libraryCatalog } from './library-data';
import { useLibraryStore } from './library-store';
import { normalizeSearch } from './student-mock-data';
import { requestOwner } from './student-store';
import { daysUntil, formatVnd } from './tuition-data';

export function LibraryPanel() {
  const user = useAuthStore((s) => s.user);
  const owner = requestOwner(user?.id);
  const borrows = useLibraryStore((s) => s.borrows[owner] ?? []);
  const storageError = useLibraryStore((s) => s.storageError);
  const borrow = useLibraryStore((s) => s.borrow);
  const returnBook = useLibraryStore((s) => s.returnBook);

  const [query, setQuery] = useState('');
  const filtered = libraryCatalog.filter((book) => normalizeSearch(`${book.title} ${book.author} ${book.category}`).includes(normalizeSearch(query)));

  return (
    <section aria-labelledby="library-heading" id="library" className="space-y-7">
      <div className="student-section-heading">
        <div>
          <p className="student-eyebrow">Mượn · trả · hạn · phạt</p>
          <h2 id="library-heading">Thư viện</h2>
        </div>
      </div>

      <div className="liquid-glass-card p-5 sm:p-6">
        <p className="text-xs text-slate-600">Danh mục và lượt mượn mẫu — hệ thống chưa nối cơ sở dữ liệu thư viện thật.</p>
        {storageError && <p role="alert" className="mt-2 text-sm text-red-700">{storageError}</p>}
      </div>

      {borrows.length > 0 && (
        <div className="liquid-glass-card overflow-hidden">
          <div className="border-b border-slate-200/70 px-5 py-4"><p className="text-xs text-slate-600">Sách đang mượn</p></div>
          <ul className="divide-y divide-slate-100">
            {borrows.map((item) => {
              const book = libraryCatalog.find((entry) => entry.id === item.bookId);
              const left = daysUntil(item.dueAt);
              const overdue = left < 0;
              return (
                <li key={item.bookId} className="flex flex-wrap items-center justify-between gap-3 p-5">
                  <div className="min-w-0">
                    <h3 className="font-semibold">{book?.title ?? item.bookId}</h3>
                    <p className="text-xs text-slate-500">Hạn trả: {new Date(item.dueAt).toLocaleDateString('vi-VN')}</p>
                  </div>
                  {overdue ? (
                    <span className="liquid-pill border-red-200 bg-red-50 text-red-700">Quá hạn {Math.abs(left)} ngày · Phạt {formatVnd(Math.abs(left) * lateFeePerDay)}</span>
                  ) : (
                    <span className="liquid-pill border-green-200 bg-green-50 text-green-800">Còn {left} ngày</span>
                  )}
                  <GlassButton onClick={() => returnBook(owner, item.bookId)}>Trả sách</GlassButton>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      <div>
        <label htmlFor="library-search" className="sr-only">Tìm sách theo tên, tác giả, chủ đề</label>
        <input id="library-search" className="form-input" placeholder="Tìm sách theo tên, tác giả, chủ đề…" value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>

      {filtered.length ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((book) => {
            const isBorrowed = borrows.some((item) => item.bookId === book.id);
            return (
              <div key={book.id} className="liquid-glass-card space-y-2 p-5">
                <h3 className="font-semibold">{book.title}</h3>
                <p className="text-sm text-slate-600">{book.author} · {book.category}</p>
                <p className="text-xs text-slate-500">{book.availableCopies > 0 ? `Còn ${book.availableCopies} bản` : 'Tạm hết bản để mượn'}</p>
                <GlassButton
                  variant={isBorrowed ? 'ghost' : 'primary'}
                  disabled={isBorrowed}
                  onClick={() => borrow(owner, book.id)}
                >
                  {isBorrowed ? 'Đang mượn' : 'Mượn sách'}
                </GlassButton>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState title="Không tìm thấy sách phù hợp" description="Thử đổi từ khóa tìm kiếm." />
      )}
    </section>
  );
}
