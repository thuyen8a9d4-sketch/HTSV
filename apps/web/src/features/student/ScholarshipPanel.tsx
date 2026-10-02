import { useState } from 'react';
import { GlassButton } from '../../components/GlassButton';
import { StatusBadge } from '../../components/StatusBadge';
import { useAuthStore } from '../../lib/auth-store';
import { academicRecord, cumulativeGpa4 } from './academic-record-data';
import { scholarships } from './scholarship-data';
import { useScholarshipStore } from './scholarship-store';
import { requestOwner } from './student-store';
import { daysUntil } from './tuition-data';

export function ScholarshipPanel() {
  const user = useAuthStore((s) => s.user);
  const owner = requestOwner(user?.id);
  const applications = useScholarshipStore((s) => s.applications[owner] ?? []);
  const storageError = useScholarshipStore((s) => s.storageError);
  const apply = useScholarshipStore((s) => s.apply);
  const decide = useScholarshipStore((s) => s.decide);

  const [noteDrafts, setNoteDrafts] = useState<Record<string, string>>({});
  const [notice, setNotice] = useState('');

  const cumGpa = cumulativeGpa4(academicRecord.length - 1);

  return (
    <section aria-labelledby="scholarship-heading" id="scholarship" className="space-y-7">
      <div className="student-section-heading">
        <div>
          <p className="student-eyebrow">Kiểm tra điều kiện · Nộp hồ sơ · Theo dõi</p>
          <h2 id="scholarship-heading">Học bổng</h2>
        </div>
      </div>

      <div className="liquid-glass-card space-y-1 p-5 sm:p-6">
        <p className="text-xs text-slate-600">Hồ sơ mô phỏng · Chỉ lưu trên trình duyệt này{user ? '' : ' · Bạn đang dùng chế độ khách'}.</p>
        <p className="text-sm">GPA tích lũy hiện tại dùng để đối chiếu điều kiện: <strong className="tabular-nums">{cumGpa.toFixed(2)}/4.0</strong> (lấy từ trang Bảng điểm)</p>
        {storageError && <p role="alert" className="text-sm text-red-700">{storageError}</p>}
        {notice && <p role="status" className="text-sm text-green-800">{notice}</p>}
      </div>

      <div className="grid gap-4">
        {scholarships.map((scholarship) => {
          const application = applications.find((item) => item.scholarshipId === scholarship.id);
          const eligible = scholarship.minGpa === undefined ? null : cumGpa >= scholarship.minGpa;
          const deadlineDays = daysUntil(scholarship.deadline);
          return (
            <div key={scholarship.id} className="liquid-glass-card space-y-3 p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-semibold">{scholarship.name}</h3>
                  <p className="text-sm text-slate-600">{scholarship.amount.toLocaleString('vi-VN')} đ · Hạn nộp còn {deadlineDays} ngày</p>
                </div>
                {eligible === true && <span className="liquid-pill border-green-200 bg-green-50 text-green-800">Đủ điều kiện GPA</span>}
                {eligible === false && <span className="liquid-pill border-red-200 bg-red-50 text-red-700">Chưa đủ GPA tối thiểu {scholarship.minGpa?.toFixed(1)}</span>}
              </div>
              <ul className="list-disc space-y-1 pl-5 text-sm text-slate-600">
                {scholarship.requirements.map((requirement) => <li key={requirement}>{requirement}</li>)}
              </ul>
              {application ? (
                <div className="flex flex-wrap items-center gap-3 border-t border-slate-100 pt-3">
                  <StatusBadge status={application.status} />
                  <span className="text-xs text-slate-500">Nộp ngày {new Date(application.submittedAt).toLocaleDateString('vi-VN')}</span>
                  {application.status === 'PENDING' && (
                    <GlassButton
                      onClick={() => {
                        decide(owner, scholarship.id, eligible === false ? 'REJECTED' : 'APPROVED');
                        setNotice(`Có kết quả xét duyệt cho ${scholarship.name}.`);
                      }}
                    >
                      Mô phỏng: có kết quả xét duyệt
                    </GlassButton>
                  )}
                </div>
              ) : (
                <div className="space-y-2 border-t border-slate-100 pt-3">
                  <label htmlFor={`note-${scholarship.id}`} className="field-label">Ghi chú hồ sơ (không bắt buộc)</label>
                  <textarea
                    id={`note-${scholarship.id}`}
                    className="form-input min-h-16"
                    value={noteDrafts[scholarship.id] ?? ''}
                    onChange={(e) => setNoteDrafts((prev) => ({ ...prev, [scholarship.id]: e.target.value }))}
                    placeholder="Ví dụ: đính kèm minh chứng hoàn cảnh khó khăn khi nộp bản giấy."
                  />
                  <GlassButton
                    variant="primary"
                    onClick={() => {
                      try {
                        apply(owner, scholarship.id, (noteDrafts[scholarship.id] ?? '').trim());
                        setNotice(`Đã nộp hồ sơ ${scholarship.name}.`);
                      } catch (error) {
                        setNotice(error instanceof Error ? error.message : 'Không thể lưu hồ sơ.');
                      }
                    }}
                  >
                    Nộp hồ sơ
                  </GlassButton>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
