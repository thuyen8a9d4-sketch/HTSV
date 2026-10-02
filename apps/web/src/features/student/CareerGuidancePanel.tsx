import { useState } from 'react';
import { careerArticles } from './career-guidance-data';

export function CareerGuidancePanel() {
  const [fieldFilter, setFieldFilter] = useState('ALL');
  const fields = Array.from(new Set(careerArticles.map((article) => article.field)));
  const filtered = fieldFilter === 'ALL' ? careerArticles : careerArticles.filter((article) => article.field === fieldFilter);

  return (
    <section aria-labelledby="career-guidance-heading" id="career-guidance" className="space-y-7">
      <div className="student-section-heading">
        <div>
          <p className="student-eyebrow">Kỹ năng · Chứng chỉ · Xu hướng tuyển dụng</p>
          <h2 id="career-guidance-heading">Hướng nghiệp</h2>
        </div>
      </div>

      <div className="liquid-glass-card p-5 sm:p-6">
        <p className="text-xs text-slate-600">
          Nội dung mẫu do admin đăng — bản chính thức sẽ tổng hợp từ trang hướng nghiệp hiện có của trường.
        </p>
      </div>

      <div className="flex flex-wrap gap-2" role="group" aria-label="Lọc theo ngành">
        <button type="button" aria-pressed={fieldFilter === 'ALL'} onClick={() => setFieldFilter('ALL')} className={`focus-ring rounded-full border px-3 py-1.5 text-xs font-semibold ${fieldFilter === 'ALL' ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-200 text-slate-600'}`}>Tất cả ngành</button>
        {fields.map((field) => (
          <button key={field} type="button" aria-pressed={fieldFilter === field} onClick={() => setFieldFilter(field)} className={`focus-ring rounded-full border px-3 py-1.5 text-xs font-semibold ${fieldFilter === field ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-200 text-slate-600'}`}>{field}</button>
        ))}
      </div>

      <div className="space-y-4">
        {filtered.map((article) => (
          <details key={article.id} className="liquid-glass-card overflow-hidden p-5 sm:p-6">
            <summary className="cursor-pointer">
              <span className="liquid-pill mb-2">{article.field}</span>
              <span className="mt-1 block font-semibold">{article.title}</span>
              <span className="mt-1 block text-sm text-slate-600">{article.summary}</span>
            </summary>
            <div className="mt-4 space-y-2 border-t border-slate-100 pt-4 text-sm text-slate-700">
              {article.body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
