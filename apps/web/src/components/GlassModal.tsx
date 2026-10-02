import { useEffect, useId, useRef } from 'react';
import type { ReactNode } from 'react';
import { GlassButton } from './GlassButton';
import { Close } from './Icons';

export function GlassModal({ open, onClose, title, drawer = false, className = '', children }: { open: boolean; onClose: () => void; title: string; drawer?: boolean; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null);
  const titleId = useId();
  useEffect(() => {
    const dialog = ref.current;
    if (!open || !dialog) return;
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [open]);
  return <dialog ref={ref} aria-labelledby={titleId} onKeyDown={(e) => {
    if (e.key !== 'Tab') return;
    const controls = Array.from(e.currentTarget.querySelectorAll<HTMLElement>('a[href], button:not(:disabled), input:not(:disabled), select:not(:disabled), textarea:not(:disabled), [tabindex="0"]')).filter((el) => el.getClientRects().length > 0);
    const first = controls[0];
    const last = controls.at(-1);
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last?.focus(); }
    if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first?.focus(); }
  }} onCancel={(e) => { e.preventDefault(); onClose(); }} onClick={(e) => { if (e.target === e.currentTarget) { const rect = e.currentTarget.getBoundingClientRect(); if (e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom) onClose(); } }} className={`liquid-glass-card glass-modal ${drawer ? 'glass-drawer' : ''} ${className}`}>
    <div className="mb-5 flex items-center justify-between gap-3"><h2 id={titleId} className="text-lg font-semibold">{title}</h2><GlassButton variant="ghost" onClick={onClose} aria-label="Đóng menu" className="shrink-0 border border-slate-200/50 px-3 text-slate-500 hover:bg-slate-100/70 hover:text-slate-700 focus-visible:shadow-none focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-offset-2 focus-visible:outline-slate-500"><Close /></GlassButton></div>
    {children}
  </dialog>;
}
