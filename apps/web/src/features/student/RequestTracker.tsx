import { useState } from 'react';
import { GlassButton } from '../../components/GlassButton';
import { GlassModal } from '../../components/GlassModal';
import { Plus } from '../../components/Icons';
import { StatusBadge } from '../../components/StatusBadge';
import { useAuthStore } from '../../lib/auth-store';
import { normalizeSearch } from './student-mock-data';
import { requestOwner, useStudentStore } from './student-store';
import { StudentIcon } from './StudentIcon';
import type { RequestStatus, SupportRequest } from './student-types';

const emptyRequests: SupportRequest[] = [];
const statusLabels: Record<RequestStatus, string> = { WAITING: 'Chờ tiếp nhận', PROCESSING: 'Đang xử lý', READY: 'Sẵn sàng nhận', CANCELLED: 'Đã hủy' };

export function RequestTracker({ onCreate }: { onCreate: () => void }) {
  const user = useAuthStore((s) => s.user);
  const owner = requestOwner(user?.id);
  const requests = useStudentStore((s) => s.requests[owner] ?? emptyRequests);
  const updateStatus = useStudentStore((s) => s.updateStatus);
  const storageError = useStudentStore((s) => s.storageError);
  const [filter, setFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const selected = requests.find((r) => r.id === selectedId);
  const filtered = requests.filter((r) => (filter === 'ALL' || r.status === filter) && normalizeSearch(`${r.id} ${r.type}`).includes(normalizeSearch(search)));
  const update = (status: RequestStatus) => {
    if (!selected) return;
    try { updateStatus(owner, selected.id, status); setError(''); setConfirmCancel(false); setNotice(`Hồ sơ ${selected.id}: ${statusLabels[status]}.`); }
    catch (err) { setError(err instanceof Error ? err.message : 'Không thể lưu thay đổi.'); }
  };
  return <section aria-labelledby="requests-heading" id="requests">
    <div className="student-section-heading"><div><p className="student-eyebrow">Mọi hồ sơ, một nơi theo dõi</p><h2 id="requests-heading">Yêu cầu của tôi</h2></div><GlassButton variant="primary" onClick={onCreate}><Plus className="h-4 w-4" />Gửi yêu cầu mới</GlassButton></div>
    <div className="liquid-glass-card overflow-hidden">
      <div className="border-b border-slate-200/70 px-5 py-4"><p className="text-xs text-slate-600">Hồ sơ mô phỏng · Chỉ lưu trên trình duyệt này{user ? '' : ' · Bạn đang dùng chế độ khách'}.</p></div>
      {storageError && <p role="alert" className="p-5 text-sm text-red-700">{storageError}</p>}
      {requests.length > 0 && <div className="grid gap-3 border-b border-slate-100 p-4 sm:grid-cols-[1fr_200px]"><div><label htmlFor="request-search" className="sr-only">Tìm mã hoặc loại hồ sơ</label><input id="request-search" className="form-input" placeholder="Tìm mã hoặc loại hồ sơ…" value={search} onChange={(e) => setSearch(e.target.value)} /></div><div><label htmlFor="request-filter" className="sr-only">Lọc trạng thái hồ sơ</label><select id="request-filter" className="form-input" value={filter} onChange={(e) => setFilter(e.target.value)}><option value="ALL">Tất cả trạng thái</option>{Object.entries(statusLabels).map(([value, label]) => <option key={value} value={value}>{label}</option>)}</select></div></div>}
      {filtered.length ? <ul className="divide-y divide-slate-100">{filtered.map((request) => <li key={request.id} className="flex flex-wrap items-center gap-4 p-5"><span className="hidden rounded-xl bg-blue-50 p-3 text-blue-700 sm:block"><StudentIcon name="file" /></span><div className="min-w-0 flex-1 basis-44"><p className="text-[11px] font-medium text-slate-500">{request.id} · {new Date(request.createdAt).toLocaleDateString('vi-VN')}</p><h3 className="mt-1 break-words font-semibold">{request.type}</h3></div><StatusBadge status={request.status} /><button type="button" className="student-text-link" onClick={() => { setSelectedId(request.id); setConfirmCancel(false); setError(''); setNotice(''); }} aria-label={`Xem hồ sơ ${request.id}`}>Xem chi tiết</button></li>)}</ul> : <div className="px-5 py-9 text-center"><StudentIcon name="clipboard" className="mx-auto mb-3 h-9 w-9 text-blue-600" /><h3 className="font-semibold">{requests.length ? 'Không có hồ sơ phù hợp' : 'Bạn chưa có yêu cầu nào'}</h3><p className="mt-2 text-sm text-slate-600">{requests.length ? 'Thử đổi từ khóa hoặc bộ lọc trạng thái.' : 'Tạo yêu cầu đầu tiên để thử theo dõi tiến độ tại đây.'}</p></div>}
    </div>
    <GlassModal open={!!selected} title="Chi tiết yêu cầu mẫu" onClose={() => setSelectedId(null)}>
      {selected && <div className="space-y-5"><div><p className="break-all font-mono text-xs text-slate-500">{selected.id}</p><h3 className="my-2 text-lg font-semibold">{selected.type}</h3><StatusBadge status={selected.status} /></div>
        <dl className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 text-sm">{[['Họ tên', selected.fullName], ['Mã sinh viên', selected.studentId], ['Ngày tạo', new Date(selected.createdAt).toLocaleString('vi-VN')], ['Lý do', selected.reason], ['Ghi chú', selected.notes || 'Không có']].map(([label, value]) => <div key={label}><dt className="text-xs text-slate-500">{label}</dt><dd className="mt-1 whitespace-pre-wrap [overflow-wrap:anywhere]">{value}</dd></div>)}</dl>
        <p className="text-xs text-slate-600">Tiến độ dưới đây chỉ dùng thử trên thiết bị, không phải kết quả xử lý của nhà trường.</p>
        {selected.status !== 'CANCELLED' && <ol className="flex flex-wrap gap-2 text-xs">{(['WAITING', 'PROCESSING', 'READY'] as const).map((status, index) => <li key={status} className={`rounded-lg px-3 py-2 ${selected.status === status ? 'bg-blue-100 font-semibold text-blue-900' : 'bg-slate-100 text-slate-600'}`} aria-current={selected.status === status ? 'step' : undefined}>{index + 1}. {statusLabels[status]}</li>)}</ol>}
        {(selected.status === 'WAITING' || selected.status === 'PROCESSING') && <GlassButton className="w-full" onClick={() => update(selected.status === 'WAITING' ? 'PROCESSING' : 'READY')}>Mô phỏng: {selected.status === 'WAITING' ? 'tiếp nhận hồ sơ' : 'hoàn tất xử lý'}</GlassButton>}
        {selected.status === 'READY' && <p className="rounded-xl bg-green-50 p-3 text-sm text-green-900">Hồ sơ mẫu đã hoàn tất. Bản thử nghiệm không cấp giấy tờ hoặc tệp PDF chính thức.</p>}
        {(selected.status === 'WAITING' || selected.status === 'PROCESSING') && (confirmCancel ? <div className="rounded-xl border border-red-200 bg-red-50 p-4"><p className="mb-3 text-sm text-red-800">Hủy hồ sơ mẫu này? Hồ sơ vẫn được giữ trong danh sách với trạng thái Đã hủy.</p><div className="flex flex-wrap gap-2"><GlassButton variant="danger" onClick={() => update('CANCELLED')}>Xác nhận hủy</GlassButton><GlassButton onClick={() => setConfirmCancel(false)}>Giữ yêu cầu</GlassButton></div></div> : <GlassButton variant="ghost" className="text-red-700" onClick={() => setConfirmCancel(true)}>Hủy yêu cầu</GlassButton>)}
        <p role="status" className="text-sm text-green-800">{notice}</p>{error && <p role="alert" className="text-sm text-red-700">{error}</p>}
      </div>}
    </GlassModal>
  </section>;
}
