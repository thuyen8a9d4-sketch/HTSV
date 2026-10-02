import { Injectable } from '@nestjs/common';
import { CorePrismaService } from '../../core-prisma/core-prisma.service';
import { BaoCaoStatus, ConfessionStatus } from '../../generated/core-client';

@Injectable()
export class DashboardService {
  constructor(private readonly prisma: CorePrismaService) {}

  async getSummary() {
    const [
      postCount,
      pendingPostCount,
      commentCount,
      openReportCount,
      accountCount,
    ] = await Promise.all([
      this.prisma.baiConfession.count(),
      this.prisma.baiConfession.count({
        where: { status: ConfessionStatus.PENDING },
      }),
      this.prisma.binhLuan.count(),
      this.prisma.baoCao.count({ where: { status: BaoCaoStatus.OPEN } }),
      this.prisma.nguoiDung.count(),
    ]);

    return {
      postCount,
      pendingPostCount,
      commentCount,
      openReportCount,
      accountCount,
    };
  }
}
