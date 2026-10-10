import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { CorePrismaService } from '../../core-prisma/core-prisma.service';
import { OtpPurpose } from '../../generated/core-client';
import { MailService } from '../mail/mail.service';
import { UsersService } from '../users/users.service';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { ResendOtpDto } from './dto/resend-otp.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';
import { VerifyOtpDto } from './dto/verify-otp.dto';
import { OAuthProfile } from './oauth-profile.interface';
import { AuthOrchestrator } from './auth-orchestrator';

/**
 * Auth Service - Refactored với cấu trúc 3 tầng
 * 
 * Mỗi method gọi AuthOrchestrator để điều phối:
 * - validate: kiểm tra điều kiện
 * - execute: thực hiện xử lý
 * - run: điều phối tuần tự, retry, throw nếu lỗi
 */
@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: CorePrismaService,
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    private readonly orchestrator: AuthOrchestrator,
  ) {}

  async register(dto: RegisterDto) {
    return this.orchestrator.orchestrateRegister({
      username: dto.username,
      email: dto.email,
      password: dto.password,
      fullName: dto.fullName,
    });
  }

  async verifyOtp(dto: VerifyOtpDto) {
    return this.orchestrator.orchestrateVerifyOtp({
      email: dto.email,
      code: dto.code,
    });
  }

  async resendOtp(dto: ResendOtpDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (user && !user.isActive) {
      await this.sendRegisterOtp(user.id, user.email);
    }
    return {
      message:
        'Nếu tài khoản tồn tại và chưa xác thực, mã OTP mới đã được gửi.',
    };
  }

  async login(dto: LoginDto) {
    return this.orchestrator.orchestrateLogin({
      username: dto.username,
      password: dto.password,
    });
  }

  /**
   * Find-or-create for a verified Google/Facebook login. The provider
   * already confirmed the email, so unlike password registration this
   * skips OTP and activates the account immediately. An existing
   * password-based account with the same email gets the provider id
   * linked onto it rather than creating a duplicate user.
   */
  async loginWithOAuth(profile: OAuthProfile) {
    const idField = profile.provider === 'google' ? 'googleId' : 'facebookId';

    const existing = await this.prisma.nguoiDung.findFirst({
      where: { [idField]: profile.providerId },
    });
    if (existing) {
      return this.issueTokens(
        existing,
        await this.usersService.getRoleCodes(existing.id),
      );
    }

    const byEmail = await this.usersService.findByEmail(profile.email);
    if (byEmail) {
      const linked = await this.prisma.nguoiDung.update({
        where: { id: byEmail.id },
        data: { [idField]: profile.providerId, isActive: true },
      });
      return this.issueTokens(
        linked,
        await this.usersService.getRoleCodes(linked.id),
      );
    }

    const created = await this.createOAuthUser(profile, idField);
    return this.issueTokens(created, ['STUDENT']);
  }

  private async createOAuthUser(
    profile: OAuthProfile,
    idField: 'googleId' | 'facebookId',
  ) {
    const username = await this.generateUsernameFromEmail(profile.email);
    return this.usersService.createUser({
      username,
      email: profile.email,
      fullName: profile.fullName,
      roleCode: 'STUDENT',
      isActive: true,
      [idField]: profile.providerId,
    });
  }

  /** One query for every username sharing the base, then pick the lowest free suffix in memory. */
  private async generateUsernameFromEmail(email: string): Promise<string> {
    const base =
      email
        .split('@')[0]
        .replace(/[^a-zA-Z0-9_]/g, '')
        .slice(0, 40) || 'user';
    const taken = new Set(
      (
        await this.prisma.nguoiDung.findMany({
          where: { username: { startsWith: base } },
          select: { username: true },
        })
      ).map((u) => u.username),
    );
    if (!taken.has(base)) return base;
    for (let suffix = 1; ; suffix++) {
      const candidate = `${base}${suffix}`;
      if (!taken.has(candidate)) return candidate;
    }
  }

  async refresh(userId: number) {
    const user = await this.usersService.findOrThrow(userId);
    const roles = await this.usersService.getRoleCodes(userId);
    return this.issueTokens(user, roles);
  }

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.usersService.findByEmail(dto.email);
    if (user && user.isActive) {
      const code = await this.createOtp(user.id, OtpPurpose.PASSWORD_RESET);
      await this.mailService.send(
        user.email,
        'Đặt lại mật khẩu HTSV',
        `Mã đặt lại mật khẩu của bạn là: ${code}. Mã có hiệu lực trong 10 phút.`,
      );
    }
    return { message: 'Nếu email tồn tại, mã đặt lại mật khẩu đã được gửi.' };
  }

  async resetPassword(dto: ResetPasswordDto) {
    return this.orchestrator.orchestrateResetPassword({
      email: dto.email,
      code: dto.code,
      newPassword: dto.newPassword,
    });
  }

  /** Helper: Gửi OTP cho register/forgot password */
  private async sendOtp(userId: number, email: string, purpose: OtpPurpose) {
    const code = Math.random().toString().slice(2, 8).padStart(6, '0');
    await this.prisma.maXacThuc.create({
      data: {
        userId,
        code,
        purpose,
        expiresAt: new Date(Date.now() + 10 * 60 * 1000),
      },
    });
    const subject =
      purpose === OtpPurpose.REGISTER
        ? 'Xác thực tài khoản HTSV'
        : 'Đặt lại mật khẩu HTSV';
    await this.mailService.send(
      email,
      subject,
      `Mã của bạn: ${code} (hết hạn trong 10 phút)`,
    );
  }

  private issueTokens(
    user: { id: number; username: string; email: string; fullName: string },
    roles: string[],
  ) {
    const payload: JwtPayload = {
      sub: user.id,
      username: user.username,
      email: user.email,
      fullName: user.fullName,
      roles,
    };
    const accessToken = this.jwtService.sign(payload as object, {
      secret: this.config.getOrThrow<string>('JWT_ACCESS_SECRET'),
      expiresIn: (this.config.get<string>('JWT_ACCESS_EXPIRES_IN') ??
        '15m') as never,
    });
    const refreshToken = this.jwtService.sign(payload as object, {
      secret: this.config.getOrThrow<string>('JWT_REFRESH_SECRET'),
      expiresIn: (this.config.get<string>('JWT_REFRESH_EXPIRES_IN') ??
        '30d') as never,
    });
    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        roles,
      },
    };
  }
}
