import { useState } from 'react';
import { StatusBadge } from '../../components/StatusBadge';
import { useAuthStore } from '../../lib/auth-store';
import { academicRecord, courseRisk, cumulativeCredits, cumulativeGpa4, totalProgramCredits } from './academic-record-data';
import { useConductScoreStore } from './conduct-score-store';
import { scholarships } from './scholarship-data';
import { useScholarshipStore } from './scholarship-store';
import { StaffPortalTabs } from './StaffPortalTabs';
import { mockAdvisees } from './staff-mock-roster';
import { requestOwner } from './student-store';

export function AdvisorPortalPanel() {
  const user = useAuthStore((s) => s.user);
  const owner = requestOwner(user?.id);
  const conductRecords = useConductScoreStore((s) => s.records[owner] ?? []);
  const scholarshipApps = useScholarshipStore((s) => s.applications[owner] ?? []);

  const latestSemester = academicRecord.at(-1)!;
  const realGpa = cumulativeGpa4(academicRecord.length - 1);
  const realCredits = cumulativeCredits(academicRecord.length - 1);
  const realProgress = Math.min(100, Math.round((realCredits / totalProgramCredits) * 100));
  const riskyCourses = latestSemester.courses.filter((course) => courseRisk(course.score10));

  const roster = [
    { id: 'me', studentCode: '233880', fullName: user?.fullName || 'Bạn (tài khoản đang đăng nhập)', gpa4: realGpa, creditsEarned: realCredits, atRisk: riskyCourses.length > 0, isReal: true },
    ...mockAdvisees.map((advisee) => ({ ...advisee, isReal: false })),
  ];

  const [selectedId, setSelectedId] = useState(roster[0].id);
  const selected = roster.find((row) => row.id === selectedId) ?? roster[0];
  const currentConduct = conductRecords.find((record) => record.status !== 'PUBLISHED') ?? conductRecords.at(-1);

  return (
    <section aria-labelledby="advisor-portal-heading" id="advisor-portal" className="space-y-7">
      <div className="student-section-heading">
        <div>
          <p className="student-eyebrow">Cổng demo · chuyển vai trò để xem thử</p>
          <h2 id="advisor-portal-heading">Cổng cố vấn học tập</h2>
        </div>
      </div>
      <StaffPortalTabs />

      <div className="liquid-glass-card p-5 sm:p-6">
        <p className="text-xs text-slate-600">
          Danh sách sinh viên phụ trách phần lớn là dữ liệu mẫu. Riêng hồ sơ đầu tiên lấy đúng dữ liệu thật (GPA, điểm rèn luyện, học bổng) từ các trang bạn đã dùng trong phiên này.
        </p>
      </div>

      <div className="grid gap-5 lg:grid-cols-[300px_1fr]">
        <div className="liquid-glass-card overflow-hidden lg:self-start">
          <ul className="divide-y divide-slate-100">
            {roster.map((row) => (
              <li key={row.id}>
                <button
                  type="button"
                  onClick={() => setSelectedId(row.id)}
                  aria-current={selected.id === row.id ? 'true' : undefined}
                  className={`flex w-full items-center justify-between gap-3 p-4 text-left ${selected.id === row.id ? 'bg-blue-50 dark:bg-blue-500/10' : ''}`}
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold">{row.fullName}</p>
                    <p className="text-xs text-slate-500">{row.studentCode} · GPA {row.gpa4.toFixed(2)}</p>
                  </div>
                  {row.atRisk && <span className="liquid-pill border-red-200 bg-red-50 text-red-700">Cảnh báo</span>}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <div className="liquid-glass-card p-5 sm:p-6">
            <h3 className="font-semibold">{selected.fullName}</h3>
            <p className="text-sm text-slate-500">{selected.studentCode}</p>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-xs text-slate-500">GPA tích lũy</p>
                <p className="text-xl font-bold tabular-nums">{selected.gpa4.toFixed(2)}/4.0</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Tín chỉ tích lũy</p>
                <p className="text-xl font-bold tabular-nums">{selected.creditsEarned}/{totalProgramCredits}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Tiến độ tốt nghiệp</p>
                <p className="text-xl font-bold tabular-nums">{selected.isReal ? realProgress : Math.min(100, Math.round((selected.creditsEarned / totalProgramCredits) * 100))}%</p>
              </div>
            </div>
          </div>

          {selected.isReal ? (
            <>
              <div className="liquid-glass-card space-y-3 p-5 sm:p-6">
                <h3 className="font-semibold">Môn có nguy cơ học kỳ gần nhất</h3>
                {riskyCourses.length ? (
                  <ul className="space-y-1 text-sm">
                    {riskyCourses.map((course) => <li key={course.name}>{course.name} · {course.score10.toFixed(1)} điểm</li>)}
                  </ul>
                ) : (
                  <p className="text-sm text-slate-600">Không có môn nào trong diện cảnh báo.</p>
                )}
              </div>
              <div className="liquid-glass-card space-y-2 p-5 sm:p-6">
                <h3 className="font-semibold">Điểm rèn luyện</h3>
                {currentConduct ? (
                  <div className="flex items-center gap-3">
                    <StatusBadge status={currentConduct.status} />
                    <span className="text-sm text-slate-600">{currentConduct.semester}</span>
                  </div>
                ) : (
                  <p className="text-sm text-slate-600">Chưa có dữ liệu điểm rèn luyện.</p>
                )}
              </div>
              <div className="liquid-glass-card space-y-2 p-5 sm:p-6">
                <h3 className="font-semibold">Hồ sơ học bổng</h3>
                {scholarshipApps.length ? (
                  <ul className="space-y-2">
                    {scholarshipApps.map((application) => {
                      const scholarship = scholarships.find((item) => item.id === application.scholarshipId);
                      return (
                        <li key={application.scholarshipId} className="flex items-center justify-between gap-3 text-sm">
                          <span>{scholarship?.name ?? application.scholarshipId}</span>
                          <StatusBadge status={application.status} />
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <p className="text-sm text-slate-600">Chưa nộp hồ sơ học bổng nào.</p>
                )}
              </div>
            </>
          ) : (
            <div className="liquid-glass-card p-5 sm:p-6">
              <p className="text-sm text-slate-600">Đây là sinh viên mẫu — chỉ có số liệu tổng quan, chưa có chi tiết vì không phải dữ liệu thật trên trình duyệt này.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
