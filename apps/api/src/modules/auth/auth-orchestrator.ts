/**
 * Auth Orchestrator - Điều phối các auth flow
 *
 * Sử dụng ProcessStep để tách logic thành 3 tầng
 */

import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { createProcessOrchestrator, ProcessOrchestrator } from '../../common/process';
import { CorePrismaService } from '../../core-prisma/core-prisma.service';
import { MailService } from '../mail/mail.service';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './jwt-payload.interface';
import {
  LoginInput,
  loginCheckActivatedStep,
  loginFindUserStep,
  loginGetRolesStep,
  loginVerifyPasswordStep,
  RegisterInput,
  registerCheckUsernameEmailStep,
  registerCreateUserStep,
  registerSendOtpStep,
  ResetPasswordInput,
  resetPasswordFindUserAndOtpStep,
  resetPasswordHashStep,
  resetPasswordMarkOtpUsedStep,
  resetPasswordUpdateStep,
  VerifyOtpInput,
  verifyOtpActivateUserStep,
  verifyOtpFindUserStep,
  verifyOtpMarkUsedStep,
  verifyOtpValidateCodeStep,
} from './auth-process-steps';

@Injectable()
export class AuthOrchestrator {
  private readonly logger = new Logger(AuthOrchestrator.name);

  constructor(
    private readonly prisma: CorePrismaService,
    private readonly usersService: UsersService,
    private readonly mailService: MailService,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  async orchestrateRegister(
    input: Omit<RegisterInput, 'usersService' | 'mailService' | 'prisma'>,
  ) {
    this.logger.debug('[Register] Starting...');
    const orchestrator: ProcessOrchestrator<RegisterInput> =
      createProcessOrchestrator();

    orchestrator.addStep(registerCheckUsernameEmailStep);
    orchestrator.addStep(registerCreateUserStep);
    orchestrator.addStep(registerSendOtpStep);

    const result = await orchestrator.run({
      ...input,
      usersService: this.usersService,
      mailService: this.mailService,
      prisma: this.prisma,
    } as RegisterInput);

    if (!result.success) {
      this.logger.error(`[Register] Failed: ${result.error}`);
      throw new Error(result.error);
    }

    this.logger.debug('[Register] Completed');
    return {
      message: 'Đăng ký thành công, vui lòng kiểm tra email để lấy mã OTP.',
    };
  }

  async orchestrateLogin(input: Omit<LoginInput, 'usersService'>) {
    this.logger.debug('[Login] Starting...');
    const orchestrator: ProcessOrchestrator<LoginInput> =
      createProcessOrchestrator();

    orchestrator.addStep(loginFindUserStep);
    orchestrator.addStep(loginVerifyPasswordStep);
    orchestrator.addStep(loginCheckActivatedStep);
    orchestrator.addStep(loginGetRolesStep);

    const result = await orchestrator.run({
      ...input,
      usersService: this.usersService,
    } as LoginInput);

    if (!result.success) {
      this.logger.error(`[Login] Failed: ${result.error}`);
      throw new Error(result.error);
    }

    const data = result.data as LoginInput;
    return this.issueTokens(data.user!, data.roles || []);
  }

  async orchestrateVerifyOtp(
    input: Omit<VerifyOtpInput, 'usersService' | 'prisma'>,
  ) {
    this.logger.debug('[VerifyOtp] Starting...');
    const orchestrator: ProcessOrchestrator<VerifyOtpInput> =
      createProcessOrchestrator();

    orchestrator.addStep(verifyOtpFindUserStep);
    orchestrator.addStep(verifyOtpValidateCodeStep);
    orchestrator.addStep(verifyOtpMarkUsedStep);
    orchestrator.addStep(verifyOtpActivateUserStep);

    const result = await orchestrator.run({
      ...input,
      usersService: this.usersService,
      prisma: this.prisma,
    } as VerifyOtpInput);

    if (!result.success) {
      this.logger.error(`[VerifyOtp] Failed: ${result.error}`);
      throw new Error(result.error);
    }

    return { message: 'Xác thực thành công, bạn có thể đăng nhập.' };
  }

  async orchestrateResetPassword(
    input: Omit<ResetPasswordInput, 'usersService' | 'prisma'>,
  ) {
    this.logger.debug('[ResetPassword] Starting...');
    const orchestrator: ProcessOrchestrator<ResetPasswordInput> =
      createProcessOrchestrator();

    orchestrator.addStep(resetPasswordFindUserAndOtpStep);
    orchestrator.addStep(resetPasswordHashStep);
    orchestrator.addStep(resetPasswordUpdateStep);
    orchestrator.addStep(resetPasswordMarkOtpUsedStep);

    const result = await orchestrator.run({
      ...input,
      usersService: this.usersService,
      prisma: this.prisma,
    } as ResetPasswordInput);

    if (!result.success) {
      this.logger.error(`[ResetPassword] Failed: ${result.error}`);
      throw new Error(result.error);
    }

    return { message: 'Đặt lại mật khẩu thành công.' };
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
