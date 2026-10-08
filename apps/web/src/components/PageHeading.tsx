import type { ReactNode } from 'react';

export function PageHeading({
  title,
  description,
  action,
  eyebrow,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
  eyebrow?: string;
}) {
  return (
    <div className="mb-7 flex flex-wrap items-start justify-between gap-4">
      <div className="min-w-0 flex-1">
        {eyebrow && (
          <p className="mb-2 text-[11px] font-bold tracking-widest text-blue-700 uppercase">
            {eyebrow}
          </p>
        )}
        <h1 className="text-2xl font-bold">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-xl text-sm text-slate-600">
            {description}
          </p>
        )}
      </div>
      {action && (
        <div className="shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}
