import { Link } from 'react-router-dom';
import { GraduationCap } from './Icons';

export function Brand({ subtitle = 'Cổng Hỗ Trợ Sinh Viên' }: { subtitle?: string }) {
  return <Link to="/forum" className="flex min-w-0 items-center gap-3 rounded-xl focus-ring" aria-label="HTSV — Cổng Hỗ Trợ Sinh Viên"><span className="brand-mark"><GraduationCap className="h-6 w-6" /></span><span className="min-w-0"><span className="block text-lg leading-tight font-bold tracking-tight">HTSV<span className="text-blue-600">.</span></span><span className="block text-[11px] text-slate-600">{subtitle}</span></span></Link>;
}
