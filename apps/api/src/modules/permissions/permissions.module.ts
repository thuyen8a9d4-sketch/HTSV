import { Module } from '@nestjs/common';
import { CorePrismaModule } from '../../core-prisma/core-prisma.module';
import { PermissionsController } from './permissions.controller';
import { PermissionsService } from './permissions.service';

@Module({
  imports: [CorePrismaModule],
  controllers: [PermissionsController],
  providers: [PermissionsService],
})
export class PermissionsModule {}
