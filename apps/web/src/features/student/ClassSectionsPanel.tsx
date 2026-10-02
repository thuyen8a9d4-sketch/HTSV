import { useState } from 'react';
import { GlassButton } from '../../components/GlassButton';
import { GlassModal } from '../../components/GlassModal';
import { Check, Mail, Phone } from '../../components/Icons';
import { useAuthStore } from '../../lib/auth-store';
import { classSections, evaluationCriteria } from './class-section-data';
import { useClassSectionStore } from './class-section-store';
import { requestOwner } from './student-store';

function RatingRow({ id, label, value, onChange }: { id: string; label: string; value: number; onChange: (value: number) => void }) {
  return (
    <div className="space-y-2">
      <p id={`${id}-label`} className="text-sm text-slate-700">{label}</p>
      <div className="flex gap-2" role="radiogroup" aria-labelledby={`${id}-label`}>
        {[1, 2, 3, 4, 5].map((score) => (
          <button
            key={score}
            type="button"
            role="radio"
            aria-checked={value === score}
            aria-label={`${score} trên 5`}
            onClick={() => onChange(score)}
            className={`flex h-10 w-10 items-center justify-center rounded-lg border text-sm font-semibold transition-colors ${value === score ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-blue-300'}`}
          >
            {score}
          </button>
        ))}
      </div>
    </div>
  );
}

export function ClassSectionsPanel() {
  const user = useAuthStore((s) => s.user);
  const owner = requestOwner(user?.id);
  const evaluations = useClassSectionStore((s) => s.evaluations[owner] ?? []);
  const storageError = useClassSectionStore((s) => s.storageError);
  const submitEvaluation = useClassSectionStore((s) => s.submitEvaluation);

  const [evalFor, setEvalFor] = useState<string | null>(null);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [comment, setComment] = useState('');
  const [notice, setNotice] = useState('');

  const activeSection = classSections.find((item) => item.id === evalFor);
  const canSubmit = activeSection !== undefined && evaluationCriteria.every((criterion) => (ratings[criterion.id] ?? 0) > 0);

  const openEval = (id: string) => {
    setEvalFor(id);
    setRatings({});
    setComment('');
  };

  return (
    <section aria-labelledby="class-sections-heading" id="class-sections" className="space-y-7">
      <div className="student-section-heading">
        <div>
          <p className="student-eyebrow">Liên hệ giảng viên · Nhóm lớp · Đánh giá cuối kỳ</p>
          <h2 id="class-sections-heading">Lớp học phần của tôi</h2>
        </div>
      </div>

      <div className="liquid-glass-card p-5 sm:p-6">
        <p className="text-xs text-slate-600">
          Danh sách mô phỏng theo thời khóa biểu hiện tại. Liên hệ giảng viên và link nhóm là dữ liệu mẫu, sẽ do giảng viên/nhà trường cập nhật khi có API lớp học phần chính thức.
        </p>
        {storageError && <p role="alert" className="mt-2 text-sm text-red-700">{storageError}</p>}
        {notice && <p role="status" className="mt-2 text-sm text-green-800">{notice}</p>}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {classSections.map((section) => {
          const evaluated = evaluations.some((item) => item.classSectionId === section.id);
          return (
            <div key={section.id} className="liquid-glass-card space-y-3 p-5">
              <div>
                <h3 className="font-semibold">{section.subject}</h3>
                <p className="text-sm text-slate-600">{section.lecturer}</p>
                <p className="mt-1 text-xs text-slate-500">{section.schedule} · {section.room}</p>
              </div>
              <div className="flex flex-wrap gap-2 text-xs">
                <a href={`tel:${section.lecturerPhone.replace(/\s/g, '')}`} className="liquid-pill"><Phone className="h-3.5 w-3.5" />{section.lecturerPhone}</a>
                <a href={`mailto:${section.lecturerEmail}`} className="liquid-pill"><Mail className="h-3.5 w-3.5" />{section.lecturerEmail}</a>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <a href={section.groupLink} target="_blank" rel="noopener noreferrer" className="btn-liquid-glass text-xs">Vào nhóm lớp</a>
                {evaluated ? (
                  <span className="liquid-pill border-green-200 bg-green-50 text-green-800"><Check className="h-3.5 w-3.5" />Đã đánh giá</span>
                ) : (
                  <GlassButton variant="ghost" className="text-xs" onClick={() => openEval(section.id)}>Đánh giá giảng viên</GlassButton>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <GlassModal open={!!activeSection} title="Đánh giá giảng viên (ẩn danh)" onClose={() => setEvalFor(null)}>
        {activeSection && (
          <div className="space-y-5">
            <div>
              <p className="font-semibold">{activeSection.subject}</p>
              <p className="text-sm text-slate-600">{activeSection.lecturer}</p>
            </div>
            <p className="text-xs text-slate-600">Đánh giá không gắn tên bạn khi tổng hợp cho khoa. Thiết bị này chỉ ghi nhớ trạng thái "Đã đánh giá" để tránh gửi trùng.</p>
            <div className="space-y-4">
              {evaluationCriteria.map((criterion) => (
                <RatingRow
                  key={criterion.id}
                  id={criterion.id}
                  label={criterion.label}
                  value={ratings[criterion.id] ?? 0}
                  onChange={(value) => setRatings((prev) => ({ ...prev, [criterion.id]: value }))}
                />
              ))}
            </div>
            <div>
              <label htmlFor="eval-comment" className="field-label">Nhận xét thêm (không bắt buộc)</label>
              <textarea id="eval-comment" className="form-input min-h-20" value={comment} onChange={(e) => setComment(e.target.value)} />
            </div>
            <GlassButton
              variant="primary"
              className="w-full"
              disabled={!canSubmit}
              onClick={() => {
                try {
                  submitEvaluation(owner, activeSection.id, ratings, comment.trim());
                  setNotice(`Đã gửi đánh giá cho ${activeSection.lecturer}.`);
                  setEvalFor(null);
                } catch (error) {
                  setNotice(error instanceof Error ? error.message : 'Không thể lưu đánh giá.');
                }
              }}
            >
              <Check className="h-4 w-4" />Gửi đánh giá
            </GlassButton>
          </div>
        )}
      </GlassModal>
    </section>
  );
}
