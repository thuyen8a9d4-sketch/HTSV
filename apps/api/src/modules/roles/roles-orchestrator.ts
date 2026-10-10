import { Injectable, Logger } from '@nestjs/common';
import { createProcessOrchestrator, ProcessOrchestrator } from '../../common/process';
import { CorePrismaService } from '../../core-prisma/core-prisma.service';
import {
  RemoveRoleInput,
  findRoleForRemovalStep,
  checkSystemRoleStep,
  deleteRoleStep,
  AssignPermissionsInput,
  findRoleForAssignStep,
  clearOldPermissionsStep,
  assignNewPermissionsStep,
} from './roles-process-steps';

@Injectable()
export class RolesOrchestrator {
  private readonly logger = new Logger(RolesOrchestrator.name);

  constructor(private readonly prisma: CorePrismaService) {}

  async orchestrateRemoveRole(roleId: number): Promise<void> {
    this.logger.debug('[RemoveRole] Starting...');
    const orchestrator: ProcessOrchestrator<RemoveRoleInput> =
      createProcessOrchestrator();

    orchestrator.addStep(findRoleForRemovalStep);
    orchestrator.addStep(checkSystemRoleStep);
    orchestrator.addStep(deleteRoleStep);

    const result = await orchestrator.run({
      roleId,
      prisma: this.prisma,
    } as RemoveRoleInput);

    if (!result.success) {
      this.logger.error(`[RemoveRole] Failed: ${result.error}`);
      throw new Error(result.error);
    }

    this.logger.debug('[RemoveRole] Completed');
  }

  async orchestrateAssignPermissions(
    roleId: number,
    permissionIds: number[],
  ): Promise<void> {
    this.logger.debug('[AssignPermissions] Starting...');
    const orchestrator: ProcessOrchestrator<AssignPermissionsInput> =
      createProcessOrchestrator();

    orchestrator.addStep(findRoleForAssignStep);
    orchestrator.addStep(clearOldPermissionsStep);
    orchestrator.addStep(assignNewPermissionsStep);

    const result = await orchestrator.run({
      roleId,
      permissionIds,
      prisma: this.prisma,
    } as AssignPermissionsInput);

    if (!result.success) {
      this.logger.error(`[AssignPermissions] Failed: ${result.error}`);
      throw new Error(result.error);
    }

    this.logger.debug('[AssignPermissions] Completed');
  }
}
