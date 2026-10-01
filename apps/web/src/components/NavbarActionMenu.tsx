import { useEffect, useId, useRef } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface NavbarActionMenuProps {
  label: string;
  children: ReactNode;
  className: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: { label: string; to: string; icon: ReactNode }[];
}

export function NavbarActionMenu({ label, children, className, open, onOpenChange, items }: NavbarActionMenuProps) {
  const id = useId();
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const links = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: PointerEvent) => {
      if (!root.current?.contains(event.target as Node)) onOpenChange(false);
    };
    document.addEventListener('pointerdown', dismiss);
    return () => document.removeEventListener('pointerdown', dismiss);
  }, [open, onOpenChange]);

  return <div ref={root} className="navbar-action-menu" onBlur={(event) => {
    if (!event.currentTarget.contains(event.relatedTarget)) onOpenChange(false);
  }} onKeyDown={(event) => {
    if (event.key === 'Escape' && open) {
      event.preventDefault();
      event.stopPropagation();
      onOpenChange(false);
      trigger.current?.focus();
    }
  }}>
    <button ref={trigger} type="button" className={className} aria-label={label} title={label}
      aria-expanded={open} aria-controls={id} onClick={() => onOpenChange(!open)}
      onKeyDown={(event) => {
        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
          event.preventDefault();
          onOpenChange(true);
          const index = event.key === 'ArrowDown' ? 0 : items.length - 1;
          requestAnimationFrame(() => links.current[index]?.focus());
        }
      }}>{children}</button>
    {open && <nav id={id} aria-label={label} className="navbar-action-popup" onKeyDown={(event) => {
      const index = links.current.indexOf(document.activeElement as HTMLAnchorElement);
      const target = event.key === 'ArrowDown' ? (index + 1) % items.length
        : event.key === 'ArrowUp' ? (index + items.length - 1) % items.length
        : event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : -1;
      if (target >= 0) { event.preventDefault(); links.current[target]?.focus(); }
    }}>
      {items.map((item, index) => <Link key={item.to} ref={(element) => { links.current[index] = element; }}
        to={item.to} onClick={() => onOpenChange(false)} className="navbar-action-option">
        {item.icon}<span>{item.label}</span>
      </Link>)}
    </nav>}
  </div>;
}
