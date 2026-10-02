import { useState } from 'react';
import { Link } from 'react-router-dom';
import { EmptyState } from '../../components/EmptyState';
import { GlassButton } from '../../components/GlassButton';
import { GlassModal } from '../../components/GlassModal';
import { Heart } from '../../components/Icons';
import { useAuthStore } from '../../lib/auth-store';
import type { JobPosting } from './job-data';
import { jobPostings } from './job-data';
import { useJobStore } from './job-store';
import { normalizeSearch } from './student-mock-data';
import { requestOwner } from './student-store';
import { daysUntil } from './tuition-data';

const jobTypes: JobPosting['type'][] = ['Thực tập', 'Toàn thời gian', 'Bán thời gian'];

export function JobsPanel() {
  const user = useAuthStore((s) => s.user);
  const owner = requestOwner(user?.id);
  const saved = useJobStore((s) => s.saved[owner] ?? []);
  const storageError = useJobStore((s) => s.storageError);
  const toggleSave = useJobStore((s) => s.toggleSave);

  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'ALL' | JobPosting['type']>('ALL');
  const [savedOnly, setSavedOnly] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = jobPostings.filter((job) => {
    if (savedOnly && !saved.includes(job.id)) return false;
    if (typeFilter !== 'ALL' && job.type !== typeFilter) return false;
    if (!query) return true;
    return normalizeSearch(`${job.title} ${job.company} ${job.field} ${job.skills.join(' ')}`).includes(normalizeSearch(query));
  });
  const selected = jobPostings.find((job) => job.id === selectedId);

  return (
    <section aria-labelledby="jobs-heading" id="jobs" className="space-y-7">
      <div className="student-section-heading">
        <div>
          <p className="student-eyebrow">Cơ hội theo ngành, kỹ năng</p>
          <h2 id="jobs-heading">Việc làm &amp; thực tập</h2>
        </div>
        <Link to="/cv-builder" className="btn-liquid-glass text-xs">Tạo hồ sơ xin việc</Link>
      </div>

      <div className="liquid-glass-card p-5 sm:p-6">
        <p className="text-xs text-slate-600">Tin tuyển dụng mẫu — hệ thống chưa nối nguồn tin thật từ doanh nghiệp.</p>
        {storageError && <p role="alert" className="mt-2 text-sm text-red-700">{storageError}</p>}
      </div>

      <div className="grid gap-3 sm:grid-cols-[1fr_200px_auto]">
        <div>
          <label htmlFor="job-search" className="sr-only">Tìm việc làm, kỹ năng, công ty</label>
          <input id="job-search" className="form-input" placeholder="Tìm theo tên việc, công ty, kỹ năng…" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <div>
          <label htmlFor="job-type" className="sr-only">Lọc loại hình</label>
          <select id="job-type" className="form-input" value={typeFilter} onChange={(e) => setTypeFilter(e.target.value as typeof typeFilter)}>
            <option value="ALL">Mọi loại hình</option>
            {jobTypes.map((type) => <option key={type} value={type}>{type}</option>)}
          </select>
        </div>
        <GlassButton variant={savedOnly ? 'primary' : 'glass'} aria-pressed={savedOnly} onClick={() => setSavedOnly((v) => !v)}>
          <Heart className="h-4 w-4" />Đã lưu ({saved.length})
        </GlassButton>
      </div>

      {filtered.length ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {filtered.map((job) => {
            const isSaved = saved.includes(job.id);
            const left = daysUntil(job.deadline);
            return (
              <div key={job.id} className="liquid-glass-card space-y-3 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h3 className="font-semibold">{job.title}</h3>
                    <p className="text-sm text-slate-600">{job.company} · {job.location}</p>
                  </div>
                  <button
                    type="button"
                    aria-pressed={isSaved}
                    aria-label={isSaved ? `Bỏ lưu ${job.title}` : `Lưu ${job.title}`}
                    onClick={() => toggleSave(owner, job.id)}
                    className={`focus-ring flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${isSaved ? 'border-rose-300 bg-rose-50 text-rose-600' : 'border-slate-200 text-slate-400 hover:text-rose-500'}`}
                  >
                    <Heart className="h-4 w-4" fill={isSaved ? 'currentColor' : 'none'} />
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5 text-xs">
                  <span className="liquid-pill">{job.type}</span>
                  <span className="liquid-pill">{job.field}</span>
                  {job.salary && <span className="liquid-pill">{job.salary}</span>}
                </div>
                <p className="text-xs text-slate-500">Hạn ứng tuyển: còn {left > 0 ? `${left} ngày` : 'hôm nay'}</p>
                <GlassButton className="w-full" onClick={() => setSelectedId(job.id)}>Xem chi tiết</GlassButton>
              </div>
            );
          })}
        </div>
      ) : (
        <EmptyState title="Không tìm thấy tin phù hợp" description="Thử đổi từ khóa hoặc bỏ bớt bộ lọc." />
      )}

      <GlassModal open={!!selected} title={selected?.title ?? ''} onClose={() => setSelectedId(null)}>
        {selected && (
          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-600">{selected.company} · {selected.location}</p>
              <div className="mt-2 flex flex-wrap gap-1.5 text-xs">
                <span className="liquid-pill">{selected.type}</span>
                <span className="liquid-pill">{selected.field}</span>
                {selected.salary && <span className="liquid-pill">{selected.salary}</span>}
              </div>
            </div>
            <p className="text-sm whitespace-pre-wrap text-slate-700">{selected.description}</p>
            <div>
              <p className="field-label">Kỹ năng yêu cầu</p>
              <div className="flex flex-wrap gap-1.5">{selected.skills.map((skill) => <span key={skill} className="liquid-pill">{skill}</span>)}</div>
            </div>
            <div className="flex flex-wrap gap-2 border-t border-slate-100 pt-4">
              <Link to="/cv-builder" className="btn-liquid-glass btn-primary text-sm">Tạo hồ sơ xin việc</Link>
              <GlassButton onClick={() => toggleSave(owner, selected.id)}>
                <Heart className="h-4 w-4" fill={saved.includes(selected.id) ? 'currentColor' : 'none'} />
                {saved.includes(selected.id) ? 'Bỏ lưu tin' : 'Lưu tin'}
              </GlassButton>
            </div>
          </div>
        )}
      </GlassModal>
    </section>
  );
}
