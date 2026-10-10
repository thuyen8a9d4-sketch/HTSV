import { Module } from '@nestjs/common';
import { CorePrismaModule } from '../../core-prisma/core-prisma.module';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { RolesOrchestrator } from './roles-orchestrator';

@Module({
  imports: [CorePrismaModule],
  controllers: [RolesController],
  providers: [RolesService, RolesOrchestrator],
})
export class RolesModule {}
