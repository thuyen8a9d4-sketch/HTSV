import { Link } from 'react-router-dom';
import { academicRecord } from './academic-record-data';
import { developmentPaths } from './development-path-data';
import { computeSkillMap } from './skill-map-data';

function SkillBar({ name, score, courseCount }: { name: string; score: number; courseCount: number }) {
  const tone = score >= 75 ? 'bg-green-500 dark:bg-green-400' : score >= 50 ? 'bg-blue-600 dark:bg-blue-400' : 'bg-amber-500 dark:bg-amber-400';
  return (
    <div>
      <div className="flex items-baseline justify-between text-sm">
        <span className="font-medium text-slate-700 dark:text-slate-200">{name}</span>
        <span className="tabular-nums text-slate-500">{score}/100 · {courseCount} môn</span>
      </div>
      <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700" role="progressbar" aria-valuenow={score} aria-valuemin={0} aria-valuemax={100} aria-label={name}>
        <div className={`h-full rounded-full ${tone}`} style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

export function PersonalPathPanel() {
  const skillMap = computeSkillMap();
  const path = developmentPaths.find((item) => item.id === 'lap-trinh-vien-moi-ra-truong') ?? developmentPaths[0];
  const currentStageIndex = Math.min(path.milestones.length - 1, Math.max(0, Math.ceil(academicRecord.length / 2) - 1));

  return (
    <section aria-labelledby="personal-path-heading" id="personal-path" className="space-y-7">
      <div className="student-section-heading">
        <div>
          <p className="student-eyebrow">Trợ lý AI cá nhân hóa</p>
          <h2 id="personal-path-heading">Bản đồ kỹ năng &amp; Lộ trình cá nhân</h2>
        </div>
      </div>

      <div className="liquid-glass-card p-5 sm:p-6">
        <p className="text-xs text-slate-600">
          Tính từ bảng điểm mẫu hiện tại của bạn — khi hệ thống nối dữ liệu điểm thật, Trợ lý AI sẽ tự cập nhật theo đúng kết quả học tập.
        </p>
      </div>

      <div className="liquid-glass-card space-y-5 p-5 sm:p-6">
        <h3 className="font-semibold">Bản đồ kỹ năng</h3>
        {skillMap.length ? (
          <div className="space-y-4">{skillMap.map((skill) => <SkillBar key={skill.name} {...skill} />)}</div>
        ) : (
          <p className="text-sm text-slate-600">Chưa có đủ dữ liệu điểm để tính bản đồ kỹ năng.</p>
        )}
      </div>

      <div className="liquid-glass-card space-y-4 p-5 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className="font-semibold">Lộ trình cá nhân đề xuất: {path.name}</h3>
          <Link to="/development-path" className="student-text-link">Xem các lộ trình mẫu khác</Link>
        </div>
        <ol className="space-y-5 border-l-2 border-slate-200 pl-5 dark:border-slate-700">
          {path.milestones.map((milestone, index) => {
            const state = index < currentStageIndex ? 'done' : index === currentStageIndex ? 'current' : 'upcoming';
            return (
              <li key={milestone.stage} className="relative">
                <span
                  className={`absolute top-1 -left-[25px] h-3 w-3 rounded-full border-2 bg-white dark:bg-slate-900 ${state === 'done' ? 'border-green-600' : state === 'current' ? 'border-blue-600' : 'border-slate-300 dark:border-slate-600'}`}
                  aria-hidden="true"
                />
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[11px] font-bold tracking-wider uppercase text-slate-500">{milestone.stage}</p>
                  {state === 'done' && <span className="liquid-pill border-green-200 bg-green-50 text-green-800">Đã qua</span>}
                  {state === 'current' && <span className="liquid-pill border-blue-200 bg-blue-50 text-blue-800">Đang ở đây</span>}
                </div>
                <p className="mt-0.5 font-semibold">{milestone.title}</p>
                <p className="mt-1 text-sm text-slate-600">{milestone.description}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
