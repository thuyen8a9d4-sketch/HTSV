import { useId, useState } from 'react';
import type { InputHTMLAttributes, ReactNode } from 'react';
import { Eye, EyeOff, Lock, Mail, User } from './Icons';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  icon?: ReactNode;
}

export function FormField({ label, error, icon, id, type, className = '', 'aria-describedby': describedBy, ...inputProps }: FormFieldProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';
  const prefix = icon ?? (isPassword ? <Lock /> : type === 'email' ? <Mail /> : inputProps.name === 'username' || inputProps.name === 'fullName' ? <User /> : null);
  return (
    <div className="mb-5 min-w-0">
      <label htmlFor={inputId} className="field-label">{label}</label>
      <div className="relative">
      {prefix && <span className="pointer-events-none absolute top-3.5 left-3.5 text-slate-500" aria-hidden="true">{prefix}</span>}
      <input
        {...inputProps}
        id={inputId}
        type={isPassword && showPassword ? 'text' : type}
        aria-invalid={error ? true : undefined}
        aria-describedby={[describedBy, error ? `${inputId}-error` : null].filter(Boolean).join(' ') || undefined}
        className={`form-input ${prefix ? 'pl-11' : ''} ${isPassword ? 'pr-12' : ''} ${className}`}
      />
      {isPassword && <button type="button" onClick={() => setShowPassword((value) => !value)} disabled={inputProps.disabled} aria-label={showPassword ? `Ẩn ${label.toLowerCase()}` : `Hiện ${label.toLowerCase()}`} aria-pressed={showPassword} className="focus-ring absolute top-0.5 right-0.5 flex h-11 w-11 items-center justify-center rounded-xl text-slate-500 hover:text-blue-700">{showPassword ? <EyeOff /> : <Eye />}</button>}
      </div>
      {error && <p id={`${inputId}-error`} role="alert" className="mt-2 text-xs text-red-700">{error}</p>}
    </div>
  );
}
