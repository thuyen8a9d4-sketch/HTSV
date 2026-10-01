import { randomInt } from 'crypto';
import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
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
import { JwtPayload } from './jwt-payload.interface';
import { OAuthProfile } from './oauth-profile.interface';

const OTP_TTL_MS = 10 * 60 * 1000;

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: CorePrismaService,
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async register(dto: RegisterDto) {
    const [existingUsername, existingEmail] = await Promise.all([
      this.usersService.findByUsername(dto.username),
      this.usersService.findByEmail(dto.email),
    ]);
    if (existingUsername) {
      throw new ConflictException('Tên đăng nhập đã được sử dụng');
    }
    if (existingEmail) {
      if (!existingEmail.isActive) {
        await this.sendRegisterOtp(existingEmail.id, existingEmail.email);
        return {
          message:
            'Email này đã đăng ký nhưng chưa xác thực. Mã OTP mới đã được gửi.',
        };
      }
      throw new ConflictException('Email đã được sử dụng');
    }

    const passwordHash = await argon2.hash(dto.password);
    const user = await this.usersService.createUser({
      username: dto.username,
      email: dto.email,
      fullName: dto.fullName,
      passwordHash,
      roleCode: 'STUDENT',
    });
    await this.sendRegisterOtp(user.id, user.email);
    return {
      message: 'Đăng ký thành công, vui lòng kiểm tra email để lấy mã OTP.',
    };
  }

  async verifyOtp(dto: VerifyOtpDto) {
    const user = await this.consumeOtp(
      dto.email,
      OtpPurpose.REGISTER,
      dto.code,
      'Mã OTP không đúng hoặc đã hết hạn',
    );
    await this.usersService.activate(user.id);
    return { message: 'Xác thực thành công, bạn có thể đăng nhập.' };
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
    const user = await this.usersService.findByUsername(dto.username);
    if (!user || !user.passwordHash) {
      throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu');
    }
    const passwordValid = await argon2.verify(user.passwordHash, dto.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Sai tài khoản hoặc mật khẩu');
    }
    if (!user.isActive) {
      throw new ForbiddenException('Tài khoản chưa được xác thực OTP');
    }
    const roles = user.userRoles.map((ur) => ur.role.code);
    return this.issueTokens(user, roles);
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
    const user = await this.consumeOtp(
      dto.email,
      OtpPurpose.PASSWORD_RESET,
      dto.code,
      'Mã đặt lại mật khẩu không đúng hoặc đã hết hạn',
    );
    const passwordHash = await argon2.hash(dto.newPassword);
    await this.usersService.updatePassword(user.id, passwordHash);
    return { message: 'Đặt lại mật khẩu thành công.' };
  }

  private async sendRegisterOtp(userId: number, email: string) {
    const code = await this.createOtp(userId, OtpPurpose.REGISTER);
    await this.mailService.send(
      email,
      'Xác thực tài khoản HTSV',
      `Mã xác thực của bạn là: ${code}. Mã có hiệu lực trong 10 phút.`,
    );
  }

  private async createOtp(userId: number, purpose: OtpPurpose) {
    const code = randomInt(0, 1_000_000).toString().padStart(6, '0');
    const expiresAt = new Date(Date.now() + OTP_TTL_MS);
    await this.prisma.maXacThuc.create({
      data: { userId, code, purpose, expiresAt },
    });
    return code;
  }

  private async findValidOtp(
    userId: number,
    purpose: OtpPurpose,
    code: string,
  ) {
    const otp = await this.prisma.maXacThuc.findFirst({
      where: { userId, purpose, isUsed: false, expiresAt: { gt: new Date() } },
      orderBy: { createdAt: 'desc' },
    });
    if (!otp || otp.code !== code) {
      return null;
    }
    return otp;
  }

  /** Shared by verifyOtp/resetPassword: look up the user, validate the code, mark it used. */
  private async consumeOtp(
    email: string,
    purpose: OtpPurpose,
    code: string,
    invalidMsg: string,
  ) {
    const user = await this.usersService.findByEmail(email);
    if (!user) throw new BadRequestException(invalidMsg);
    const otp = await this.findValidOtp(user.id, purpose, code);
    if (!otp) throw new BadRequestException(invalidMsg);
    await this.prisma.maXacThuc.update({
      where: { id: otp.id },
      data: { isUsed: true },
    });
    return user;
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
