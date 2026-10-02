import { GlassCard } from '../../components/GlassCard';
import { BookOpen, Compass, GraduationCap } from '../../components/Icons';
import {
  academicRecord,
  courseRisk,
  cumulativeCredits,
  cumulativeGpa4,
  scoreToLetter,
  semesterGpa4,
  totalProgramCredits,
} from './academic-record-data';

const maxGpa = 4;
const chartW = 320;
const chartH = 180;
const padL = 30;
const padR = 12;
const padT = 22;
const padB = 26;
const plotW = chartW - padL - padR;
const plotH = chartH - padT - padB;

function yFor(gpa: number) {
  return padT + plotH - (gpa / maxGpa) * plotH;
}

function GpaChart() {
  const bars = academicRecord.map((semester) => ({
    full: semester.semester,
    label: semester.semester.replace('Học kỳ ', 'HK').replace(' · ', ' '),
    gpa: semesterGpa4(semester),
  }));
  const slot = plotW / bars.length;
  const barW = Math.min(44, slot * 0.5);

  return (
    <svg viewBox={`0 0 ${chartW} ${chartH}`} role="img" aria-label={`GPA hệ 4 theo học kỳ: ${bars.map((b) => `${b.full} ${b.gpa.toFixed(2)}`).join(', ')}`} className="h-auto w-full max-w-sm">
      {[0, 2, 4].map((mark) => (
        <g key={mark}>
          <line
            x1={padL} x2={chartW - padR} y1={yFor(mark)} y2={yFor(mark)}
            className={mark === 2 ? 'stroke-amber-400 dark:stroke-amber-500' : 'stroke-slate-200 dark:stroke-slate-700'}
            strokeDasharray={mark === 2 ? '4 3' : undefined}
            strokeWidth={1}
          />
          <text x={padL - 6} y={yFor(mark) + 3} textAnchor="end" className="fill-slate-400 text-[9px] dark:fill-slate-500">{mark.toFixed(1)}</text>
        </g>
      ))}
      <text x={chartW - padR} y={yFor(2) - 4} textAnchor="end" className="fill-amber-600 text-[9px] dark:fill-amber-400">Ngưỡng tối thiểu 2.0</text>
      {bars.map((bar, index) => {
        const cx = padL + slot * index + slot / 2;
        const barHeight = (bar.gpa / maxGpa) * plotH;
        const y = padT + plotH - barHeight;
        const risky = bar.gpa < 2;
        return (
          <g key={bar.full}>
            <title>{`${bar.full}: GPA ${bar.gpa.toFixed(2)}/4.0`}</title>
            <rect x={cx - barW / 2} y={y} width={barW} height={Math.max(barHeight, 2)} rx={4} className={risky ? 'fill-amber-500 dark:fill-amber-400' : 'fill-blue-600 dark:fill-blue-400'} />
            <text x={cx} y={y - 6} textAnchor="middle" className="fill-slate-700 text-[11px] font-semibold tabular-nums dark:fill-slate-200">{bar.gpa.toFixed(2)}</text>
            <text x={cx} y={chartH - 8} textAnchor="middle" className="fill-slate-500 text-[10px] dark:fill-slate-400">{bar.label}</text>
          </g>
        );
      })}
    </svg>
  );
}

