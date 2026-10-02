import { GlassButton } from '../../components/GlassButton';
import { useAuthStore } from '../../lib/auth-store';
import { requestOwner } from './student-store';
import { emptyCvDraft, useCvStore } from './cv-store';
import type { CvTemplate } from './cv-store';

export function CvBuilderPanel() {
  const user = useAuthStore((s) => s.user);
  const owner = requestOwner(user?.id);
  const stored = useCvStore((s) => s.drafts[owner]);
  const storageError = useCvStore((s) => s.storageError);
  const save = useCvStore((s) => s.save);
  const draft = stored ?? emptyCvDraft(user?.fullName ?? '', user?.email ?? '');
  const update = (patch: Partial<typeof draft>) => save(owner, { ...draft, ...patch });

  const skillList = draft.skills.split(',').map((s) => s.trim()).filter(Boolean);
  const experienceLines = draft.experience.split('\n').map((s) => s.trim()).filter(Boolean);

  return (
    <section aria-labelledby="cv-heading" id="cv-builder" className="space-y-7">
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #cv-print-area, #cv-print-area * { visibility: visible; }
          #cv-print-area { position: absolute; inset: 0; width: 100%; padding: 0; margin: 0; box-shadow: none; border: 0; }
        }
      `}</style>

      <div className="student-section-heading">
        <div>
          <p className="student-eyebrow">Nhiều mẫu · Xuất PDF bằng trình duyệt</p>
          <h2 id="cv-heading">Trình tạo hồ sơ xin việc</h2>
        </div>
      </div>

      <div className="liquid-glass-card p-5 sm:p-6">
        <p className="text-xs text-slate-600">
          Nội dung được lưu trên trình duyệt này. Bấm "In / Lưu PDF" để mở hộp thoại in của trình duyệt — chọn "Lưu dưới dạng PDF" ở đó để tải tệp.
        </p>
        {storageError && <p role="alert" className="mt-2 text-sm text-red-700">{storageError}</p>}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_1fr] print:block">
        <form className="liquid-glass-card space-y-4 p-5 sm:p-6 print:hidden" onSubmit={(e) => e.preventDefault()}>
          <div className="flex gap-2">
            {(['classic', 'modern'] as CvTemplate[]).map((template) => (
              <button
                key={template}
                type="button"
                aria-pressed={draft.template === template}
                onClick={() => update({ template })}
                className={`focus-ring rounded-lg border px-3 py-2 text-xs font-semibold ${draft.template === template ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-200 text-slate-600'}`}
              >
                {template === 'classic' ? 'Mẫu Cổ điển' : 'Mẫu Hiện đại'}
              </button>
            ))}
          </div>

          <div>
            <label htmlFor="cv-name" className="field-label">Họ và tên</label>
            <input id="cv-name" className="form-input" value={draft.fullName} onChange={(e) => update({ fullName: e.target.value })} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label htmlFor="cv-email" className="field-label">Email</label>
              <input id="cv-email" type="email" className="form-input" value={draft.email} onChange={(e) => update({ email: e.target.value })} />
            </div>
            <div>
              <label htmlFor="cv-phone" className="field-label">Số điện thoại</label>
              <input id="cv-phone" className="form-input" value={draft.phone} onChange={(e) => update({ phone: e.target.value })} />
            </div>
          </div>
          <div>
            <label htmlFor="cv-objective" className="field-label">Mục tiêu nghề nghiệp</label>
            <textarea id="cv-objective" className="form-input min-h-20" value={draft.objective} onChange={(e) => update({ objective: e.target.value })} placeholder="Ví dụ: Tìm vị trí thực tập Frontend Developer để áp dụng kiến thức React, rèn luyện kỹ năng làm việc nhóm." />
          </div>
          <div>
            <label htmlFor="cv-education" className="field-label">Học vấn</label>
            <textarea id="cv-education" className="form-input min-h-16" value={draft.education} onChange={(e) => update({ education: e.target.value })} placeholder="Ví dụ: Đại học Nam Cần Thơ — Công nghệ thông tin, khóa 2023-2027" />
          </div>
          <div>
            <label htmlFor="cv-skills" className="field-label">Kỹ năng <span className="font-normal text-slate-500">(cách nhau bằng dấu phẩy)</span></label>
            <input id="cv-skills" className="form-input" value={draft.skills} onChange={(e) => update({ skills: e.target.value })} placeholder="HTML/CSS, JavaScript, React, Làm việc nhóm" />
          </div>
          <div>
            <label htmlFor="cv-experience" className="field-label">Kinh nghiệm / Hoạt động <span className="font-normal text-slate-500">(mỗi dòng một mục)</span></label>
            <textarea id="cv-experience" className="form-input min-h-24" value={draft.experience} onChange={(e) => update({ experience: e.target.value })} placeholder={'Tình nguyện viên Mùa hè xanh 2025\nThành viên CLB Tin học'} />
          </div>
        </form>

        <div className="space-y-4 print:w-full">
          <div
            id="cv-print-area"
            className={`liquid-glass-card min-h-[420px] p-6 text-slate-800 ${draft.template === 'modern' ? 'border-t-4 border-blue-600' : ''}`}
          >
            <header className={draft.template === 'modern' ? 'mb-4 border-b border-blue-100 pb-4' : 'mb-4 border-b border-slate-200 pb-4 text-center'}>
              <h1 className={`text-xl font-bold ${draft.template === 'modern' ? 'text-blue-700' : ''}`}>{draft.fullName || 'Họ và tên'}</h1>
              <p className="mt-1 text-xs text-slate-500">{[draft.email, draft.phone].filter(Boolean).join(' · ') || 'email@example.com · 09xx xxx xxx'}</p>
            </header>
            {draft.objective && (
              <section className="mb-4">
                <h2 className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">Mục tiêu nghề nghiệp</h2>
                <p className="mt-1 text-sm whitespace-pre-wrap">{draft.objective}</p>
              </section>
            )}
            {draft.education && (
              <section className="mb-4">
                <h2 className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">Học vấn</h2>
                <p className="mt-1 text-sm whitespace-pre-wrap">{draft.education}</p>
              </section>
            )}
            {skillList.length > 0 && (
              <section className="mb-4">
                <h2 className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">Kỹ năng</h2>
                <div className="mt-1 flex flex-wrap gap-1.5">{skillList.map((skill) => <span key={skill} className="liquid-pill">{skill}</span>)}</div>
              </section>
            )}
            {experienceLines.length > 0 && (
              <section>
                <h2 className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">Kinh nghiệm / Hoạt động</h2>
                <ul className="mt-1 list-disc space-y-1 pl-5 text-sm">{experienceLines.map((line) => <li key={line}>{line}</li>)}</ul>
              </section>
            )}
          </div>
          <GlassButton variant="primary" className="w-full print:hidden" onClick={() => window.print()}>In / Lưu PDF</GlassButton>
        </div>
      </div>
    </section>
  );
}
