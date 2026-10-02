import { GlassCard } from '../../components/GlassCard';
import { Banknote, FileText, Headset, Shield } from '../../components/Icons';
import { StatusBadge } from '../../components/StatusBadge';
import { useAuthStore } from '../../lib/auth-store';
import { useClassSectionStore } from './class-section-store';
import { useConductScoreStore } from './conduct-score-store';
import { useGradeAppealStore } from './grade-appeal-store';
import { useScholarshipStore } from './scholarship-store';
import { StaffPortalTabs } from './StaffPortalTabs';
import { requestOwner, useStudentStore } from './student-store';

function countBy<T extends string>(items: { status: T }[]) {
  return items.reduce<Record<string, number>>((acc, item) => { acc[item.status] = (acc[item.status] ?? 0) + 1; return acc; }, {});
}

export function OfficePortalPanel() {
  const user = useAuthStore((s) => s.user);
  const owner = requestOwner(user?.id);
  const requests = useStudentStore((s) => s.requests[owner] ?? []);
  const appeals = useGradeAppealStore((s) => s.appeals[owner] ?? []);
  const scholarshipApps = useScholarshipStore((s) => s.applications[owner] ?? []);
  const conductRecords = useConductScoreStore((s) => s.records[owner] ?? []);
  const evaluations = useClassSectionStore((s) => s.evaluations[owner] ?? []);

  const requestCounts = countBy(requests);
  const appealCounts = countBy(appeals);
  const scholarshipCounts = countBy(scholarshipApps);
  const currentConduct = conductRecords.find((record) => record.status !== 'PUBLISHED') ?? conductRecords.at(-1);

  const stats = [
    { label: 'Yêu cầu hỗ trợ', value: requests.length, icon: Headset, tone: 'bg-blue-50 text-blue-700', accent: 'bg-blue-500' },
    { label: 'Phúc khảo điểm', value: appeals.length, icon: FileText, tone: 'bg-amber-50 text-amber-800', accent: 'bg-amber-500' },
    { label: 'Hồ sơ học bổng', value: scholarshipApps.length, icon: Banknote, tone: 'bg-green-50 text-green-800', accent: 'bg-green-500' },
    { label: 'Lượt đánh giá GV', value: evaluations.length, icon: Shield, tone: 'bg-rose-50 text-rose-700', accent: 'bg-rose-500' },
  ];

  return (
    <section aria-labelledby="office-portal-heading" id="office-portal" className="space-y-7">
      <div className="student-section-heading">
        <div>
          <p className="student-eyebrow">Cổng demo · chuyển vai trò để xem thử</p>
          <h2 id="office-portal-heading">Cổng phòng ban</h2>
        </div>
      </div>
      <StaffPortalTabs />

      <div className="liquid-glass-card p-5 sm:p-6">
        <p className="text-xs text-slate-600">
          Số liệu dưới đây chỉ tổng hợp dữ liệu trên trình duyệt này (một sinh viên), không phải toàn trường. Khi có backend thật, trang này sẽ tổng hợp dữ liệu của tất cả sinh viên.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map(({ label, value, icon: Icon, tone, accent }) => (
          <GlassCard key={label} className="relative overflow-hidden">
            <span className={`mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl ${tone}`}><Icon /></span>
            <p className="text-sm text-slate-600">{label}</p>
            <p className="mt-1 text-3xl font-extrabold tracking-tight tabular-nums">{value}</p>
            <span className={`absolute right-6 bottom-0 left-6 h-0.5 rounded-full ${accent}`} aria-hidden="true" />
          </GlassCard>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="liquid-glass-card space-y-3 p-5 sm:p-6">
          <h3 className="font-semibold">Yêu cầu hỗ trợ theo trạng thái</h3>
          {Object.keys(requestCounts).length ? (
            <ul className="space-y-2 text-sm">{Object.entries(requestCounts).map(([status, count]) => <li key={status} className="flex items-center justify-between"><StatusBadge status={status} /><span className="tabular-nums">{count}</span></li>)}</ul>
          ) : <p className="text-sm text-slate-600">Chưa có yêu cầu nào.</p>}
        </div>
        <div className="liquid-glass-card space-y-3 p-5 sm:p-6">
          <h3 className="font-semibold">Phúc khảo điểm theo trạng thái</h3>
          {Object.keys(appealCounts).length ? (
            <ul className="space-y-2 text-sm">{Object.entries(appealCounts).map(([status, count]) => <li key={status} className="flex items-center justify-between"><StatusBadge status={status} /><span className="tabular-nums">{count}</span></li>)}</ul>
          ) : <p className="text-sm text-slate-600">Chưa có yêu cầu phúc khảo nào.</p>}
        </div>
        <div className="liquid-glass-card space-y-3 p-5 sm:p-6">
          <h3 className="font-semibold">Hồ sơ học bổng theo trạng thái</h3>
          {Object.keys(scholarshipCounts).length ? (
            <ul className="space-y-2 text-sm">{Object.entries(scholarshipCounts).map(([status, count]) => <li key={status} className="flex items-center justify-between"><StatusBadge status={status} /><span className="tabular-nums">{count}</span></li>)}</ul>
          ) : <p className="text-sm text-slate-600">Chưa có hồ sơ học bổng nào.</p>}
        </div>
        <div className="liquid-glass-card space-y-3 p-5 sm:p-6">
          <h3 className="font-semibold">Điểm rèn luyện hiện tại</h3>
          {currentConduct ? (
            <div className="flex items-center gap-3 text-sm"><StatusBadge status={currentConduct.status} /><span>{currentConduct.semester}</span></div>
          ) : <p className="text-sm text-slate-600">Chưa có dữ liệu.</p>}
        </div>
      </div>
    </section>
  );
}
