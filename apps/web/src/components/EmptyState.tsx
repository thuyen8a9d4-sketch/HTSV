import type { ReactNode } from 'react';
import { Mail } from './Icons';

export function EmptyState({ title, description, action }: { title: string; description?: string; action?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-dashed border-slate-300 bg-white/60 px-5 py-12 text-center">
      <span className="avatar mx-auto mb-4 h-14 w-14 rounded-2xl">
        <Mail className="h-6 w-6" />
      </span>
      <h2 className="text-lg font-semibold">
        {title}
      </h2>
      {description && (
        <p className="mx-auto mt-2 max-w-sm text-slate-600">
          {description}
        </p>
      )}
      {action && (
        <div className="mt-5">
          {action}
        </div>
      )}
    </div>
  );
}
