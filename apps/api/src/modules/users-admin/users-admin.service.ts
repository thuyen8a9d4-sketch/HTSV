import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import * as argon2 from 'argon2';
import { CorePrismaService } from '../../core-prisma/core-prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersAdminService {
  constructor(private readonly prisma: CorePrismaService) {}

  findAll() {
    return this.prisma.nguoiDung.findMany({
      include: { userRoles: { include: { role: true } } },
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.nguoiDung.findUnique({
      where: { id },
      include: { userRoles: { include: { role: true } } },
    });
    if (!user) throw new NotFoundException('Không tìm thấy người dùng');
    return user;
  }

  async create(dto: CreateUserDto) {
    const existing = await this.prisma.nguoiDung.findFirst({
      where: { OR: [{ username: dto.username }, { email: dto.email }] },
    });
    if (existing) throw new ConflictException('Tên đăng nhập hoặc email đã tồn tại');

    const passwordHash = await argon2.hash(dto.password);
    return this.prisma.nguoiDung.create({
      data: {
        username: dto.username,
        email: dto.email,
        fullName: dto.fullName,
        passwordHash,
        isActive: true,
        userRoles: dto.roleIds
          ? { create: dto.roleIds.map((roleId) => ({ roleId })) }
          : undefined,
      },
      include: { userRoles: { include: { role: true } } },
    });
  }

  async update(id: number, dto: UpdateUserDto) {
    await this.findOne(id);
    if (dto.roleIds) {
      await this.prisma.nguoiDungVaiTro.deleteMany({ where: { userId: id } });
      await this.prisma.nguoiDungVaiTro.createMany({
        data: dto.roleIds.map((roleId) => ({ userId: id, roleId })),
      });
    }
    return this.prisma.nguoiDung.update({
      where: { id },
      data: {
        email: dto.email,
        fullName: dto.fullName,
        isActive: dto.isActive,
      },
      include: { userRoles: { include: { role: true } } },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.nguoiDung.delete({ where: { id } });
  }
}
