import { Injectable, Logger } from '@nestjs/common';
import { createProcessOrchestrator, ProcessOrchestrator } from '../../common/process';
import { CorePrismaService } from '../../core-prisma/core-prisma.service';
import { BaoCaoStatus } from '../../generated/core-client';
import {
  SetReportStatusInput,
  findReportStep,
  updateReportStatusStep,
} from './moderation-process-steps';

@Injectable()
export class ModerationOrchestrator {
  private readonly logger = new Logger(ModerationOrchestrator.name);

  constructor(private readonly prisma: CorePrismaService) {}

  async orchestrateSetReportStatus(
    reportId: number,
    status: BaoCaoStatus,
  ): Promise<void> {
    this.logger.debug('[SetReportStatus] Starting...');
    const orchestrator: ProcessOrchestrator<SetReportStatusInput> =
      createProcessOrchestrator();

    orchestrator.addStep(findReportStep);
    orchestrator.addStep(updateReportStatusStep);

    const result = await orchestrator.run({
      reportId,
      status,
      prisma: this.prisma,
    } as SetReportStatusInput);

    if (!result.success) {
      this.logger.error(`[SetReportStatus] Failed: ${result.error}`);
      throw new Error(result.error);
    }

    this.logger.debug('[SetReportStatus] Completed');
  }
}
