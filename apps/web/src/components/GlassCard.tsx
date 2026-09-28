import type { HTMLAttributes } from 'react';

interface GlassCardProps extends HTMLAttributes<HTMLDivElement> {
  hoverEffect?: boolean;
  solid?: boolean;
  padding?: boolean;
}
export function GlassCard({ className = '', hoverEffect = false, solid = false, padding = true, ...props }: GlassCardProps) {
  return <div className={`liquid-glass-card min-w-0 ${padding ? 'p-5 sm:p-6' : ''} ${hoverEffect ? 'glass-hover' : ''} ${solid ? 'glass-content' : ''} ${className}`} {...props} />;
}
