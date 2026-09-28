import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { GlassButton } from '../../components/GlassButton';
import { httpErrorMessage } from '../../lib/http-error';
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
    } catch (err: unknown) {
      setServerError(httpErrorMessage(err, 'Đặt lại mật khẩu thất bại'));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="min-w-0">
      <input type="hidden" {...register('email')} />
      <p className="mb-4 text-sm text-slate-600">
        Đặt lại mật khẩu cho <strong>{email}</strong>
      </p>
      <FormField label="Mã OTP" maxLength={6} inputMode="numeric" autoComplete="one-time-code" className="text-center text-xl tracking-[0.35em]" {...register('code')} error={errors.code?.message} />
      <FormField
        label="Mật khẩu mới"
        type="password" autoComplete="new-password"
        {...register('newPassword')}
        error={errors.newPassword?.message}
      />
      {serverError && <p role="alert" className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{serverError}</p>}
      <GlassButton
        type="submit"
        loading={isSubmitting}
        variant="primary"
        className="w-full"
      >
        Đặt lại mật khẩu
      </GlassButton>
    </form>
  );
}
