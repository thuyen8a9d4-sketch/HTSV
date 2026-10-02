import { useEffect, useState } from 'react';
import { GlassButton } from '../../components/GlassButton';
import { StatusBadge } from '../../components/StatusBadge';
import { EmptyState } from '../../components/EmptyState';
import { LoadingSkeleton } from '../../components/LoadingSkeleton';
import { Check } from '../../components/Icons';
import { useAuthStore } from '../../lib/auth-store';
import { requestOwner } from './student-store';
import { useConductScoreStore } from './conduct-score-store';
import { conductCriteriaGroups, conductMaxTotal, currentSemesterLabel, groupTotal, grandTotal, classifyConduct } from './conduct-score-data';
import type { ConductScoreMap, ConductStatus } from './student-types';

const steps: { status: ConductStatus; label: string }[] = [
  { status: 'DRAFT', label: 'Tự chấm' },
  { status: 'SUBMITTED', label: 'BCS duyệt' },
  { status: 'MONITOR_REVIEWED', label: 'Khoa duyệt' },
  { status: 'PUBLISHED', label: 'Công bố' },
];
const stepOrder: ConductStatus[] = ['DRAFT', 'SUBMITTED', 'MONITOR_REVIEWED', 'PUBLISHED'];

function clamp(value: number, max: number) {
  if (Number.isNaN(value)) return 0;
  return Math.min(Math.max(value, 0), max);
}

function ScoreTimeline({ status }: { status: ConductStatus }) {
  const activeIndex = status === 'RETURNED' ? 0 : stepOrder.indexOf(status);
  return (
    <ol className="flex flex-wrap gap-2 text-xs">
      {steps.map((step, index) => (
        <li
          key={step.status}
          className={`rounded-lg px-3 py-2 ${index === activeIndex ? 'bg-blue-100 font-semibold text-blue-900' : index < activeIndex ? 'bg-green-50 text-green-700' : 'bg-slate-100 text-slate-600'}`}
          aria-current={index === activeIndex ? 'step' : undefined}
        >
          {index + 1}. {step.label}
        </li>
      ))}
    </ol>
  );
}

function ScoreGroups({ scores, editable, onChange }: { scores: ConductScoreMap; editable: boolean; onChange?: (itemId: string, value: number) => void }) {
  return (
    <div className="space-y-4">
      {conductCriteriaGroups.map((group) => (
        <fieldset key={group.id} className="rounded-xl border border-slate-200 p-4">
          <legend className="px-1 text-sm font-semibold text-slate-800">{group.title}</legend>
          <div className="mt-2 space-y-3">
            {group.items.map((item) => (
              <div key={item.id} className="flex flex-wrap items-center justify-between gap-3">
                <label htmlFor={`score-${item.id}`} className="min-w-0 flex-1 text-sm text-slate-700">
                  {item.label} <span className="text-xs text-slate-400">(tối đa {item.maxScore})</span>
                </label>
                <input
                  id={`score-${item.id}`}
                  type="number"
                  inputMode="numeric"
                  className="form-input w-24 shrink-0 text-right tabular-nums"
                  min={0}
                  max={item.maxScore}
                  step={1}
                  value={scores[item.id] ?? 0}
                  disabled={!editable}
                  onChange={(e) => onChange?.(item.id, clamp(Number(e.target.value), item.maxScore))}
                />
              </div>
            ))}
          </div>
          <p className="mt-3 text-right text-xs font-medium text-slate-500">Nhóm: {groupTotal(scores, group)}/{group.maxScore}</p>
        </fieldset>
      ))}
    </div>
  );
}

function ReviewStage({
  roleLabel,
  sourceScores,
  notePlaceholder,
  primaryLabel,
  onPrimary,
  onReturn,
}: {
  roleLabel: string;
  sourceScores: ConductScoreMap;
  notePlaceholder: string;
  primaryLabel: string;
  onPrimary: (scores: ConductScoreMap, note: string) => void;
  onReturn: (note: string) => void;
}) {
  const [scores, setScores] = useState(sourceScores);
  const [note, setNote] = useState('');
  return (
    <div className="space-y-4">
      <p className="text-xs text-slate-600">Vai trò mô phỏng: <strong>{roleLabel}</strong>. Có thể điều chỉnh điểm trước khi quyết định.</p>
      <ScoreGroups scores={scores} editable onChange={(id, value) => setScores((prev) => ({ ...prev, [id]: value }))} />
      <div>
        <label htmlFor="review-note" className="field-label">Nhận xét của {roleLabel}</label>
        <textarea id="review-note" className="form-input min-h-24" value={note} onChange={(e) => setNote(e.target.value)} placeholder={notePlaceholder} />
      </div>
      <div className="flex flex-wrap gap-2">
        <GlassButton variant="primary" onClick={() => onPrimary(scores, note)}>
          <Check className="h-4 w-4" />{primaryLabel}
        </GlassButton>
        <GlassButton variant="ghost" className="text-red-700" disabled={!note.trim()} onClick={() => onReturn(note)}>
          Trả lại yêu cầu chỉnh sửa
        </GlassButton>
      </div>
    </div>
  );
}

