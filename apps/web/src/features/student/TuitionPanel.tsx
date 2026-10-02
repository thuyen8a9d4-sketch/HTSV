import { daysUntil, dueSoonThresholdDays, feeItems, formatVnd } from './tuition-data';

function DueBadge({ dueDate, status }: { dueDate: string; status: 'PAID' | 'UNPAID' }) {
  if (status === 'PAID') return <span className="liquid-pill border-green-200 bg-green-50 text-green-800">Đã đóng</span>;
  const left = daysUntil(dueDate);
  if (left < 0) return <span className="liquid-pill border-red-200 bg-red-50 text-red-700">Quá hạn {Math.abs(left)} ngày</span>;
  if (left <= dueSoonThresholdDays) return <span className="liquid-pill border-red-200 bg-red-50 text-red-700">Còn {left} ngày</span>;
  return <span className="liquid-pill border-slate-200 bg-slate-100 text-slate-600">Chưa đóng</span>;
}

export function TuitionPanel() {
  const unpaid = feeItems.filter((item) => item.status === 'UNPAID');
  const dueSoon = unpaid.filter((item) => daysUntil(item.dueDate) <= dueSoonThresholdDays);
  const totalDue = unpaid.reduce((sum, item) => sum + item.amount, 0);

  return (
    <section aria-labelledby="tuition-heading" id="tuition" className="space-y-7">
      <div className="student-section-heading">
        <div>
          <p className="student-eyebrow">Khoản thu theo học kỳ</p>
          <h2 id="tuition-heading">Học phí &amp; BHYT</h2>
        </div>
      </div>

      <div className="liquid-glass-card p-5 sm:p-6">
        <p className="text-xs text-slate-600">
          Dữ liệu mẫu vì hệ thống chưa nối cổng học phí thật. Thanh toán tại quầy học vụ hoặc qua ngân hàng liên kết của trường.
        </p>
      </div>

      {dueSoon.length > 0 && (
        <div className="rounded-2xl border border-red-200 bg-red-50/60 p-4 dark:border-red-500/20 dark:bg-red-500/10">
          <p className="text-sm font-semibold text-red-800 dark:text-red-200">Có {dueSoon.length} khoản sắp đến hoặc đã quá hạn đóng</p>
          <ul className="mt-2 space-y-1 text-sm text-red-700/90 dark:text-red-300/80">
            {dueSoon.map((item) => <li key={item.id}>{item.name} · {formatVnd(item.amount)}</li>)}
          </ul>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="liquid-glass-card p-5">
          <p className="text-sm text-slate-600">Tổng còn phải đóng</p>
          <p className="mt-1 text-2xl font-extrabold tabular-nums">{formatVnd(totalDue)}</p>
        </div>
        <div className="liquid-glass-card p-5">
          <p className="text-sm text-slate-600">Số khoản chưa đóng</p>
          <p className="mt-1 text-2xl font-extrabold tabular-nums">{unpaid.length}</p>
        </div>
      </div>

      <div className="liquid-glass-card overflow-hidden">
        <ul className="divide-y divide-slate-100">
          {feeItems.map((item) => (
            <li key={item.id} className="flex flex-wrap items-center gap-4 p-5">
              <div className="min-w-0 flex-1 basis-56">
                <p className="text-[11px] font-medium text-slate-500">{item.semester}</p>
                <h3 className="mt-1 break-words font-semibold">{item.name}</h3>
                <p className="mt-1 text-xs text-slate-500">Hạn đóng: {new Date(item.dueDate).toLocaleDateString('vi-VN')}</p>
              </div>
              <p className="text-base font-bold tabular-nums">{formatVnd(item.amount)}</p>
              <DueBadge dueDate={item.dueDate} status={item.status} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
