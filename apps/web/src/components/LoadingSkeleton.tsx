export function LoadingSkeleton({ variant = 'posts', count = 3 }: { variant?: 'posts' | 'table' | 'stats'; count?: number }) {
  return <div role="status" aria-label="Đang tải dữ liệu" className={variant === 'stats' ? 'grid grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-5' : 'space-y-4'}>
    <span className="sr-only">Đang tải dữ liệu…</span>
    {Array.from({ length: count }, (_, i) => <div key={i} aria-hidden="true" className="rounded-2xl border border-white bg-white/80 p-5 shadow-sm">
      <div className="mb-4 flex items-center gap-3"><div className="skeleton h-10 w-10" /><div className="skeleton h-4 w-1/3" /></div>
      <div className="skeleton mb-3 h-4 w-full" /><div className="skeleton h-4 w-2/3" />
      {variant === 'posts' && <div className="skeleton mt-5 h-6 w-1/2" />}
    </div>)}
  </div>;
}
