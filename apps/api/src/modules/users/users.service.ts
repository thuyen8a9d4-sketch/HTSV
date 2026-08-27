import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CorePrismaService } from '../../core-prisma/core-prisma.service';

export interface UserSummary {
  id: number;
  username: string;
  email: string;
  fullName: string;
}

@Injectable()
export class UsersService {
  constructor(private readonly prisma: CorePrismaService) {}

  async findByUsername(username: string) {
    return this.prisma.nguoiDung.findUnique({
      where: { username },
      include: { userRoles: { include: { role: true } } },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.nguoiDung.findUnique({ where: { email } });
  }

  async findById(id: number): Promise<UserSummary | null> {
    const user = await this.prisma.nguoiDung.findUnique({
      where: { id },
      select: { id: true, username: true, email: true, fullName: true },
    });
    return user;
  }

  async assertExists(id: number): Promise<void> {
    const user = await this.prisma.nguoiDung.findUnique({ where: { id }, select: { id: true } });
    if (!user) {
      throw new BadRequestException(`Người dùng #${id} không tồn tại`);
    }
  }

  async findManyByIds(ids: number[]): Promise<UserSummary[]> {
    if (ids.length === 0) return [];
    return this.prisma.nguoiDung.findMany({
      where: { id: { in: [...new Set(ids)] } },
      select: { id: true, username: true, email: true, fullName: true },
    });
  }

  async attachOwners<T extends { ownerUserId: number }>(
    rows: T[],
  ): Promise<(T & { owner: UserSummary | null })[]> {
    const owners = await this.findManyByIds(rows.map((r) => r.ownerUserId));
    const byId = new Map(owners.map((o) => [o.id, o]));
    return rows.map((row) => ({ ...row, owner: byId.get(row.ownerUserId) ?? null }));
  }

  async createInactiveUser(data: {
    username: string;
    email: string;
    fullName: string;
    passwordHash: string;
    roleCode: string;
  }) {
    const role = await this.prisma.vaiTro.findUniqueOrThrow({ where: { code: data.roleCode } });
    return this.prisma.nguoiDung.create({
      data: {
        username: data.username,
        email: data.email,
        fullName: data.fullName,
        passwordHash: data.passwordHash,
        isActive: false,
        userRoles: { create: { roleId: role.id } },
      },
    });
  }

  async activate(userId: number) {
    return this.prisma.nguoiDung.update({ where: { id: userId }, data: { isActive: true } });
  }

  async updatePassword(userId: number, passwordHash: string) {
    return this.prisma.nguoiDung.update({ where: { id: userId }, data: { passwordHash } });
  }

  async getRoleCodes(userId: number): Promise<string[]> {
    const roles = await this.prisma.nguoiDungVaiTro.findMany({
      where: { userId },
      include: { role: true },
    });
    return roles.map((r) => r.role.code);
  }

  async findOrThrow(id: number) {
    const user = await this.prisma.nguoiDung.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('Người dùng không tồn tại');
    }
    return user;
  }
}
