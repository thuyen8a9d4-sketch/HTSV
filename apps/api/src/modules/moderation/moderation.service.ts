import { Injectable } from '@nestjs/common';
import { CorePrismaService } from '../../core-prisma/core-prisma.service';
import { BaoCaoStatus } from '../../generated/core-client';
import { ModerationOrchestrator } from './moderation-orchestrator';

@Injectable()
export class ModerationService {
  constructor(
    private readonly prisma: CorePrismaService,
    private readonly orchestrator: ModerationOrchestrator,
  ) {}

  findAllReports() {
    return this.prisma.baoCao.findMany({
      include: { confession: true, comment: true, reporterUser: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async setReportStatus(id: number, status: BaoCaoStatus) {
    await this.orchestrator.orchestrateSetReportStatus(id, status);
  }

  findAllLogs() {
    return this.prisma.nhatKyKiemDuyet.findMany({
      include: { confession: true, moderatorUser: true },
      orderBy: { createdAt: 'desc' },
    });
  }
}
