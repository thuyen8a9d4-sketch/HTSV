import { Injectable, NotFoundException } from '@nestjs/common';
import { CorePrismaService } from '../../core-prisma/core-prisma.service';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { PermissionsOrchestrator } from './permissions-orchestrator';

@Injectable()
export class PermissionsService {
  constructor(
    private readonly prisma: CorePrismaService,
    private readonly orchestrator: PermissionsOrchestrator,
  ) {}

  findAll() {
    return this.prisma.quyen.findMany({ orderBy: { id: 'asc' } });
  }

  async findOne(id: number) {
    const permission = await this.prisma.quyen.findUnique({ where: { id } });
    if (!permission) throw new NotFoundException('Không tìm thấy quyền');
    return permission;
  }

  create(dto: CreatePermissionDto) {
    return this.prisma.quyen.create({ data: dto });
  }

  async update(id: number, dto: UpdatePermissionDto) {
    await this.findOne(id);
    return this.prisma.quyen.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.orchestrator.orchestrateRemovePermission(id);
  }
}
