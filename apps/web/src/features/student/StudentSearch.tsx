import { useId, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { normalizeSearch, studentFaqs, studentServices } from './student-mock-data';
import { StudentIcon } from './StudentIcon';
import type { StudentService } from './student-types';

export function StudentSearch({ compact = false, onService }: { compact?: boolean; onService: (service: StudentService) => void }) {
  const id = useId();
  const navigate = useNavigate();
  const input = useRef<HTMLInputElement>(null);
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const query = normalizeSearch(value);
  const services = studentServices.filter((s) => normalizeSearch(`${s.name} ${s.description} ${s.keywords ?? ''}`).includes(query)).slice(0, 5);
  const faqs = query ? studentFaqs.filter((faq) => normalizeSearch(`${faq.question} ${faq.answer}`).includes(query)).slice(0, 3) : [];
  const close = () => { input.current?.focus(); setOpen(false); setValue(''); };
  return <div className={`student-search ${compact ? 'student-search-compact' : ''}`} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }} onKeyDown={(event) => {
    if (event.key === 'Escape') { event.stopPropagation(); setOpen(false); input.current?.focus(); }
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      setOpen(true);
      const controls = [...event.currentTarget.querySelectorAll<HTMLElement>('input, [data-search-result]')];
      const current = controls.indexOf(document.activeElement as HTMLElement);
      controls[(current + (event.key === 'ArrowDown' ? 1 : -1) + controls.length) % controls.length]?.focus();
    }
  }}>
    <div className="flex items-center gap-3 px-4">
      <svg className="h-5 w-5 shrink-0 text-blue-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></svg>
      <label htmlFor={id} className="sr-only">{compact ? 'Tìm nhanh dịch vụ và FAQ' : 'Bạn cần tìm dịch vụ gì?'}</label>
      <input ref={input} id={id} value={value} onChange={(event) => { setValue(event.target.value); setOpen(true); }} onFocus={() => setOpen(true)} autoComplete="off" placeholder={compact ? 'Tìm dịch vụ, giấy tờ, FAQ…' : 'Tìm giấy xác nhận, học phí, lịch thi…'} className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none" aria-expanded={open} aria-controls={`${id}-results`} />
      {value && <button type="button" className="min-h-11 px-1 text-xs text-slate-600" onClick={() => { setValue(''); input.current?.focus(); }} aria-label="Xóa từ khóa">Xóa</button>}
    </div>
    {open && <div id={`${id}-results`} className="student-search-results">
      <p className="px-3 py-2 text-[11px] font-semibold tracking-wider text-slate-500 uppercase">{query ? 'Kết quả tìm kiếm' : 'Dịch vụ gợi ý'}</p>
      {services.map((service) => <button type="button" data-search-result key={service.id} className="search-result" onClick={() => { close(); onService(service); }}><StudentIcon name={service.icon} /><span>{service.name}</span></button>)}
      {faqs.map((faq) => <button type="button" data-search-result key={faq.id} className="search-result" onClick={() => { close(); navigate(`/faq#faq-${faq.id}`); }}><span className="shrink-0 text-xs font-semibold">FAQ</span><span>{faq.question}</span></button>)}
      <p role="status" className={services.length || faqs.length ? 'sr-only' : 'px-3 py-4 text-sm text-slate-600'}>{services.length + faqs.length ? `${services.length + faqs.length} gợi ý` : 'Chưa tìm thấy. Thử “BHYT”, “học phí” hoặc “hoãn thi”.'}</p>
    </div>}
  </div>;
}
