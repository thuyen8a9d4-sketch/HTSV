import type { ReactNode } from 'react';

export function TableFrame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <>
      <div
        className="table-scroll focus-ring relative"
        role="region"
        aria-label={`${label} — cuộn ngang để xem đầy đủ`}
        tabIndex={0}
      >
        {children}
      </div>
      <p className="mt-2 text-xs text-slate-600 lg:hidden">
        Vuốt ngang trong bảng để xem đầy đủ thông tin.
      </p>
    </>
  );
}
