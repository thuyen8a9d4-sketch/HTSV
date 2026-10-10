import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ProcessInput, ProcessStep } from '../../common/process';
import { CorePrismaService } from '../../core-prisma/core-prisma.service';

const CORE_SYSTEM_ROLE_CODES = ['ADMIN', 'LECTURER', 'STUDENT'];

/**
 * REMOVE ROLE FLOW
 */

export interface RemoveRoleInput extends ProcessInput {
  roleId: number;
  prisma?: CorePrismaService;
  role?: { id: number; code: string };
}

export const findRoleForRemovalStep: ProcessStep<RemoveRoleInput> = {
  name: 'find-role-for-removal',
  async validate(input: RemoveRoleInput) {
    return !!input.roleId;
  },
  async execute(input: RemoveRoleInput) {
    const role = await input.prisma!.vaiTro.findUnique({
      where: { id: input.roleId },
    });
    if (!role) {
      throw new NotFoundException('Không tìm thấy vai trò');
    }
    return { ...input, role };
  },
};

export const checkSystemRoleStep: ProcessStep<RemoveRoleInput> = {
  name: 'check-system-role',
  async validate(input: RemoveRoleInput) {
    return !!input.role;
  },
  async execute(input: RemoveRoleInput) {
    if (CORE_SYSTEM_ROLE_CODES.includes(input.role!.code)) {
      throw new BadRequestException(
        `Không thể xóa vai trò hệ thống "${input.role!.code}"`,
      );
    }
    return input;
  },
};

export const deleteRoleStep: ProcessStep<RemoveRoleInput> = {
  name: 'delete-role',
  async validate(input: RemoveRoleInput) {
    return !!input.role;
  },
  async execute(input: RemoveRoleInput) {
    await input.prisma!.vaiTro.delete({ where: { id: input.roleId } });
    return input;
  },
};

/**
 * ASSIGN PERMISSIONS FLOW
 */

export interface AssignPermissionsInput extends ProcessInput {
  roleId: number;
  permissionIds: number[];
  prisma?: CorePrismaService;
  role?: { id: number };
}

export const findRoleForAssignStep: ProcessStep<AssignPermissionsInput> = {
  name: 'find-role-for-assign',
  async validate(input: AssignPermissionsInput) {
    return !!(input.roleId && input.permissionIds && input.permissionIds.length > 0);
  },
  async execute(input: AssignPermissionsInput) {
    const role = await input.prisma!.vaiTro.findUnique({
      where: { id: input.roleId },
    });
    if (!role) {
      throw new NotFoundException('Không tìm thấy vai trò');
    }
    return { ...input, role };
  },
};

export const clearOldPermissionsStep: ProcessStep<AssignPermissionsInput> = {
  name: 'clear-old-permissions',
  async validate(input: AssignPermissionsInput) {
    return !!input.role;
  },
  async execute(input: AssignPermissionsInput) {
    await input.prisma!.vaiTroQuyen.deleteMany({
      where: { roleId: input.roleId },
    });
    return input;
  },
};

export const assignNewPermissionsStep: ProcessStep<AssignPermissionsInput> = {
  name: 'assign-new-permissions',
  async validate(input: AssignPermissionsInput) {
    return !!input.role;
  },
  async execute(input: AssignPermissionsInput) {
    if (input.permissionIds.length > 0) {
      await input.prisma!.vaiTroQuyen.createMany({
        data: input.permissionIds.map((permissionId) => ({
          roleId: input.roleId,
          permissionId,
        })),
      });
    }
    return input;
  },
};
