import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { GlassButton } from '../../components/GlassButton';
import { httpErrorMessage } from '../../lib/http-error';
import { FormField } from '../../components/FormField';
import { apiClient } from '../../lib/api-client';
import { useAuthStore } from '../../lib/auth-store';
import { OAuthButtons } from './OAuthButtons';
import { loginSchema } from './schemas';
import type { LoginForm } from './schemas';

export function LoginPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const next = searchParams.get('next');
  const postDestination = next && ['/forum/new', '/forum/new?anonymous=true', '/forum/new?anonymous=false'].includes(next) ? next : null;
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
      navigate(postDestination ?? (res.data.user.roles.includes('ADMIN') ? '/admin' : '/'));
    } catch (err: unknown) {
      setServerError(httpErrorMessage(err, 'Đăng nhập thất bại'));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="min-w-0">
      <FormField label="Tên đăng nhập" autoComplete="username" {...register('username')} error={errors.username?.message} />
      <FormField
        label="Mật khẩu"
        type="password" autoComplete="current-password"
        {...register('password')}
        error={errors.password?.message}
      />
      {serverError && <p role="alert" className="mb-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">{serverError}</p>}
      <GlassButton
        type="submit"
        loading={isSubmitting}
        variant="primary"
        className="w-full"
      >
        Đăng nhập
      </GlassButton>
      <OAuthButtons />
      <div className="mt-4 flex flex-wrap justify-between gap-2 text-sm text-slate-600">
        <Link to="/register" className="inline-flex min-h-11 items-center rounded-lg font-medium text-blue-700 hover:underline">
          Đăng ký
        </Link>
        <Link to="/forgot-password" className="inline-flex min-h-11 items-center rounded-lg font-medium text-blue-700 hover:underline">
          Quên mật khẩu?
        </Link>
      </div>
    </form>
  );
}
