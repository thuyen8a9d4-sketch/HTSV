import { Injectable, NotFoundException } from '@nestjs/common';
import { CorePrismaService } from '../../core-prisma/core-prisma.service';
import { BaoCaoStatus } from '../../generated/core-client';

@Injectable()
export class ModerationService {
  constructor(private readonly prisma: CorePrismaService) {}

  findAllReports() {
    return this.prisma.baoCao.findMany({
      include: { confession: true, comment: true, reporterUser: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async setReportStatus(id: number, status: BaoCaoStatus) {
    const report = await this.prisma.baoCao.findUnique({ where: { id } });
    if (!report) throw new NotFoundException('Không tìm thấy báo cáo');
    return this.prisma.baoCao.update({ where: { id }, data: { status } });
  }

  findAllLogs() {
    return this.prisma.nhatKyKiemDuyet.findMany({
      include: { confession: true, moderatorUser: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}