export function ConductScorePanel() {
  const user = useAuthStore((s) => s.user);
  const owner = requestOwner(user?.id);
  const ensureCurrent = useConductScoreStore((s) => s.ensureCurrent);
  const records = useConductScoreStore((s) => s.records[owner] ?? []);
  const storageError = useConductScoreStore((s) => s.storageError);
  const saveDraft = useConductScoreStore((s) => s.saveDraft);
  const submit = useConductScoreStore((s) => s.submit);
  const monitorForward = useConductScoreStore((s) => s.monitorForward);
  const monitorReturn = useConductScoreStore((s) => s.monitorReturn);
  const facultyPublish = useConductScoreStore((s) => s.facultyPublish);
  const facultyReturn = useConductScoreStore((s) => s.facultyReturn);

  const [reviewMode, setReviewMode] = useState(false);
  const [notice, setNotice] = useState('');

  const current = records.find((record) => record.status !== 'PUBLISHED');
  const hasOpen = Boolean(current);

  useEffect(() => {
    if (!hasOpen) ensureCurrent(owner);
  }, [owner, hasOpen, ensureCurrent]);

  const published = [...records].filter((record) => record.status === 'PUBLISHED').sort((a, b) => b.semester.localeCompare(a.semester));
  const alreadyPublishedThisTerm = !current && records.some((record) => record.semester === currentSemesterLabel() && record.status === 'PUBLISHED');

  const editable = current?.status === 'DRAFT' || current?.status === 'RETURNED';
  const returnNote = current?.facultyNote || current?.monitorNote;

  return (
    <section aria-labelledby="conduct-heading" id="conduct-score" className="space-y-7">
      <div className="student-section-heading">
        <div>
          <p className="student-eyebrow">Tự chấm → Ban cán sự duyệt → Khoa công bố</p>
          <h2 id="conduct-heading">Điểm rèn luyện</h2>
        </div>
        {current && <StatusBadge status={current.status} />}
      </div>

      <div className="liquid-glass-card space-y-4 p-5 sm:p-6">
        <p className="text-xs text-slate-600">
          Phiếu mô phỏng · Chỉ lưu trên trình duyệt này{user ? '' : ' · Bạn đang dùng chế độ khách'}. Khung tiêu chí tham khảo theo Thông tư 16/2015/TT-BGDĐT —
          Phòng Công tác sinh viên cần xác nhận bản chính thức của trường trước khi áp dụng.
        </p>
        {storageError && <p role="alert" className="text-sm text-red-700">{storageError}</p>}
        {current && <ScoreTimeline status={current.status} />}
      </div>

      {!current ? (
        alreadyPublishedThisTerm ? (
          <div className="liquid-glass-card p-5 sm:p-6 text-sm text-slate-600">
            Điểm rèn luyện học kỳ này đã được Khoa công bố — xem kết quả trong mục Lịch sử bên dưới. Phiếu tự chấm học kỳ kế tiếp sẽ mở khi bước sang học kỳ mới.
          </div>
        ) : (
          <LoadingSkeleton />
        )
      ) : (
        <>
          {current.status === 'RETURNED' && returnNote && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800">
              <p className="font-semibold">Yêu cầu chỉnh sửa</p>
              <p className="mt-1 whitespace-pre-wrap">{returnNote}</p>
            </div>
          )}

          <div className="liquid-glass-card space-y-5 overflow-hidden p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="font-semibold">Phiếu tự đánh giá — {current.semester}</h3>
            </div>
            <ScoreGroups
              scores={current.selfScores}
              editable={editable}
              onChange={(itemId, value) => saveDraft(owner, current.semester, { ...current.selfScores, [itemId]: value }, current.selfNote)}
            />
            <div>
              <label htmlFor="self-note" className="field-label">Giải trình / minh chứng (không bắt buộc)</label>
              <textarea
                id="self-note"
                className="form-input min-h-24"
                value={current.selfNote}
                disabled={!editable}
                onChange={(e) => saveDraft(owner, current.semester, current.selfScores, e.target.value)}
                placeholder="Ví dụ: đã tham gia 3 hoạt động Đoàn trong học kỳ, đính kèm minh chứng khi được yêu cầu."
              />
            </div>
            <div className="flex items-center justify-between border-t border-slate-100 pt-4">
              <p className="text-sm font-semibold text-slate-700">Tổng điểm tự chấm</p>
              <p className="text-xl font-bold tabular-nums">
                {grandTotal(current.selfScores)}/{conductMaxTotal}{' '}
                <span className={`ml-1 text-sm font-semibold ${classifyConduct(grandTotal(current.selfScores)).style}`}>
                  {classifyConduct(grandTotal(current.selfScores)).label}
                </span>
              </p>
            </div>
            {editable && (
              <GlassButton
                variant="primary"
                className="w-full sm:w-auto"
                onClick={() => { submit(owner, current.semester); setNotice('Đã nộp phiếu tự chấm, chờ Ban cán sự duyệt.'); }}
              >
                <Check className="h-4 w-4" />Nộp cho Ban cán sự duyệt
              </GlassButton>
            )}
            {notice && <p role="status" className="text-sm text-green-800">{notice}</p>}
          </div>

          <div className="liquid-glass-card space-y-4 border border-dashed border-slate-300 p-5 sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs font-medium text-slate-500">
                Khu vực mô phỏng — chưa có tài khoản Ban cán sự/Khoa riêng, dùng để xem thử bước duyệt tiếp theo.
              </p>
              <GlassButton variant="ghost" aria-pressed={reviewMode} onClick={() => setReviewMode((value) => !value)}>
                {reviewMode ? 'Đóng xem thử duyệt' : 'Xem thử quy trình duyệt'}
              </GlassButton>
            </div>
            {reviewMode && (
              <>
                {current.status === 'SUBMITTED' && (
                  <ReviewStage
                    key={`${current.semester}-monitor`}
                    roleLabel="Ban cán sự lớp"
                    sourceScores={current.selfScores}
                    notePlaceholder="Ví dụ: đã kiểm tra, đồng ý chuyển khoa duyệt."
                    primaryLabel="Chuyển khoa duyệt"
                    onPrimary={(scores, note) => { monitorForward(owner, current.semester, scores, note); setNotice('Đã chuyển hồ sơ lên Khoa duyệt.'); }}
                    onReturn={(note) => { monitorReturn(owner, current.semester, note); setNotice('Đã trả sinh viên chỉnh sửa.'); }}
                  />
                )}
                {current.status === 'MONITOR_REVIEWED' && (
                  <ReviewStage
                    key={`${current.semester}-faculty`}
                    roleLabel="Khoa"
                    sourceScores={current.monitorScores ?? current.selfScores}
                    notePlaceholder="Ví dụ: đồng ý công bố điểm rèn luyện học kỳ này."
                    primaryLabel="Công bố điểm"
                    onPrimary={(scores, note) => { facultyPublish(owner, current.semester, scores, note); setNotice('Đã công bố điểm rèn luyện.'); }}
                    onReturn={(note) => { facultyReturn(owner, current.semester, note); setNotice('Đã trả hồ sơ về Ban cán sự/sinh viên.'); }}
                  />
                )}
                {(current.status === 'DRAFT' || current.status === 'RETURNED') && (
                  <p className="text-sm text-slate-600">Sinh viên chưa nộp, chưa có gì để duyệt.</p>
                )}
              </>
            )}
          </div>
        </>
      )}

      <section aria-labelledby="conduct-history-heading">
        <div className="student-section-heading">
          <div>
            <p className="student-eyebrow">Theo học kỳ</p>
            <h2 id="conduct-history-heading">Lịch sử điểm rèn luyện</h2>
          </div>
        </div>
        <div className="liquid-glass-card overflow-hidden">
          {published.length ? (
            <ul className="divide-y divide-slate-100">
              {published.map((record) => {
                const total = grandTotal(record.facultyScores ?? record.monitorScores ?? record.selfScores);
                const classification = classifyConduct(total);
                return (
                  <li key={record.semester} className="flex flex-wrap items-center justify-between gap-3 p-5">
                    <div className="min-w-0">
                      <p className="font-semibold">{record.semester}</p>
                      <p className="text-xs text-slate-500">
                        Công bố {record.publishedAt ? new Date(record.publishedAt).toLocaleDateString('vi-VN') : ''}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-lg font-bold tabular-nums">{total}/{conductMaxTotal}</span>
                      <span className={`text-sm font-semibold ${classification.style}`}>{classification.label}</span>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <EmptyState title="Chưa có học kỳ nào được công bố" description="Sau khi Khoa công bố điểm, kết quả từng học kỳ sẽ hiện ở đây." />
          )}
        </div>
      </section>
    </section>
  );
}
