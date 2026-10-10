import { Injectable, NotFoundException } from '@nestjs/common';
import { CorePrismaService } from '../../core-prisma/core-prisma.service';
import { ConfessionStatus, LikeType } from '../../generated/core-client';
import { ForumOrchestrator } from './forum-orchestrator';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateReportDto } from './dto/create-report.dto';
import { RejectPostDto } from './dto/reject-post.dto';

function sanitizeAuthor<
  T extends { isAnonymous: boolean; authorUser: unknown },
>(post: T): T {
  if (post.isAnonymous) {
    return { ...post, authorUser: null };
  }
  return post;
}

@Injectable()
export class ForumService {
  constructor(
    private readonly prisma: CorePrismaService,
    private readonly orchestrator: ForumOrchestrator,
  ) {}

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

  async findPostById(
    id: number,
    viewer: { userId: number; roles: string[] } | null,
  ) {
    const post = await this.prisma.baiConfession.findUnique({
      where: { id },
      include: {
        authorUser: { select: { id: true, username: true, fullName: true } },
        category: true,
        binhLuans: {
          include: {
            authorUser: {
              select: { id: true, username: true, fullName: true },
            },
          },
          orderBy: { createdAt: 'asc' },
        },
      },
    });
    if (!post) throw new NotFoundException('Không tìm thấy bài đăng');
    const isOwner = viewer?.userId === post.authorUserId;
    const isAdmin = viewer?.roles.includes('ADMIN') ?? false;
    if (post.status !== ConfessionStatus.APPROVED && !isOwner && !isAdmin) {
      throw new NotFoundException('Không tìm thấy bài đăng');
    }
    const [reactions, myReaction] = await Promise.all([
      this.getReactionCounts(id),
      viewer ? this.getMyReaction(id, viewer.userId) : Promise.resolve(null),
    ]);
    return { ...sanitizeAuthor(post), reactions, myReaction };
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

  async createComment(
    confessionId: number,
    authorUserId: number,
    dto: CreateCommentDto,
  ) {
    await this.getPostOrThrow(confessionId, { requireApproved: true });
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
    await this.orchestrator.orchestrateReact(confessionId, userId, type);
    const reactions = await this.getReactionCounts(confessionId);
    const myReaction = await this.getMyReaction(confessionId, userId);
    return { reactions, myReaction };
  }

  async share(confessionId: number) {
    // Atomically guard on status and bump the counter in one round trip,
    // so a post can't be un-approved between the check and the increment.
    const { count } = await this.prisma.baiConfession.updateMany({
      where: { id: confessionId, status: ConfessionStatus.APPROVED },
      data: { shareCount: { increment: 1 } },
    });
    if (count === 0) throw new NotFoundException('Không tìm thấy bài đăng');
    const post = await this.prisma.baiConfession.findUniqueOrThrow({
      where: { id: confessionId },
      select: { shareCount: true },
    });
    return { shareCount: post.shareCount };
  }

  private async getReactionCounts(
    confessionId: number,
  ): Promise<Record<string, number>> {
    const groups = await this.prisma.luotThich.groupBy({
      by: ['type'],
      where: { confessionId },
      _count: true,
    });
    return Object.fromEntries(groups.map((g) => [g.type, g._count]));
  }

  private async getMyReaction(
    confessionId: number,
    userId: number,
  ): Promise<LikeType | null> {
    const reaction = await this.prisma.luotThich.findUnique({
      where: { confessionId_userId: { confessionId, userId } },
    });
    return reaction?.type ?? null;
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
    await this.orchestrator.orchestrateApprovePost({
      postId: id,
      moderatorUserId,
    });
  }

  async rejectPost(id: number, moderatorUserId: number, dto: RejectPostDto) {
    await this.orchestrator.orchestrateRejectPost({
      postId: id,
      moderatorUserId,
      reason: dto.reason,
    });
  }

  private async getPostOrThrow(
    id: number,
    opts?: { requireApproved?: boolean },
  ) {
    const post = await this.prisma.baiConfession.findUnique({ where: { id } });
    if (!post) throw new NotFoundException('Không tìm thấy bài đăng');
    if (opts?.requireApproved && post.status !== ConfessionStatus.APPROVED) {
      throw new NotFoundException('Không tìm thấy bài đăng');
    }
    return post;
  }

  findAllCategories() {
    return this.prisma.danhMucConfession.findMany({ orderBy: { name: 'asc' } });
  }

  createCategory(dto: CreateCategoryDto) {
    return this.prisma.danhMucConfession.create({ data: dto });
  }

  async removeCategory(id: number) {
    const category = await this.prisma.danhMucConfession.findUnique({
      where: { id },
    });
    if (!category) throw new NotFoundException('Không tìm thấy danh mục');
    await this.prisma.danhMucConfession.delete({ where: { id } });
  }
}
