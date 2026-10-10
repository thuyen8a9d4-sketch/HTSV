/**
 * Auth Process Steps - Cấu trúc 3 tầng cho từng chức năng auth
 *
 * Mỗi flow (login, register, OTP, etc.) được tách thành:
 * 1. validate(): kiểm tra điều kiện trước xử lý
 * 2. execute(): làm việc chính
 * 3. Orchestrator: gọi tuần tự, throw nếu lỗi
 */

import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { randomInt } from 'crypto';
import * as argon2 from 'argon2';
import { ProcessInput, ProcessStep } from '../../common/process';
import { CorePrismaService } from '../../core-prisma/core-prisma.service';
import { OtpPurpose } from '../../generated/core-client';
import { MailService } from '../mail/mail.service';
import { UsersService } from '../users/users.service';

const OTP_TTL_MS = 10 * 60 * 1000;

/**
 * ============================================
 * REGISTER FLOW
 * ============================================
 */

export interface RegisterInput extends ProcessInput {
  username: string;
  email: string;
  password: string;
  fullName: string;
  usersService?: UsersService;
  mailService?: MailService;
  prisma?: CorePrismaService;
  existingUsername?: unknown;
  existingEmail?: unknown;
  passwordHash?: string;
  user?: { id: number };
}

/** Step 1: Kiểm tra tên đăng nhập + email tồn tại */
export const registerCheckUsernameEmailStep: ProcessStep<RegisterInput> = {
  name: 'register-check-existing',
  async validate(input: RegisterInput) {
    return !!(input.username && input.email && input.password && input.fullName);
  },
  async execute(input: RegisterInput) {
    const [existingUsername, existingEmail] = await Promise.all([
      input.usersService!.findByUsername(input.username),
      input.usersService!.findByEmail(input.email),
    ]);

    if (existingUsername) {
      throw new ConflictException('Tên đăng nhập đã được sử dụng');
    }

    if (existingEmail) {
      if (!existingEmail.isActive) {
        await input.mailService!.send(
          existingEmail.email,
          'Xác thực tài khoản HTSV',
          'Tài khoản này đã đăng ký nhưng chưa xác thực.',
        );
        throw new ConflictException(
          'Email này đã đăng ký nhưng chưa xác thực. Mã OTP mới đã được gửi.',
        );
      }
      throw new ConflictException('Email đã được sử dụng');
    }

    return { ...input, existingUsername, existingEmail };
  },
};

/** Step 2: Hash mật khẩu và tạo user */
export const registerCreateUserStep: ProcessStep<RegisterInput> = {
  name: 'register-create-user',
  async validate(input: RegisterInput) {
    return !input.existingUsername && !input.existingEmail;
  },
  async execute(input: RegisterInput) {
    const passwordHash = await argon2.hash(input.password);
    const user = await input.usersService!.createUser({
      username: input.username,
      email: input.email,
      fullName: input.fullName,
      passwordHash,
      roleCode: 'STUDENT',
    });
    return { ...input, passwordHash, user };
  },
};

/** Step 3: Gửi OTP */
export const registerSendOtpStep: ProcessStep<RegisterInput> = {
  name: 'register-send-otp',
  async validate(input: RegisterInput) {
    return !!(input.user && input.user.id);
  },
  async execute(input: RegisterInput) {
    const code = randomInt(0, 1_000_000).toString().padStart(6, '0');
    const expiresAt = new Date(Date.now() + OTP_TTL_MS);
    await input.prisma!.maXacThuc.create({
      data: {
        userId: input.user!.id,
        code,
        purpose: OtpPurpose.REGISTER,
        expiresAt,
      },
    });
    await input.mailService!.send(
      input.email,
      'Xác thực tài khoản HTSV',
      `Mã xác thực của bạn là: ${code}. Mã có hiệu lực trong 10 phút.`,
    );
    return input;
  },
};

/**
 * ============================================
 * LOGIN FLOW
 * ============================================
 */

export interface LoginInput extends ProcessInput {
  username: string;
  password: string;
  usersService?: UsersService;
  user?: { id: number; passwordHash: string; email: string; fullName: string; isActive?: boolean };
  passwordValid?: boolean;
  roles?: string[];
}

/** Step 1: Tìm user theo username */
export const loginFindUserStep: ProcessStep<LoginInput> = {
  name: 'login-find-user',
  async validate(input: LoginInput) {
    return !!(input.username && input.password);
  },
  async execute(input: LoginInput) {
    const user = await input.usersService!.findByUsername(input.username);
    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu');
    }
    return { ...input, user };
  },
};

/** Step 2: Kiểm tra mật khẩu */
export const loginVerifyPasswordStep: ProcessStep<LoginInput> = {
  name: 'login-verify-password',
  async validate(input: LoginInput) {
    return !!(input.user && input.password);
  },
  async execute(input: LoginInput) {
    const passwordValid = await argon2.verify(
      input.user!.passwordHash,
      input.password,
    );
    if (!passwordValid) {
      throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu');
    }
    return { ...input, passwordValid };
  },
};

/** Step 3: Kiểm tra user đã kích hoạt */
export const loginCheckActivatedStep: ProcessStep<LoginInput> = {
  name: 'login-check-activated',
  async validate(input: LoginInput) {
    return !!input.passwordValid;
  },
  async execute(input: LoginInput) {
    if (!input.user!.isActive) {
      throw new ForbiddenException('Tài khoản chưa được xác thực OTP');
    }
    return input;
  },
};