export function AcademicRecordPanel() {
  const latestIndex = academicRecord.length - 1;
  const cumGpa = cumulativeGpa4(latestIndex);
  const cumCredits = cumulativeCredits(latestIndex);
  const progressPct = Math.min(100, Math.round((cumCredits / totalProgramCredits) * 100));

  return (
    <section aria-labelledby="transcript-heading" id="academic-record" className="space-y-7">
      <div className="student-section-heading">
        <div>
          <p className="student-eyebrow">GPA · Tín chỉ · Tiến độ tốt nghiệp</p>
          <h2 id="transcript-heading">Bảng điểm</h2>
        </div>
      </div>

      <div className="liquid-glass-card p-5 sm:p-6">
        <p className="text-xs text-slate-600">
          Dữ liệu mẫu vì hệ thống chưa nối bảng điểm thật. Thang quy đổi điểm chữ/hệ 4 chỉ mang tính tham khảo — Phòng Đào tạo cần xác nhận bảng chính thức.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <GlassCard className="relative overflow-hidden">
          <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700 dark:bg-blue-500/15 dark:text-blue-300"><GraduationCap /></span>
          <p className="text-sm text-slate-600">GPA tích lũy (hệ 4)</p>
          <p className="mt-1 text-3xl font-extrabold tracking-tight tabular-nums">{cumGpa.toFixed(2)}</p>
          <span className="absolute right-6 bottom-0 left-6 h-0.5 rounded-full bg-blue-500" aria-hidden="true" />
        </GlassCard>
        <GlassCard className="relative overflow-hidden">
          <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-50 text-cyan-800 dark:bg-cyan-500/15 dark:text-cyan-300"><BookOpen /></span>
          <p className="text-sm text-slate-600">Tín chỉ tích lũy</p>
          <p className="mt-1 text-3xl font-extrabold tracking-tight tabular-nums">{cumCredits}<span className="text-base font-semibold text-slate-400">/{totalProgramCredits}</span></p>
          <span className="absolute right-6 bottom-0 left-6 h-0.5 rounded-full bg-cyan-500" aria-hidden="true" />
        </GlassCard>
        <GlassCard className="relative overflow-hidden">
          <span className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300"><Compass /></span>
          <p className="text-sm text-slate-600">Tiến độ tốt nghiệp</p>
          <p className="mt-1 text-3xl font-extrabold tracking-tight tabular-nums">{progressPct}%</p>
          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700" role="progressbar" aria-valuenow={progressPct} aria-valuemin={0} aria-valuemax={100} aria-label="Tiến độ tốt nghiệp">
            <div className="h-full rounded-full bg-amber-500 dark:bg-amber-400" style={{ width: `${progressPct}%` }} />
          </div>
        </GlassCard>
      </div>

      <div className="liquid-glass-card space-y-4 p-5 sm:p-6">
        <h3 className="font-semibold">GPA theo học kỳ</h3>
        <GpaChart />
        <div className="table-scroll">
          <table className="data-table">
            <thead><tr><th scope="col">Học kỳ</th><th scope="col">GPA hệ 4</th><th scope="col">Tín chỉ</th></tr></thead>
            <tbody>
              {academicRecord.map((semester) => (
                <tr key={semester.semester}>
                  <td>{semester.semester}</td>
                  <td className="tabular-nums">{semesterGpa4(semester).toFixed(2)}</td>
                  <td className="tabular-nums">{semester.courses.reduce((sum, course) => sum + course.credits, 0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="space-y-4">
        {academicRecord.map((semester, index) => (
          <details key={semester.semester} open={index === academicRecord.length - 1} className="liquid-glass-card overflow-hidden p-5 sm:p-6">
            <summary className="cursor-pointer font-semibold">{semester.semester} <span className="ml-2 text-sm font-normal text-slate-500">GPA {semesterGpa4(semester).toFixed(2)}/4.0</span></summary>
            <div className="table-scroll mt-4">
              <table className="data-table">
                <thead><tr><th scope="col">Môn học</th><th scope="col">Tín chỉ</th><th scope="col">Điểm 10</th><th scope="col">Điểm chữ</th><th scope="col">Trạng thái</th></tr></thead>
                <tbody>
                  {semester.courses.map((course) => {
                    const { letter } = scoreToLetter(course.score10);
                    const risk = courseRisk(course.score10);
                    return (
                      <tr key={course.name}>
                        <td>{course.name}</td>
                        <td className="tabular-nums">{course.credits}</td>
                        <td className="tabular-nums">{course.score10.toFixed(1)}</td>
                        <td>{letter}</td>
                        <td>
                          {risk === 'fail' && <span className="liquid-pill border-red-200 bg-red-50 text-red-700">Không đạt</span>}
                          {risk === 'warning' && <span className="liquid-pill border-amber-200 bg-amber-50 text-amber-800">Cảnh báo</span>}
                          {!risk && <span className="text-xs text-slate-400">—</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
