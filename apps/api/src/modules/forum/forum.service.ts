import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CorePrismaService } from '../../core-prisma/core-prisma.service';
import { ConfessionStatus, KiemDuyetAction, LikeType, Prisma } from '../../generated/core-client';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateReportDto } from './dto/create-report.dto';
import { RejectPostDto } from './dto/reject-post.dto';

function sanitizeAuthor(post: any) {
  if (post.isAnonymous) {
    return { ...post, authorUser: null };
  }
  return post;
}

function summarizeReactions(post: any, viewerId?: number) {
  const reactions: Record<string, number> = {};
  let myReaction: string | null = null;
  for (const r of post.luotThiches as { type: string; userId: number }[]) {
    reactions[r.type] = (reactions[r.type] ?? 0) + 1;
    if (viewerId != null && r.userId === viewerId) myReaction = r.type;
  }
  const { luotThiches, ...rest } = post;
  return { ...rest, reactions, myReaction };
}

const REACTION_SELECT = { select: { type: true, userId: true } } as const;

@Injectable()
export class ForumService {
  constructor(private readonly prisma: CorePrismaService) {}

  async findApprovedPosts() {
    const posts = await this.prisma.baiConfession.findMany({
      where: { status: ConfessionStatus.APPROVED },
      include: {
        authorUser: { select: { id: true, username: true, fullName: true } },
        category: true,
        _count: { select: { binhLuans: true, luotThiches: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return posts.map(sanitizeAuthor);
  }

  async findPostById(id: number, viewer: { userId: number; roles: string[] } | null) {
    const post = await this.prisma.baiConfession.findUnique({
      where: { id },
      include: {
        authorUser: { select: { id: true, username: true, fullName: true } },
        category: true,
        binhLuans: {
          include: { authorUser: { select: { id: true, username: true, fullName: true } } },
          orderBy: { createdAt: 'asc' },
        },
        luotThiches: REACTION_SELECT,
      },
    });
    if (!post) throw new NotFoundException('Không tìm thấy bài đăng');
    const isOwner = viewer?.userId === post.authorUserId;
    const isAdmin = viewer?.roles.includes('ADMIN') ?? false;
    if (post.status !== ConfessionStatus.APPROVED && !isOwner && !isAdmin) {
      throw new NotFoundException('Không tìm thấy bài đăng');
    }
    return summarizeReactions(sanitizeAuthor(post), viewer?.userId);
  }

  createPost(authorUserId: number, dto: CreatePostDto) {
    return this.prisma.baiConfession.create({
      data: {
        authorUserId,
        categoryId: dto.categoryId,
        content: dto.content,
        isAnonymous: dto.isAnonymous ?? false,
        status: ConfessionStatus.PENDING,
      },
    });
  }

  async createComment(confessionId: number, authorUserId: number, dto: CreateCommentDto) {
    const post = await this.prisma.baiConfession.findUnique({ where: { id: confessionId } });
    if (!post || post.status !== ConfessionStatus.APPROVED) {
      throw new NotFoundException('Không tìm thấy bài đăng');
    }
    return this.prisma.binhLuan.create({
      data: {
        confessionId,
        authorUserId,
        content: dto.content,
        isAnonymous: dto.isAnonymous ?? false,
      },
    });
  }

  async react(confessionId: number, userId: number, type: LikeType) {
    const post = await this.prisma.baiConfession.findUnique({ where: { id: confessionId } });
    if (!post || post.status !== ConfessionStatus.APPROVED) {
      throw new NotFoundException('Không tìm thấy bài đăng');
    }

    await this.applyReaction(confessionId, userId, type);

    const reactions = await this.prisma.luotThich.groupBy({
      by: ['type'],
      where: { confessionId },
      _count: true,
    });
    const myReaction = await this.prisma.luotThich.findUnique({
      where: { confessionId_userId: { confessionId, userId } },
    });
    return {
      reactions: Object.fromEntries(reactions.map((r) => [r.type, r._count])),
      myReaction: myReaction?.type ?? null,
    };
  }

  /**
   * Read-then-write toggle (create/switch/remove) done as one serializable
   * transaction and retried on conflict, so concurrent clicks from the same
   * user can never surface as an unhandled unique-constraint or
   * record-not-found error regardless of which branch races.
   */
  private async applyReaction(
    confessionId: number,
    userId: number,
    type: LikeType,
    attempt = 0,
  ): Promise<void> {
    try {
      await this.prisma.$transaction(
        async (tx) => {
          const existing = await tx.luotThich.findUnique({
            where: { confessionId_userId: { confessionId, userId } },
          });
          if (!existing) {
            await tx.luotThich.create({ data: { confessionId, userId, type } });
          } else if (existing.type === type) {
            await tx.luotThich.delete({ where: { id: existing.id } });
          } else {
            await tx.luotThich.update({ where: { id: existing.id }, data: { type } });
          }
        },
        { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
      );
    } catch (e) {
      const isConflict =
        e instanceof Prisma.PrismaClientKnownRequestError &&
        ['P2002', 'P2025', 'P2034'].includes(e.code);
      if (isConflict && attempt < 3) {
        return this.applyReaction(confessionId, userId, type, attempt + 1);
      }
      throw e;
    }
  }

  async share(confessionId: number) {
    const post = await this.prisma.baiConfession.findUnique({ where: { id: confessionId } });
    if (!post || post.status !== ConfessionStatus.APPROVED) {
      throw new NotFoundException('Không tìm thấy bài đăng');
    }
    const updated = await this.prisma.baiConfession.update({
      where: { id: confessionId },
      data: { shareCount: { increment: 1 } },
    });
    return { shareCount: updated.shareCount };
  }

  createReport(reporterUserId: number, dto: CreateReportDto) {
    return this.prisma.baoCao.create({
      data: {
        confessionId: dto.confessionId,
        commentId: dto.commentId,
        reporterUserId,
        reason: dto.reason,
      },
    });
  }

  findAllPostsAdmin() {
    return this.prisma.baiConfession.findMany({
      include: { authorUser: true, category: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async approvePost(id: number, moderatorUserId: number) {
    const post = await this.getPostOrThrow(id);
    if (post.status === ConfessionStatus.APPROVED) {
      throw new ForbiddenException('Bài đăng đã được duyệt');
    }
    const updated = await this.prisma.baiConfession.update({
      where: { id },
      data: {
        status: ConfessionStatus.APPROVED,
        approvedAt: new Date(),
        approvedByUserId: moderatorUserId,
        rejectReason: null,
      },
    });
    await this.logModeration(id, moderatorUserId, KiemDuyetAction.APPROVE, post.status, updated.status);
    return updated;
  }

  async rejectPost(id: number, moderatorUserId: number, dto: RejectPostDto) {
    const post = await this.getPostOrThrow(id);
    if (post.status === ConfessionStatus.REJECTED) {
      throw new ForbiddenException('Bài đăng đã bị từ chối');
    }
    const updated = await this.prisma.baiConfession.update({
      where: { id },
      data: {
        status: ConfessionStatus.REJECTED,
        rejectReason: dto.reason,
      },
    });
    await this.logModeration(id, moderatorUserId, KiemDuyetAction.REJECT, post.status, updated.status);
    return updated;
  }

  private async getPostOrThrow(id: number) {
    const post = await this.prisma.baiConfession.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('Không tìm thấy bài đăng');
    return post;
  }

  private logModeration(
    confessionId: number,
    moderatorUserId: number,
    action: KiemDuyetAction,
    oldStatus: string,
    newStatus: string,
  ) {
    return this.prisma.nhatKyKiemDuyet.create({
      data: { confessionId, moderatorUserId, action, oldStatus, newStatus },
    });
  }

  findAllCategories() {
    return this.prisma.danhMucConfession.findMany({ orderBy: { name: 'asc' } });
  }

  createCategory(dto: CreateCategoryDto) {
    return this.prisma.danhMucConfession.create({ data: dto });
  }

  async removeCategory(id: number) {
    const category = await this.prisma.danhMucConfession.findUnique({ where: { id } });
    if (!category) throw new NotFoundException('Không tìm thấy danh mục');
    await this.prisma.danhMucConfession.delete({ where: { id } });
  }
}
