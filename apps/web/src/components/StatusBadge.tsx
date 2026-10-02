const statuses: Record<string, { label: string; style: string }> = {
  WAITING: { label: 'Chờ tiếp nhận', style: 'border-amber-200 bg-amber-50 text-amber-800' },
  PROCESSING: { label: 'Đang xử lý', style: 'border-blue-200 bg-blue-50 text-blue-800' },
  READY: { label: 'Sẵn sàng nhận', style: 'border-green-200 bg-green-50 text-green-800' },
  CANCELLED: { label: 'Đã hủy', style: 'border-slate-200 bg-slate-100 text-slate-600' },
  APPROVED: { label: 'Đã duyệt', style: 'border-green-200 bg-green-50 text-green-800' },
  PENDING: { label: 'Chờ duyệt', style: 'border-amber-200 bg-amber-50 text-amber-800' },
  REJECTED: { label: 'Từ chối', style: 'border-red-200 bg-red-50 text-red-700' },
  ACTIVE: { label: 'Hoạt động', style: 'border-green-200 bg-green-50 text-green-800' },
  INACTIVE: { label: 'Đã khóa', style: 'border-slate-200 bg-slate-100 text-slate-600' },
  OPEN: { label: 'Chưa xử lý', style: 'border-amber-200 bg-amber-50 text-amber-800' },
  RESOLVED: { label: 'Đã xử lý', style: 'border-green-200 bg-green-50 text-green-800' },
  DISMISSED: { label: 'Đã bỏ qua', style: 'border-slate-200 bg-slate-100 text-slate-600' },
  DRAFT: { label: 'Đang soạn', style: 'border-slate-200 bg-slate-100 text-slate-600' },
  SUBMITTED: { label: 'Chờ BCS duyệt', style: 'border-amber-200 bg-amber-50 text-amber-800' },
  MONITOR_REVIEWED: { label: 'Chờ khoa duyệt', style: 'border-blue-200 bg-blue-50 text-blue-800' },
  RETURNED: { label: 'Yêu cầu chỉnh sửa', style: 'border-red-200 bg-red-50 text-red-700' },
  PUBLISHED: { label: 'Đã công bố', style: 'border-green-200 bg-green-50 text-green-800' },
  REVIEWING: { label: 'Giảng viên đang xem xét', style: 'border-blue-200 bg-blue-50 text-blue-800' },
};
export function StatusBadge({ status }: { status: string }) {
  const item = statuses[status] ?? { label: status, style: 'border-slate-200 bg-slate-100 text-slate-600' };
  return <span className={`liquid-pill whitespace-nowrap ${item.style}`}><span className="h-1.5 w-1.5 rounded-full bg-current" aria-hidden="true" />{item.label}</span>;
}
