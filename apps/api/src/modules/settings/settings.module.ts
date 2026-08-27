import { Module } from '@nestjs/common';
import { AcademicPrismaModule } from '../../academic-prisma/academic-prisma.module';
import { SettingsAdminController, SettingsController } from './settings.controller';
import { SettingsService } from './settings.service';

@Module({
  imports: [AcademicPrismaModule],
  controllers: [SettingsController, SettingsAdminController],
  providers: [SettingsService],
  exports: [SettingsService],
})
export class SettingsModule {}
