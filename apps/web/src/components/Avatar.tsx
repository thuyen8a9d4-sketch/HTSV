import { User } from './Icons';

export function Avatar({ name, anonymous = false }: { name?: string | null; anonymous?: boolean }) {
  const initials = name?.trim().split(/\s+/).slice(-2).map((word) => word[0]).join('').toUpperCase();
  return <span className="avatar" aria-hidden="true">{anonymous || !initials ? <User className="h-4 w-4" /> : initials}</span>;
}
