import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { CorePrismaService } from '../../core-prisma/core-prisma.service';
import { ConfessionStatus, KiemDuyetAction } from '../../generated/core-client';
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

  async findPostById(id: number, isAdmin: boolean) {
    const post = await this.prisma.baiConfession.findUnique({
      where: { id },
      include: {
        authorUser: { select: { id: true, username: true, fullName: true } },
        category: true,
        binhLuans: {
          include: { authorUser: { select: { id: true, username: true, fullName: true } } },
          orderBy: { createdAt: 'asc' },
        },
        _count: { select: { luotThiches: true } },
      },
    });
    if (!post) throw new NotFoundException('Không tìm thấy bài đăng');
    if (post.status !== ConfessionStatus.APPROVED && !isAdmin) {
      throw new NotFoundException('Không tìm thấy bài đăng');
    }
    return sanitizeAuthor(post);
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

  async toggleLike(confessionId: number, userId: number) {
    const existing = await this.prisma.luotThich.findFirst({
      where: { confessionId, userId, type: 'LIKE' },
    });
    if (existing) {
      await this.prisma.luotThich.delete({ where: { id: existing.id } });
      return { liked: false };
    }
    await this.prisma.luotThich.create({ data: { confessionId, userId, type: 'LIKE' } });
    return { liked: true };
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
