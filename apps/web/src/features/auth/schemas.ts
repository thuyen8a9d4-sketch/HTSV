import { z } from 'zod';

const PASSWORD_REGEX = /^[A-Z](?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>_-]).{7,}$/;
const passwordMessage =
  'Mật khẩu phải bắt đầu bằng chữ hoa, chứa ít nhất 1 số, 1 ký tự đặc biệt và tối thiểu 8 ký tự';

export const loginSchema = z.object({
  username: z.string().min(1, 'Vui lòng nhập tên đăng nhập'),
  password: z.string().min(1, 'Vui lòng nhập mật khẩu'),
});
export type LoginForm = z.infer<typeof loginSchema>;

export const registerSchema = z
  .object({
    username: z.string().min(3, 'Tên đăng nhập tối thiểu 3 ký tự').max(50),
    email: z.string().email('Email không hợp lệ'),
    fullName: z.string().min(1, 'Vui lòng nhập họ tên').max(150),
    password: z.string().regex(PASSWORD_REGEX, passwordMessage),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  });
export type RegisterForm = z.infer<typeof registerSchema>;

export const verifyOtpSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6, 'Mã OTP gồm 6 chữ số'),
});
export type VerifyOtpForm = z.infer<typeof verifyOtpSchema>;

export const forgotPasswordSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
});
export type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z.object({
  email: z.string().email(),
  code: z.string().length(6, 'Mã OTP gồm 6 chữ số'),
  newPassword: z.string().regex(PASSWORD_REGEX, passwordMessage),
});
export type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;
