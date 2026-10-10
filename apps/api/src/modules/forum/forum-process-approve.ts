import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { ProcessInput, ProcessStep } from '../../common/process';
import { CorePrismaService } from '../../core-prisma/core-prisma.service';
import { ConfessionStatus, KiemDuyetAction } from '../../generated/core-client';

export interface ApprovePostInput extends ProcessInput {
  postId: number;
  moderatorUserId: number;
  prisma?: CorePrismaService;
  post?: { id: number; status: string };
}

export const approveFindPostStep: ProcessStep<ApprovePostInput> = {
  name: 'approve-find-post',
  async validate(input: ApprovePostInput) {
    return !!(input.postId && input.moderatorUserId);
  },
  async execute(input: ApprovePostInput) {
    const post = await input.prisma!.baiConfession.findUnique({
      where: { id: input.postId },
    });
    if (!post) {
      throw new NotFoundException('Không tìm thấy bài đăng');
    }
    return { ...input, post };
  },
};

export const approveCheckStatusStep: ProcessStep<ApprovePostInput> = {
  name: 'approve-check-status',
  async validate(input: ApprovePostInput) {
    return !!input.post;
  },
  async execute(input: ApprovePostInput) {
    if (input.post!.status === ConfessionStatus.APPROVED) {
      throw new ForbiddenException('Bài đăng đã được duyệt');
    }
    return input;
  },
};

export const approveUpdateAndLogStep: ProcessStep<ApprovePostInput> = {
  name: 'approve-update-and-log',
  async validate(input: ApprovePostInput) {
    return !!input.post;
  },
  async execute(input: ApprovePostInput) {
    const oldStatus = input.post!.status;
    await Promise.all([
      input.prisma!.baiConfession.update({
        where: { id: input.postId },
        data: {
          status: ConfessionStatus.APPROVED,
          approvedAt: new Date(),
          approvedByUserId: input.moderatorUserId,
          rejectReason: null,
        },
      }),
      input.prisma!.nhatKyKiemDuyet.create({
        data: {
          confessionId: input.postId,
          moderatorUserId: input.moderatorUserId,
          action: KiemDuyetAction.APPROVE,
          oldStatus,
          newStatus: ConfessionStatus.APPROVED,
        },
      }),
    ]);
    return input;
  },
};
