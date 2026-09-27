import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { FormField } from '../../components/FormField';
import { apiClient } from '../../lib/api-client';
import { useAuthStore } from '../../lib/auth-store';
import { OAuthButtons } from './OAuthButtons';
import { loginSchema } from './schemas';
import type { LoginForm } from './schemas';

export function LoginPage() {
  const navigate = useNavigate();
  const setSession = useAuthStore((s) => s.setSession);
  const [serverError, setServerError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: LoginForm) => {
    setServerError(null);
    try {
      const res = await apiClient.post('/auth/login', data);
      setSession(res.data.accessToken, res.data.user);
      navigate(res.data.user.roles.includes('ADMIN') ? '/admin' : '/');
    } catch (err: any) {
      setServerError(err.response?.data?.message ?? 'Đăng nhập thất bại');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormField label="Tên đăng nhập" {...register('username')} error={errors.username?.message} />
      <FormField
        label="Mật khẩu"
        type="password"
        {...register('password')}
        error={errors.password?.message}
      />
      {serverError && <p className="mb-4 text-sm text-red-600">{serverError}</p>}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-slate-900 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        Đăng nhập
      </button>
      <OAuthButtons />
      <div className="mt-4 flex justify-between text-sm text-slate-600">
        <Link to="/register" className="hover:underline">
          Đăng ký
        </Link>
        <Link to="/forgot-password" className="hover:underline">
          Quên mật khẩu?
        </Link>
      </div>
    </form>
  );
}
