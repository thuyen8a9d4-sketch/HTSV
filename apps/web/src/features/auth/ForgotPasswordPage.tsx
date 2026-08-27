import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FormField } from '../../components/FormField';
import { apiClient } from '../../lib/api-client';
import { forgotPasswordSchema } from './schemas';
import type { ForgotPasswordForm } from './schemas';

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [message, setMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordForm>({ resolver: zodResolver(forgotPasswordSchema) });

  const onSubmit = async (data: ForgotPasswordForm) => {
    const res = await apiClient.post('/auth/forgot-password', data);
    setMessage(res.data.message);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="mb-4 text-sm text-slate-600">
        Nhập email đã đăng ký để nhận mã đặt lại mật khẩu.
      </p>
      <FormField label="Email" type="email" {...register('email')} error={errors.email?.message} />
      {message && <p className="mb-4 text-sm text-slate-600">{message}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-slate-900 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        Gửi mã
      </button>
      {message && (
        <button
          type="button"
          onClick={() => navigate(`/reset-password?email=${encodeURIComponent(getValues('email'))}`)}
          className="mt-3 w-full text-sm text-slate-600 hover:underline"
        >
          Tôi đã có mã, đặt lại mật khẩu
        </button>
      )}
    </form>
  );
}
