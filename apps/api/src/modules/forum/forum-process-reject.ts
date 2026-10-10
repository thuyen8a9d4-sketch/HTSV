import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { ProcessInput, ProcessStep } from '../../common/process';
import { CorePrismaService } from '../../core-prisma/core-prisma.service';
import { ConfessionStatus, KiemDuyetAction } from '../../generated/core-client';

export interface RejectPostInput extends ProcessInput {
  postId: number;
  moderatorUserId: number;
  reason: string;
  prisma?: CorePrismaService;
  post?: { id: number; status: string };
}

export const rejectFindPostStep: ProcessStep<RejectPostInput> = {
  name: 'reject-find-post',
  async validate(input: RejectPostInput) {
    return !!(input.postId && input.moderatorUserId && input.reason);
  },
  async execute(input: RejectPostInput) {
    const post = await input.prisma!.baiConfession.findUnique({
      where: { id: input.postId },
    });
    if (!post) {
      throw new NotFoundException('Không tìm thấy bài đăng');
    }
    return { ...input, post };
  },
};

export const rejectCheckStatusStep: ProcessStep<RejectPostInput> = {
  name: 'reject-check-status',
  async validate(input: RejectPostInput) {
    return !!input.post;
  },
  async execute(input: RejectPostInput) {
    if (input.post!.status === ConfessionStatus.REJECTED) {
      throw new ForbiddenException('Bài đăng đã bị từ chối');
    }
    return input;
  },
};

export const rejectUpdateAndLogStep: ProcessStep<RejectPostInput> = {
  name: 'reject-update-and-log',
  async validate(input: RejectPostInput) {
    return !!input.post;
  },
  async execute(input: RejectPostInput) {
    const oldStatus = input.post!.status;
    await Promise.all([
      input.prisma!.baiConfession.update({
        where: { id: input.postId },
        data: {
          status: ConfessionStatus.REJECTED,
          rejectReason: input.reason,
        },
      }),
      input.prisma!.nhatKyKiemDuyet.create({
        data: {
          confessionId: input.postId,
          moderatorUserId: input.moderatorUserId,
          action: KiemDuyetAction.REJECT,
          oldStatus,
          newStatus: ConfessionStatus.REJECTED,
        },
      }),
    ]);
    return input;
  },
};
