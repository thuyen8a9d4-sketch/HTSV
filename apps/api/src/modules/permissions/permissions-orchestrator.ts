import { Injectable, Logger } from '@nestjs/common';
import { createProcessOrchestrator, ProcessOrchestrator } from '../../common/process';
import { CorePrismaService } from '../../core-prisma/core-prisma.service';
import {
  RemovePermissionInput,
  findPermissionStep,
  deletePermissionStep,
} from './permissions-process-steps';

@Injectable()
export class PermissionsOrchestrator {
  private readonly logger = new Logger(PermissionsOrchestrator.name);

  constructor(private readonly prisma: CorePrismaService) {}

  async orchestrateRemovePermission(permissionId: number): Promise<void> {
    this.logger.debug('[RemovePermission] Starting...');
    const orchestrator: ProcessOrchestrator<RemovePermissionInput> =
      createProcessOrchestrator();

    orchestrator.addStep(findPermissionStep);
    orchestrator.addStep(deletePermissionStep);

    const result = await orchestrator.run({
      permissionId,
      prisma: this.prisma,
    } as RemovePermissionInput);

    if (!result.success) {
      this.logger.error(`[RemovePermission] Failed: ${result.error}`);
      throw new Error(result.error);
    }

    this.logger.debug('[RemovePermission] Completed');
  }
}
