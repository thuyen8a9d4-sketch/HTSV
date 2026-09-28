import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { GlassButton } from '../../components/GlassButton';
import { httpErrorMessage } from '../../lib/http-error';
import { FormField } from '../../components/FormField';
import { apiClient } from '../../lib/api-client';
import { OAuthButtons } from './OAuthButtons';
import { registerSchema } from './schemas';
import type { RegisterForm } from './schemas';

export function RegisterPage() {
  const navigate = useNavigate();
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: RegisterForm) => {
    setServerError(null);
    try {
      await apiClient.post('/auth/register', {
        username: data.username,
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });
      navigate(`/verify-otp?email=${encodeURIComponent(data.email)}`);
    } catch (err: unknown) {
      setServerError(httpErrorMessage(err, 'Đăng ký thất bại'));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="min-w-0">
      <FormField label="Tên đăng nhập" autoComplete="username" {...register('username')} error={errors.username?.message} />
      <FormField label="Email" type="email" autoComplete="email" {...register('email')} error={errors.email?.message} />
      <FormField label="Họ tên" autoComplete="name" {...register('fullName')} error={errors.fullName?.message} />
      <FormField
        label="Mật khẩu"
        type="password" autoComplete="new-password"
        {...register('password')}
        error={errors.password?.message}
      />
      <FormField
        label="Xác nhận mật khẩu"
        type="password" autoComplete="new-password"
        {...register('confirmPassword')}
        error={errors.confirmPassword?.message}
      />
      {serverError && <p role="alert" className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{serverError}</p>}
      <GlassButton
        type="submit"
        loading={isSubmitting}
        variant="primary"
        className="w-full"
      >
        Đăng ký
      </GlassButton>
      <OAuthButtons />
      <div className="mt-4 text-center text-sm text-slate-600">
        Đã có tài khoản?{' '}
        <Link to="/login" className="inline-flex min-h-11 items-center rounded-lg font-medium text-blue-700 hover:underline">
          Đăng nhập
        </Link>
      </div>
    </form>
  );
}
