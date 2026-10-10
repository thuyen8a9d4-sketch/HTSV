import { Injectable, NotFoundException } from '@nestjs/common';
import { CorePrismaService } from '../../core-prisma/core-prisma.service';
import { AssignPermissionsDto } from './dto/assign-permissions.dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RolesOrchestrator } from './roles-orchestrator';

@Injectable()
export class RolesService {
  constructor(
    private readonly prisma: CorePrismaService,
    private readonly orchestrator: RolesOrchestrator,
  ) {}

  findAll() {
    return this.prisma.vaiTro.findMany({
      include: { rolePermissions: { include: { permission: true } } },
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const role = await this.prisma.vaiTro.findUnique({
      where: { id },
      include: { rolePermissions: { include: { permission: true } } },
    });
    if (!role) throw new NotFoundException('Không tìm thấy vai trò');
    return role;
  }

  create(dto: CreateRoleDto) {
    return this.prisma.vaiTro.create({ data: dto });
  }

  async update(id: number, dto: UpdateRoleDto) {
    await this.findOne(id);
    return this.prisma.vaiTro.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.orchestrator.orchestrateRemoveRole(id);
  }

  async assignPermissions(id: number, dto: AssignPermissionsDto) {
    await this.orchestrator.orchestrateAssignPermissions(id, dto.permissionIds);
    return this.findOne(id);
  }
}
