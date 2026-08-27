import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FormField } from '../../components/FormField';
import { apiClient } from '../../lib/api-client';
import { verifyOtpSchema } from './schemas';
import type { VerifyOtpForm } from './schemas';

export function VerifyOtpPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') ?? '';
  const [serverError, setServerError] = useState<string | null>(null);
  const [resendMessage, setResendMessage] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyOtpForm>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: { email },
  });

  const onSubmit = async (data: VerifyOtpForm) => {
    setServerError(null);
    try {
      await apiClient.post('/auth/verify-otp', data);
      navigate('/login');
    } catch (err: any) {
      setServerError(err.response?.data?.message ?? 'Xác thực thất bại');
    }
  };

  const resend = async () => {
    setResendMessage(null);
    try {
      const res = await apiClient.post('/auth/resend-otp', { email });
      setResendMessage(res.data.message);
    } catch {
      setResendMessage('Không thể gửi lại mã, vui lòng thử lại sau.');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <p className="mb-4 text-sm text-slate-600">
        Mã OTP đã được gửi tới <strong>{email}</strong>
      </p>
      <input type="hidden" {...register('email')} />
      <FormField
        label="Mã OTP"
        maxLength={6}
        {...register('code')}
        error={errors.code?.message}
      />
      {serverError && <p className="mb-4 text-sm text-red-600">{serverError}</p>}
      {resendMessage && <p className="mb-4 text-sm text-slate-600">{resendMessage}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-slate-900 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        Xác thực
      </button>
      <button
        type="button"
        onClick={resend}
        className="mt-3 w-full text-sm text-slate-600 hover:underline"
      >
        Gửi lại mã OTP
      </button>
    </form>
  );
}
