import type { InputHTMLAttributes } from 'react';

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function FormField({ label, error, ...inputProps }: FormFieldProps) {
  return (
    <div className="mb-4">
      <label className="mb-1 block text-sm font-medium text-slate-700">{label}</label>
      <input
        {...inputProps}
        className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-slate-900 focus:outline-none"
      />
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  );
}