/** Step 4: Lấy roles */
export const loginGetRolesStep: ProcessStep<LoginInput> = {
  name: 'login-get-roles',
  async validate(input: LoginInput) {
    return !!(input.user && input.passwordValid);
  },
  async execute(input: LoginInput) {
    const roles = await input.usersService!.getRoleCodes(input.user!.id);
    return { ...input, roles };
  },
};

/**
 * ============================================
 * VERIFY OTP FLOW
 * ============================================
 */

export interface VerifyOtpInput extends ProcessInput {
  email: string;
  code: string;
  usersService?: UsersService;
  prisma?: CorePrismaService;
  user?: { id: number; email: string };
  otp?: { id: number; code: string; isUsed: boolean };
}

/** Step 1: Tìm user theo email */
export const verifyOtpFindUserStep: ProcessStep<VerifyOtpInput> = {
  name: 'verify-otp-find-user',
  async validate(input: VerifyOtpInput) {
    return !!(input.email && input.code);
  },
  async execute(input: VerifyOtpInput) {
    const user = await input.usersService!.findByEmail(input.email);
    if (!user) {
      throw new BadRequestException('Mã OTP không đúng hoặc đã hết hạn');
    }
    return { ...input, user };
  },
};

/** Step 2: Kiểm tra OTP hợp lệ */
export const verifyOtpValidateCodeStep: ProcessStep<VerifyOtpInput> = {
  name: 'verify-otp-validate',
  async validate(input: VerifyOtpInput) {
    return !!(input.user && input.code);
  },
  async execute(input: VerifyOtpInput) {
    const otp = await input.prisma!.maXacThuc.findFirst({
      where: {
        userId: input.user!.id,
        purpose: OtpPurpose.REGISTER,
        isUsed: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });
    if (!otp || otp.code !== input.code) {
      throw new BadRequestException('Mã OTP không đúng hoặc đã hết hạn');
    }
    return { ...input, otp };
  },
};

/** Step 3: Đánh dấu OTP đã sử dụng */
export const verifyOtpMarkUsedStep: ProcessStep<VerifyOtpInput> = {
  name: 'verify-otp-mark-used',
  async validate(input: VerifyOtpInput) {
    return !!(input.otp && !input.otp.isUsed);
  },
  async execute(input: VerifyOtpInput) {
    await input.prisma!.maXacThuc.update({
      where: { id: input.otp!.id },
      data: { isUsed: true },
    });
    return input;
  },
};

/** Step 4: Kích hoạt tài khoản */
export const verifyOtpActivateUserStep: ProcessStep<VerifyOtpInput> = {
  name: 'verify-otp-activate',
  async validate(input: VerifyOtpInput) {
    return !!(input.user && input.otp);
  },
  async execute(input: VerifyOtpInput) {
    await input.usersService!.activate(input.user!.id);
    return input;
  },
};

/**
 * ============================================
 * RESET PASSWORD FLOW
 * ============================================
 */

export interface ResetPasswordInput extends ProcessInput {
  email: string;
  code: string;
  newPassword: string;
  usersService?: UsersService;
  prisma?: CorePrismaService;
  user?: { id: number };
  otp?: { id: number };
  passwordHash?: string;
}

/** Step 1: Tìm user và OTP */
export const resetPasswordFindUserAndOtpStep: ProcessStep<ResetPasswordInput> = {
  name: 'reset-password-find-user-otp',
  async validate(input: ResetPasswordInput) {
    return !!(input.email && input.code && input.newPassword);
  },
  async execute(input: ResetPasswordInput) {
    const user = await input.usersService!.findByEmail(input.email);
    if (!user) {
      throw new BadRequestException(
        'Mã đặt lại mật khẩu không đúng hoặc đã hết hạn',
      );
    }

    const otp = await input.prisma!.maXacThuc.findFirst({
      where: {
        userId: user.id,
        purpose: OtpPurpose.PASSWORD_RESET,
        isUsed: false,
        expiresAt: { gt: new Date() },
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!otp || otp.code !== input.code) {
      throw new BadRequestException(
        'Mã đặt lại mật khẩu không đúng hoặc đã hết hạn',
      );
    }

    return { ...input, user, otp };
  },
};

/** Step 2: Hash mật khẩu mới */
export const resetPasswordHashStep: ProcessStep<ResetPasswordInput> = {
  name: 'reset-password-hash',
  async validate(input: ResetPasswordInput) {
    return !!input.newPassword;
  },
  async execute(input: ResetPasswordInput) {
    const passwordHash = await argon2.hash(input.newPassword);
    return { ...input, passwordHash };
  },
};

/** Step 3: Cập nhật mật khẩu */
export const resetPasswordUpdateStep: ProcessStep<ResetPasswordInput> = {
  name: 'reset-password-update',
  async validate(input: ResetPasswordInput) {
    return !!(input.user && input.passwordHash);
  },
  async execute(input: ResetPasswordInput) {
    await input.usersService!.updatePassword(
      input.user!.id,
      input.passwordHash!,
    );
    return input;
  },
};

/** Step 4: Đánh dấu OTP đã sử dụng */
export const resetPasswordMarkOtpUsedStep: ProcessStep<ResetPasswordInput> = {
  name: 'reset-password-mark-otp-used',
  async validate(input: ResetPasswordInput) {
    return !!input.otp;
  },
  async execute(input: ResetPasswordInput) {
    await input.prisma!.maXacThuc.update({
      where: { id: input.otp!.id },
      data: { isUsed: true },
    });
    return input;
  },
};
