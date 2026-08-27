import { Injectable } from '@nestjs/common';
import { AcademicPrismaService } from '../../academic-prisma/academic-prisma.service';
import { CorePrismaService } from '../../core-prisma/core-prisma.service';
import { BaoCaoStatus, ConfessionStatus } from '../../generated/core-client';
import { OrderStatus } from '../../generated/academic-client';

@Injectable()
export class DashboardService {
  constructor(
    private readonly prisma: CorePrismaService,
    private readonly academicPrisma: AcademicPrismaService,
  ) {}

  async getSummary() {
    const [postCount, pendingPostCount, commentCount, openReportCount, accountCount] =
      await Promise.all([
        this.prisma.baiConfession.count(),
        this.prisma.baiConfession.count({ where: { status: ConfessionStatus.PENDING } }),
        this.prisma.binhLuan.count(),
        this.prisma.baoCao.count({ where: { status: BaoCaoStatus.OPEN } }),
        this.prisma.nguoiDung.count(),
      ]);

    const [bookCount, revenueAgg] = await Promise.all([
      this.academicPrisma.taiLieu.count(),
      this.academicPrisma.donHang.aggregate({
        where: { status: OrderStatus.PAID },
        _sum: { totalAmount: true },
      }),
    ]);

    return {
      postCount,
      pendingPostCount,
      commentCount,
      openReportCount,
      accountCount,
      bookCount,
      totalRevenue: revenueAgg._sum.totalAmount ?? 0,
    };
  }
}
