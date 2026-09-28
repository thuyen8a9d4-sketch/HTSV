import type { ReactNode } from 'react';
import { FileText, GraduationCap, Mail, Shield } from '../../components/Icons';
import type { ServiceIcon } from './student-types';

const paths: Partial<Record<ServiceIcon, ReactNode>> = {
  calendar: <><rect x="3" y="5" width="18" height="16" rx="3" /><path d="M7 3v4m10-4v4M3 11h18M7 15h2m4 0h2m-8 3h2" /></>,
  laptop: <><rect x="4" y="3" width="16" height="13" rx="2" /><path d="M2 20h20l-2-4H4l-2 4Z" /></>,
  chart: <><path d="M4 3v17h17M8 15v-4m5 4V7m5 8v-6" /></>,
  edit: <><path d="m15 4 5 5M4 20l5-1L21 7l-5-5L4 14v6Zm9 0h8" /></>,
  book: <><path d="M12 5C8 2 4 3 2 4v15c4-1 7-1 10 2 3-3 6-3 10-2V4c-2-1-6-2-10 1Zm0 0v16" /></>,
  award: <><circle cx="12" cy="8" r="5" /><path d="m8 12-2 9 6-3 6 3-2-9" /></>,
  clipboard: <><rect x="5" y="4" width="14" height="18" rx="2" /><rect x="9" y="2" width="6" height="4" rx="1" /><path d="m8 13 3 3 5-6" /></>,
  bell: <><path d="M5 9a7 7 0 0 1 14 0c0 6 2 7 2 7H3s2-1 2-7Zm4 11h6" /></>,
  headset: <><path d="M3 14v-3a9 9 0 0 1 18 0v6c0 3-3 4-6 4" /><rect x="2" y="11" width="5" height="8" rx="2" /><rect x="17" y="11" width="5" height="8" rx="2" /></>,
  bulb: <><path d="M8 16c0-3-3-4-3-8a7 7 0 0 1 14 0c0 4-3 5-3 8H8Zm1 4h6m-5 3h4M12 9v7" /></>,
  wallet: <><path d="M20 7V4H5a3 3 0 0 0 0 6h16v11H5a3 3 0 0 1-3-3V7m19 6h-6v5h6" /><path d="M17 15h.01" /></>,
  people: <><circle cx="9" cy="7" r="4" /><path d="M2 21v-3a7 7 0 0 1 14 0v3M17 3a4 4 0 0 1 0 8m2 3c3 1 3 4 3 7" /></>,
  home: <><path d="m2 10 10-8 10 8M5 8v13h14V8M9 21v-8h6v8" /></>,
};

export function StudentIcon({ name, className = 'h-5 w-5' }: { name: ServiceIcon; className?: string }) {
  if (name === 'file') return <FileText className={className} />;
  if (name === 'graduate') return <GraduationCap className={className} />;
  if (name === 'mail') return <Mail className={className} />;
  if (name === 'shield') return <Shield className={className} />;
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden="true" focusable="false">{paths[name]}</svg>;
}
