import { useState } from 'react';
import { GlassButton } from '../../components/GlassButton';
import { StatusBadge } from '../../components/StatusBadge';
import { useAuthStore } from '../../lib/auth-store';
import { classSections, evaluationCriteria } from './class-section-data';
import { useClassSectionStore } from './class-section-store';
import { useGradeAppealStore } from './grade-appeal-store';
import { StaffPortalTabs } from './StaffPortalTabs';
import { mockClassRoster } from './staff-mock-roster';
import { requestOwner } from './student-store';

export function LecturerPortalPanel() {
  const user = useAuthStore((s) => s.user);
  const owner = requestOwner(user?.id);
  const appeals = useGradeAppealStore((s) => s.appeals[owner] ?? []);
  const advanceAppeal = useGradeAppealStore((s) => s.advance);
  const evaluations = useClassSectionStore((s) => s.evaluations[owner] ?? []);

  const [lecturer, setLecturer] = useState(classSections[0].lecturer);
  const [attendance, setAttendance] = useState<Record<string, boolean>>(() => Object.fromEntries(mockClassRoster.map((student) => [student.studentCode, true])));
  const [notice, setNotice] = useState('');

  const section = classSections.find((item) => item.lecturer === lecturer) ?? classSections[0];
  const sectionAppeals = appeals.filter((appeal) => appeal.subjectName === section.subject);
  const sectionEvaluations = evaluations.filter((item) => item.classSectionId === section.id);
  const presentCount = Object.values(attendance).filter(Boolean).length;

  return (
    <section aria-labelledby="lecturer-portal-heading" id="lecturer-portal" className="space-y-7">
      <div className="student-section-heading">
        <div>
          <p className="student-eyebrow">Cổng demo · chuyển vai trò để xem thử</p>
          <h2 id="lecturer-portal-heading">Cổng giảng viên</h2>
        </div>
      </div>
      <StaffPortalTabs />

      <div className="liquid-glass-card p-5 sm:p-6">
        <p className="text-xs text-slate-600">
          Bản demo dùng chung dữ liệu đã có trên trình duyệt này (chưa có tài khoản giảng viên riêng). Phúc khảo và kết quả đánh giá bên dưới là dữ liệu thật bạn đã thao tác ở trang Phúc khảo điểm / Lớp học phần của tôi.
        </p>
      </div>

      <div className="liquid-glass-card space-y-2 p-5 sm:p-6">
        <label htmlFor="lecturer-select" className="field-label">Xem như giảng viên</label>
        <select id="lecturer-select" className="form-input" value={lecturer} onChange={(e) => setLecturer(e.target.value)}>
          {classSections.map((item) => <option key={item.id} value={item.lecturer}>{item.lecturer} · {item.subject}</option>)}
        </select>
        <p className="text-sm text-slate-600">Lớp phụ trách: <strong>{section.subject}</strong> · {section.schedule} · {section.room}</p>
      </div>

      <div className="liquid-glass-card space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-semibold">Điểm danh buổi học gần nhất</h3>
          <span className="text-xs text-slate-500">Có mặt {presentCount}/{mockClassRoster.length}</span>
        </div>
        <ul className="divide-y divide-slate-100">
          {mockClassRoster.map((student) => (
            <li key={student.studentCode} className="flex items-center justify-between gap-3 py-2.5">
              <div className="min-w-0">
                <p className="text-sm font-medium">{student.fullName}</p>
                <p className="text-xs text-slate-500">{student.studentCode}</p>
              </div>
              <button
                type="button"
                aria-pressed={attendance[student.studentCode]}
                onClick={() => setAttendance((prev) => ({ ...prev, [student.studentCode]: !prev[student.studentCode] }))}
                className={`focus-ring rounded-full border px-3 py-1 text-xs font-semibold ${attendance[student.studentCode] ? 'border-green-200 bg-green-50 text-green-800' : 'border-slate-200 bg-slate-100 text-slate-500'}`}
              >
                {attendance[student.studentCode] ? 'Có mặt' : 'Vắng'}
              </button>
            </li>
          ))}
        </ul>
        <GlassButton onClick={() => setNotice('Đã lưu điểm danh (demo, chưa đồng bộ hồ sơ sinh viên thật).')}>Lưu điểm danh</GlassButton>
        {notice && <p role="status" className="text-sm text-green-800">{notice}</p>}
      </div>

      <div className="liquid-glass-card space-y-4 p-5 sm:p-6">
        <h3 className="font-semibold">Phúc khảo điểm cần phản hồi</h3>
        {sectionAppeals.length ? (
          <ul className="divide-y divide-slate-100">
            {sectionAppeals.map((appeal) => (
              <li key={appeal.id} className="flex flex-wrap items-center justify-between gap-3 py-3">
                <div className="min-w-0">
                  <p className="text-sm font-medium">{appeal.id}</p>
                  <p className="text-xs text-slate-500">{new Date(appeal.createdAt).toLocaleDateString('vi-VN')} · {appeal.reason}</p>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={appeal.status} />
                  {appeal.status !== 'RESOLVED' && (
                    <GlassButton onClick={() => advanceAppeal(owner, appeal.id)}>
                      Phản hồi: {appeal.status === 'WAITING' ? 'tiếp nhận' : 'có kết quả'}
                    </GlassButton>
                  )}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-slate-600">Chưa có yêu cầu phúc khảo nào cho môn {section.subject}.</p>
        )}
      </div>

      <div className="liquid-glass-card space-y-4 p-5 sm:p-6">
        <h3 className="font-semibold">Kết quả đánh giá giảng viên</h3>
        {sectionEvaluations.length ? (
          <div className="space-y-3">
            <p className="text-xs text-slate-500">{sectionEvaluations.length} sinh viên đã đánh giá (ẩn danh)</p>
            {evaluationCriteria.map((criterion) => {
              const avg = sectionEvaluations.reduce((sum, item) => sum + (item.ratings[criterion.id] ?? 0), 0) / sectionEvaluations.length;
              return (
                <div key={criterion.id}>
                  <div className="flex items-baseline justify-between text-sm">
                    <span>{criterion.label}</span>
                    <span className="tabular-nums text-slate-500">{avg.toFixed(1)}/5</span>
                  </div>
                  <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                    <div className="h-full rounded-full bg-blue-600 dark:bg-blue-400" style={{ width: `${(avg / 5) * 100}%` }} />
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-slate-600">Chưa có sinh viên nào đánh giá lớp này.</p>
        )}
      </div>
    </section>
  );
}
