import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { GlassButton } from '../../components/GlassButton';
import { httpErrorMessage } from '../../lib/http-error';
import { FormField } from '../../components/FormField';
import { apiClient } from '../../lib/api-client';
import { forgotPasswordSchema } from './schemas';
import type { ForgotPasswordForm } from './schemas';

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordForm>({ resolver: zodResolver(forgotPasswordSchema) });

  const onSubmit = async (data: ForgotPasswordForm) => {
    setServerError(null);
    setMessage(null);
    try {
      const res = await apiClient.post('/auth/forgot-password', data);
      setMessage(res.data.message);
    } catch (error: unknown) {
      setServerError(httpErrorMessage(error, 'Chưa thể gửi mã. Vui lòng thử lại.'));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="min-w-0">
      <p className="mb-4 text-sm text-slate-600">
        Nhập email đã đăng ký để nhận mã đặt lại mật khẩu.
      </p>
      <FormField label="Email" type="email" autoComplete="email" {...register('email')} error={errors.email?.message} />
      {serverError && <p role="alert" className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{serverError}</p>}
      {message && <p role="status" className="mb-4 rounded-xl bg-blue-50 p-3 text-sm text-blue-800">{message}</p>}
      <GlassButton
        type="submit"
        loading={isSubmitting}
        variant="primary"
        className="w-full"
      >
        Gửi mã
      </GlassButton>
      {message && (
        <button
          type="button"
          onClick={() => navigate(`/reset-password?email=${encodeURIComponent(getValues('email'))}`)}
          className="focus-ring mt-3 min-h-11 w-full rounded-lg text-sm font-medium text-blue-700 hover:underline"
        >
          Tôi đã có mã, đặt lại mật khẩu
        </button>
      )}
    </form>
  );
}
