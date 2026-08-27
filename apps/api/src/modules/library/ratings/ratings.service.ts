import { Injectable } from '@nestjs/common';
import { AcademicPrismaService } from '../../../academic-prisma/academic-prisma.service';
import { UsersService } from '../../users/users.service';
import { CreateRatingDto } from './dto/create-rating.dto';

@Injectable()
export class RatingsService {
  constructor(
    private readonly prisma: AcademicPrismaService,
    private readonly usersService: UsersService,
  ) {}

  async findForMaterial(materialId: number) {
    const ratings = await this.prisma.danhGiaTaiLieu.findMany({
      where: { materialId },
      orderBy: { createdAt: 'desc' },
    });
    return this.usersService.attachOwners(
      ratings.map((r) => ({ ...r, ownerUserId: r.reviewerUserId })),
    );
  }

  async upsert(materialId: number, reviewerUserId: number, dto: CreateRatingDto) {
    await this.prisma.danhGiaTaiLieu.upsert({
      where: { materialId_reviewerUserId: { materialId, reviewerUserId } },
      update: { rating: dto.rating, comment: dto.comment },
      create: { materialId, reviewerUserId, rating: dto.rating, comment: dto.comment },
    });
    await this.recomputeAverage(materialId);
    return this.findForMaterial(materialId);
  }

  private async recomputeAverage(materialId: number) {
    const agg = await this.prisma.danhGiaTaiLieu.aggregate({
      where: { materialId },
      _avg: { rating: true },
      _count: { rating: true },
    });
    await this.prisma.taiLieu.update({
      where: { id: materialId },
      data: {
        averageRating: agg._avg.rating ?? null,
        ratingCount: agg._count.rating,
      },
    });
  }
}
