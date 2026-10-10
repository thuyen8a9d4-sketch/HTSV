import { NotFoundException } from '@nestjs/common';
import { ProcessInput, ProcessStep } from '../../common/process';
import { CorePrismaService } from '../../core-prisma/core-prisma.service';

export interface RemovePermissionInput extends ProcessInput {
  permissionId: number;
  prisma?: CorePrismaService;
  permission?: { id: number };
}

export const findPermissionStep: ProcessStep<RemovePermissionInput> = {
  name: 'find-permission',
  async validate(input: RemovePermissionInput) {
    return !!input.permissionId;
  },
  async execute(input: RemovePermissionInput) {
    const permission = await input.prisma!.quyen.findUnique({
      where: { id: input.permissionId },
    });
    if (!permission) {
      throw new NotFoundException('Không tìm thấy quyền');
    }
    return { ...input, permission };
  },
};

export const deletePermissionStep: ProcessStep<RemovePermissionInput> = {
  name: 'delete-permission',
  async validate(input: RemovePermissionInput) {
    return !!input.permission;
  },
  async execute(input: RemovePermissionInput) {
    await input.prisma!.quyen.delete({
      where: { id: input.permissionId },
    });
    return input;
  },
};
