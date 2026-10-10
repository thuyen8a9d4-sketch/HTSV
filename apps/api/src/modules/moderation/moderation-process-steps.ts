import { NotFoundException } from '@nestjs/common';
import { ProcessInput, ProcessStep } from '../../common/process';
import { CorePrismaService } from '../../core-prisma/core-prisma.service';
import { BaoCaoStatus } from '../../generated/core-client';

export interface SetReportStatusInput extends ProcessInput {
  reportId: number;
  status: BaoCaoStatus;
  prisma?: CorePrismaService;
  report?: { id: number; status: string };
}

export const findReportStep: ProcessStep<SetReportStatusInput> = {
  name: 'find-report',
  async validate(input: SetReportStatusInput) {
    return !!(input.reportId && input.status);
  },
  async execute(input: SetReportStatusInput) {
    const report = await input.prisma!.baoCao.findUnique({
      where: { id: input.reportId },
    });
    if (!report) {
      throw new NotFoundException('Không tìm thấy báo cáo');
    }
    return { ...input, report };
  },
};

export const updateReportStatusStep: ProcessStep<SetReportStatusInput> = {
  name: 'update-report-status',
  async validate(input: SetReportStatusInput) {
    return !!input.report;
  },
  async execute(input: SetReportStatusInput) {
    await input.prisma!.baoCao.update({
      where: { id: input.reportId },
      data: { status: input.status },
    });
    return input;
  },
};
