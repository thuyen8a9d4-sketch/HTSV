import { useState, type FormEvent } from 'react';
import { EmptyState } from '../../components/EmptyState';
import { GlassButton } from '../../components/GlassButton';
import { GlassModal } from '../../components/GlassModal';
import { Plus } from '../../components/Icons';
import { StatusBadge } from '../../components/StatusBadge';
import { useAuthStore } from '../../lib/auth-store';
import { appealDeadlineNote, gradedSubjects } from './grade-appeal-data';
import { useGradeAppealStore } from './grade-appeal-store';
import { requestOwner } from './student-store';
import type { AppealStatus } from './student-types';

const steps: { status: AppealStatus; label: string }[] = [
  { status: 'WAITING', label: 'Chờ tiếp nhận' },
  { status: 'REVIEWING', label: 'Giảng viên xem xét' },
  { status: 'RESOLVED', label: 'Có kết quả' },
];
const stepOrder: AppealStatus[] = ['WAITING', 'REVIEWING', 'RESOLVED'];

export function GradeAppealPanel() {
  const user = useAuthStore((s) => s.user);
  const owner = requestOwner(user?.id);
  const appeals = useGradeAppealStore((s) => s.appeals[owner] ?? []);
  const storageError = useGradeAppealStore((s) => s.storageError);
  const addAppeal = useGradeAppealStore((s) => s.addAppeal);
  const advance = useGradeAppealStore((s) => s.advance);

  const [subjectName, setSubjectName] = useState('');
  const [reason, setReason] = useState('');
  const [formError, setFormError] = useState('');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [notice, setNotice] = useState('');

  const openSubjects = gradedSubjects.filter((subject) => !appeals.some((appeal) => appeal.subjectName === subject.name && appeal.status !== 'RESOLVED'));
  const selected = appeals.find((appeal) => appeal.id === selectedId);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = gradedSubjects.find((item) => item.name === subjectName);
    if (!subject) { setFormError('Chọn một môn học để phúc khảo.'); return; }
    if (reason.trim().length < 10) { setFormError('Mô tả lý do ít nhất 10 ký tự.'); return; }
    try {
      addAppeal(owner, { subjectName: subject.name, currentScore: subject.currentScore, reason: reason.trim() });
      setSubjectName('');
      setReason('');
      setFormError('');
      setNotice(`Đã gửi yêu cầu phúc khảo môn ${subject.name}.`);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Không thể lưu. Vui lòng thử lại.');
    }
  };

  return (
    <section aria-labelledby="appeal-heading" id="grade-appeal" className="space-y-7">
      <div className="student-section-heading">
        <div>
          <p className="student-eyebrow">Khiếu nại kết quả học tập</p>
          <h2 id="appeal-heading">Phúc khảo điểm</h2>
        </div>
      </div>

      <div className="liquid-glass-card space-y-2 p-5 sm:p-6">
        <p className="text-xs text-slate-600">
          Yêu cầu mô phỏng · Chỉ lưu trên trình duyệt này{user ? '' : ' · Bạn đang dùng chế độ khách'}, chưa gửi đến giảng viên thật. Điểm hiện tại dưới đây là dữ liệu mẫu vì hệ thống chưa nối bảng điểm thật.
        </p>
        <p className="text-xs text-slate-600">{appealDeadlineNote}</p>
        {storageError && <p role="alert" className="text-sm text-red-700">{storageError}</p>}
      </div>

      <form onSubmit={submit} className="liquid-glass-card space-y-4 p-5 sm:p-6">
        <h3 className="font-semibold">Gửi yêu cầu phúc khảo</h3>
        {openSubjects.length ? (
          <>
            <div>
              <label htmlFor="appeal-subject" className="field-label">Môn học</label>
              <select id="appeal-subject" className="form-input" value={subjectName} onChange={(e) => setSubjectName(e.target.value)}>
                <option value="">— Chọn môn —</option>
                {openSubjects.map((subject) => (
                  <option key={subject.name} value={subject.name}>{subject.name} · điểm hiện tại {subject.currentScore}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="appeal-reason" className="field-label">Lý do xin chấm lại</label>
              <textarea
                id="appeal-reason"
                className="form-input min-h-24"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                placeholder="Ví dụ: tôi nghĩ câu 3 đã được chấm thiếu điểm so với đáp án…"
              />
            </div>
            {formError && <p role="alert" className="text-sm text-red-700">{formError}</p>}
            <GlassButton type="submit" variant="primary" className="w-full sm:w-auto">
              <Plus className="h-4 w-4" />Gửi yêu cầu phúc khảo
            </GlassButton>
          </>
        ) : (
          <p className="text-sm text-slate-600">Tất cả môn hiện có điểm đều đã có yêu cầu phúc khảo đang chờ xử lý.</p>
        )}
        {notice && <p role="status" className="text-sm text-green-800">{notice}</p>}
      </form>

      <div className="liquid-glass-card overflow-hidden">
        <div className="border-b border-slate-200/70 px-5 py-4"><p className="text-xs text-slate-600">Danh sách yêu cầu phúc khảo của tôi</p></div>
        {appeals.length ? (
          <ul className="divide-y divide-slate-100">
            {appeals.map((appeal) => (
              <li key={appeal.id} className="flex flex-wrap items-center gap-4 p-5">
                <div className="min-w-0 flex-1 basis-44">
                  <p className="text-[11px] font-medium text-slate-500">{appeal.id} · {new Date(appeal.createdAt).toLocaleDateString('vi-VN')}</p>
                  <h3 className="mt-1 break-words font-semibold">{appeal.subjectName} · {appeal.currentScore} điểm</h3>
                </div>
                <StatusBadge status={appeal.status} />
                <button type="button" className="student-text-link" onClick={() => setSelectedId(appeal.id)} aria-label={`Xem chi tiết ${appeal.id}`}>Xem chi tiết</button>
              </li>
            ))}
          </ul>
        ) : (
          <EmptyState title="Bạn chưa có yêu cầu phúc khảo nào" description="Khi cần chấm lại điểm một môn học, gửi yêu cầu ở trên để theo dõi tiến độ tại đây." />
        )}
      </div>

      <GlassModal open={!!selected} title="Chi tiết yêu cầu phúc khảo" onClose={() => setSelectedId(null)}>
        {selected && (
          <div className="space-y-5">
            <div>
              <p className="break-all font-mono text-xs text-slate-500">{selected.id}</p>
              <h3 className="my-2 text-lg font-semibold">{selected.subjectName} · điểm hiện tại {selected.currentScore}</h3>
              <StatusBadge status={selected.status} />
            </div>
            <dl className="space-y-3 rounded-xl border border-slate-200 bg-white p-4 text-sm">
              <div><dt className="text-xs text-slate-500">Lý do</dt><dd className="mt-1 whitespace-pre-wrap [overflow-wrap:anywhere]">{selected.reason}</dd></div>
              <div><dt className="text-xs text-slate-500">Ngày gửi</dt><dd className="mt-1">{new Date(selected.createdAt).toLocaleString('vi-VN')}</dd></div>
            </dl>
            <ol className="flex flex-wrap gap-2 text-xs">
              {steps.map((step, index) => (
                <li
                  key={step.status}
                  className={`rounded-lg px-3 py-2 ${selected.status === step.status ? 'bg-blue-100 font-semibold text-blue-900' : index < stepOrder.indexOf(selected.status) ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-600'}`}
                  aria-current={selected.status === step.status ? 'step' : undefined}
                >
                  {index + 1}. {step.label}
                </li>
              ))}
            </ol>
            {selected.status !== 'RESOLVED' && (
              <GlassButton className="w-full" onClick={() => advance(owner, selected.id)}>
                Mô phỏng: {selected.status === 'WAITING' ? 'giảng viên tiếp nhận' : 'có kết quả'}
              </GlassButton>
            )}
            {selected.status === 'RESOLVED' && <p className="rounded-xl bg-green-50 p-3 text-sm text-green-900">{selected.resolution}</p>}
          </div>
        )}
      </GlassModal>
    </section>
  );
}
