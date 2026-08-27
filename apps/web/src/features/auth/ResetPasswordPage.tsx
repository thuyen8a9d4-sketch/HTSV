import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FormField } from '../../components/FormField';
import { apiClient } from '../../lib/api-client';
import { resetPasswordSchema } from './schemas';
import type { ResetPasswordForm } from './schemas';

export function ResetPasswordPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') ?? '';
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordForm>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email },
  });

  const onSubmit = async (data: ResetPasswordForm) => {
    setServerError(null);
    try {
      await apiClient.post('/auth/reset-password', data);
      navigate('/login');
    } catch (err: any) {
      setServerError(err.response?.data?.message ?? 'Đặt lại mật khẩu thất bại');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input type="hidden" {...register('email')} />
      <p className="mb-4 text-sm text-slate-600">
        Đặt lại mật khẩu cho <strong>{email}</strong>
      </p>
      <FormField label="Mã OTP" maxLength={6} {...register('code')} error={errors.code?.message} />
      <FormField
        label="Mật khẩu mới"
        type="password"
        {...register('newPassword')}
        error={errors.newPassword?.message}
      />
      {serverError && <p className="mb-4 text-sm text-red-600">{serverError}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-slate-900 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        Đặt lại mật khẩu
      </button>
    </form>
  );
}
