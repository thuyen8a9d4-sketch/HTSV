import { Controller, Get, Param, ParseIntPipe, Put } from '@nestjs/common';
import { BaoCaoStatus } from '../../generated/core-client';
import { ModerationService } from './moderation.service';

@Controller('admin')
export class ModerationController {
  constructor(private readonly moderationService: ModerationService) {}

  @Get('reports')
  findAllReports() {
    return this.moderationService.findAllReports();
  }

  @Put('reports/:id/resolve')
  resolve(@Param('id', ParseIntPipe) id: number) {
    return this.moderationService.setReportStatus(id, BaoCaoStatus.RESOLVED);
  }

  @Put('reports/:id/dismiss')
  dismiss(@Param('id', ParseIntPipe) id: number) {
    return this.moderationService.setReportStatus(id, BaoCaoStatus.DISMISSED);
  }

  @Get('moderation-logs')
  findAllLogs() {
    return this.moderationService.findAllLogs();
  }
}
