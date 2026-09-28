import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { GlassButton } from '../../components/GlassButton';
import { httpErrorMessage } from '../../lib/http-error';
import { FormField } from '../../components/FormField';
import { apiClient } from '../../lib/api-client';
import { verifyOtpSchema } from './schemas';
import type { VerifyOtpForm } from './schemas';

export function VerifyOtpPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get('email') ?? '';
  const [serverError, setServerError] = useState<string | null>(null);
  const [resending, setResending] = useState(false);
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
    } catch (err: unknown) {
      setServerError(httpErrorMessage(err, 'Xác thực thất bại'));
    }
  };

  const resend = async () => {
    setResendMessage(null);
    setResending(true);
    try {
      const res = await apiClient.post('/auth/resend-otp', { email });
      setResendMessage(res.data.message);
    } catch {
      setResendMessage('Không thể gửi lại mã, vui lòng thử lại sau.');
    } finally {
      setResending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="min-w-0">
      <p className="mb-4 text-sm text-slate-600">
        Mã OTP đã được gửi tới <strong>{email}</strong>
      </p>
      <input type="hidden" {...register('email')} />
      <FormField
        label="Mã OTP"
        maxLength={6} inputMode="numeric" autoComplete="one-time-code" className="text-center text-xl tracking-[0.35em]"
        {...register('code')}
        error={errors.code?.message}
      />
      {serverError && <p role="alert" className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{serverError}</p>}
      {resendMessage && <p role="status" className="mb-4 rounded-xl bg-blue-50 p-3 text-sm text-blue-800">{resendMessage}</p>}
      <GlassButton
        type="submit"
        loading={isSubmitting}
        variant="primary"
        className="w-full"
      >
        Xác thực
      </GlassButton>
      <button
        type="button"
        onClick={resend}
        disabled={resending || isSubmitting}
        aria-busy={resending}
        className="focus-ring mt-3 min-h-11 w-full rounded-lg text-sm font-medium text-blue-700 hover:underline"
      >
        {resending ? 'Đang gửi lại mã…' : 'Gửi lại mã OTP'}
      </button>
    </form>
  );
}
