import { Module } from '@nestjs/common';
import { CorePrismaModule } from '../../core-prisma/core-prisma.module';
import { ForumAdminController } from './forum-admin.controller';
import { ForumController } from './forum.controller';
import { ForumService } from './forum.service';

@Module({
  imports: [CorePrismaModule],
  controllers: [ForumController, ForumAdminController],
  providers: [ForumService],
})
export class ForumModule {}
