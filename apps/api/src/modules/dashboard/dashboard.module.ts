import { Module } from '@nestjs/common';
import { AcademicPrismaModule } from '../../academic-prisma/academic-prisma.module';
import { CorePrismaModule } from '../../core-prisma/core-prisma.module';
import { DashboardController } from './dashboard.controller';
import { DashboardService } from './dashboard.service';

@Module({
  imports: [CorePrismaModule, AcademicPrismaModule],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
