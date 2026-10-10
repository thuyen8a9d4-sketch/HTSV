import { Module } from '@nestjs/common';
import { CorePrismaModule } from '../../core-prisma/core-prisma.module';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';
import { PermissionsOrchestrator } from './permissions-orchestrator';

@Module({
  imports: [CorePrismaModule],
  controllers: [PermissionsController],
  providers: [PermissionsService, PermissionsOrchestrator],
})
export class PermissionsModule {}
