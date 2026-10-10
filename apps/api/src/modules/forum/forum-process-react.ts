import { NotFoundException } from '@nestjs/common';
import { ProcessInput, ProcessStep } from '../../common/process';
import { CorePrismaService } from '../../core-prisma/core-prisma.service';
import { ConfessionStatus, LikeType } from '../../generated/core-client';

export interface ReactInput extends ProcessInput {
  postId: number;
  userId: number;
  type: LikeType;
  prisma?: CorePrismaService;
  post?: { id: number; status: string };
  existing?: { confessionId: number; type: LikeType } | null;
}

export const reactFindPostStep: ProcessStep<ReactInput> = {
  name: 'react-find-post',
  async validate(input: ReactInput) {
    return !!(input.postId && input.userId && input.type);
  },
  async execute(input: ReactInput) {
    const post = await input.prisma!.baiConfession.findUnique({
      where: { id: input.postId },
    });
    if (!post) {
      throw new NotFoundException('Không tìm thấy bài đăng');
    }
    return { ...input, post };
  },
};

export const reactCheckApprovedStep: ProcessStep<ReactInput> = {
  name: 'react-check-approved',
  async validate(input: ReactInput) {
    return !!input.post;
  },
  async execute(input: ReactInput) {
    if (input.post!.status !== ConfessionStatus.APPROVED) {
      throw new NotFoundException('Không khả dụng');
    }
    return input;
  },
};

export const reactCheckExistingStep: ProcessStep<ReactInput> = {
  name: 'react-check-existing',
  async validate(input: ReactInput) {
    return !!input.post;
  },
  async execute(input: ReactInput) {
    const existing = await input.prisma!.luotThich.findUnique({
      where: {
        confessionId_userId: { confessionId: input.postId, userId: input.userId },
      },
    });
    return { ...input, existing };
  },
};

export const reactUpsertStep: ProcessStep<ReactInput> = {
  name: 'react-upsert',
  async validate(input: ReactInput) {
    return !!input.post;
  },
  async execute(input: ReactInput) {
    if (input.existing && input.existing.type === input.type) {
      await input.prisma!.luotThich.delete({
        where: {
          confessionId_userId: {
            confessionId: input.postId,
            userId: input.userId,
          },
        },
      });
    } else if (input.existing) {
      await input.prisma!.luotThich.update({
        where: {
          confessionId_userId: {
            confessionId: input.postId,
            userId: input.userId,
          },
        },
        data: { type: input.type },
      });
    } else {
      await input.prisma!.luotThich.create({
        data: {
          confessionId: input.postId,
          userId: input.userId,
          type: input.type,
        },
      });
    }
    return input;
  },
};
