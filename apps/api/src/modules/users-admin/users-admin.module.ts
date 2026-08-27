import { Module } from '@nestjs/common';
import { CorePrismaModule } from '../../core-prisma/core-prisma.module';
import { UsersAdminController } from './users-admin.controller';
import { UsersAdminService } from './users-admin.service';

@Module({
  imports: [CorePrismaModule],
  controllers: [UsersAdminController],
  providers: [UsersAdminService],
})
export class UsersAdminModule {}
