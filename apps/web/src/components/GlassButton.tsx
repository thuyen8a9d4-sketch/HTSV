import type { ButtonHTMLAttributes } from 'react';

interface GlassButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'glass' | 'danger' | 'ghost' | 'success';
  loading?: boolean;
}

export function GlassButton({
  variant = 'glass',
  loading = false,
  disabled,
  className = '',
  children,
  type = 'button',
  ...props
}: GlassButtonProps) {
  return (
    <button
      type={type}
      className={`btn-liquid-glass focus-ring btn-${variant} ${className}`}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading && (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
          aria-hidden="true"
        />
      )}
      {children}
    </button>
  );
}
