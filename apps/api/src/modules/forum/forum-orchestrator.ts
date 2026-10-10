import { Injectable, Logger } from '@nestjs/common';
import { createProcessOrchestrator, ProcessOrchestrator } from '../../common/process';
import { CorePrismaService } from '../../core-prisma/core-prisma.service';
import { LikeType } from '../../generated/core-client';
import {
  ApprovePostInput,
  approveFindPostStep,
  approveCheckStatusStep,
  approveUpdateAndLogStep,
} from './forum-process-approve';
import {
  RejectPostInput,
  rejectFindPostStep,
  rejectCheckStatusStep,
  rejectUpdateAndLogStep,
} from './forum-process-reject';
import {
  ReactInput,
  reactFindPostStep,
  reactCheckApprovedStep,
  reactCheckExistingStep,
  reactUpsertStep,
} from './forum-process-react';

@Injectable()
export class ForumOrchestrator {
  private readonly logger = new Logger(ForumOrchestrator.name);

  constructor(private readonly prisma: CorePrismaService) {}

  async orchestrateApprovePost(
    input: Omit<ApprovePostInput, 'prisma'>,
  ): Promise<void> {
    this.logger.debug('[ApprovePost] Starting...');
    const orchestrator: ProcessOrchestrator<ApprovePostInput> =
      createProcessOrchestrator();

    orchestrator.addStep(approveFindPostStep);
    orchestrator.addStep(approveCheckStatusStep);
    orchestrator.addStep(approveUpdateAndLogStep);

    const result = await orchestrator.run({
      ...input,
      prisma: this.prisma,
    } as ApprovePostInput);

    if (!result.success) {
      this.logger.error(`[ApprovePost] Failed: ${result.error}`);
      throw new Error(result.error);
    }

    this.logger.debug('[ApprovePost] Completed');
  }

  async orchestrateRejectPost(
    input: Omit<RejectPostInput, 'prisma'>,
  ): Promise<void> {
    this.logger.debug('[RejectPost] Starting...');
    const orchestrator: ProcessOrchestrator<RejectPostInput> =
      createProcessOrchestrator();

    orchestrator.addStep(rejectFindPostStep);
    orchestrator.addStep(rejectCheckStatusStep);
    orchestrator.addStep(rejectUpdateAndLogStep);

    const result = await orchestrator.run({
      ...input,
      prisma: this.prisma,
    } as RejectPostInput);

    if (!result.success) {
      this.logger.error(`[RejectPost] Failed: ${result.error}`);
      throw new Error(result.error);
    }

    this.logger.debug('[RejectPost] Completed');
  }

  async orchestrateReact(
    postId: number,
    userId: number,
    type: LikeType,
  ): Promise<void> {
    this.logger.debug('[React] Starting...');
    const orchestrator: ProcessOrchestrator<ReactInput> =
      createProcessOrchestrator();

    orchestrator.addStep(reactFindPostStep);
    orchestrator.addStep(reactCheckApprovedStep);
    orchestrator.addStep(reactCheckExistingStep);
    orchestrator.addStep(reactUpsertStep);

    const result = await orchestrator.run({
      postId,
      userId,
      type,
      prisma: this.prisma,
    } as ReactInput);

    if (!result.success) {
      this.logger.error(`[React] Failed: ${result.error}`);
      throw new Error(result.error);
    }

    this.logger.debug('[React] Completed');
  }
}
