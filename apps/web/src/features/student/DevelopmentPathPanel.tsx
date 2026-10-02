import { developmentPaths } from './development-path-data';

export function DevelopmentPathPanel() {
  return (
    <section aria-labelledby="development-path-heading" id="development-path" className="space-y-7">
      <div className="student-section-heading">
        <div>
          <p className="student-eyebrow">Lộ trình mẫu để tham khảo</p>
          <h2 id="development-path-heading">Lộ trình phát triển</h2>
        </div>
      </div>

      <div className="liquid-glass-card p-5 sm:p-6">
        <p className="text-xs text-slate-600">
          Đây là lộ trình mẫu mang tính tham khảo chung, chưa cá nhân hóa theo kết quả học tập của bạn. Lộ trình cá nhân hóa bằng Trợ lý AI sẽ dùng các mốc này làm khung.
        </p>
      </div>

      <div className="space-y-6">
        {developmentPaths.map((path) => (
          <div key={path.id} className="liquid-glass-card p-5 sm:p-6">
            <h3 className="font-semibold">{path.name}</h3>
            <p className="mt-1 text-sm text-slate-600">{path.summary}</p>
            <ol className="mt-5 space-y-5 border-l-2 border-slate-200 pl-5 dark:border-slate-700">
              {path.milestones.map((milestone) => (
                <li key={milestone.stage} className="relative">
                  <span className="absolute top-1 -left-[25px] h-3 w-3 rounded-full border-2 border-blue-600 bg-white dark:bg-slate-900" aria-hidden="true" />
                  <p className="text-[11px] font-bold tracking-wider text-blue-700 uppercase dark:text-blue-400">{milestone.stage}</p>
                  <p className="mt-0.5 font-semibold">{milestone.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{milestone.description}</p>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </section>
  );
}
