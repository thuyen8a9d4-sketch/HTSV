import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FormField } from '../../components/FormField';
import { apiClient } from '../../lib/api-client';
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
    } catch (err: any) {
      setServerError(err.response?.data?.message ?? 'Đăng ký thất bại');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Tên đăng nhập" {...register('username')} error={errors.username?.message} />
      <FormField label="Email" type="email" {...register('email')} error={errors.email?.message} />
      <FormField label="Họ tên" {...register('fullName')} error={errors.fullName?.message} />
      <FormField
        label="Mật khẩu"
        type="password"
        {...register('password')}
        error={errors.password?.message}
      />
      <FormField
        label="Xác nhận mật khẩu"
        type="password"
        {...register('confirmPassword')}
        error={errors.confirmPassword?.message}
      />
      {serverError && <p className="mb-4 text-sm text-red-600">{serverError}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-slate-900 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        Đăng ký
      </button>
      <div className="mt-4 text-center text-sm text-slate-600">
        Đã có tài khoản?{' '}
        <Link to="/login" className="hover:underline">
          Đăng nhập
        </Link>
      </div>
    </form>
  );
}
