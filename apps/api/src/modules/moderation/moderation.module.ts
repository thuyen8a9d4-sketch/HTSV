import { Module } from '@nestjs/common';
import { CorePrismaModule } from '../../core-prisma/core-prisma.module';
import { ModerationController } from './moderation.controller';
import { ModerationService } from './moderation.service';

@Module({
  imports: [CorePrismaModule],
  controllers: [ModerationController],
  providers: [ModerationService],
})
export class ModerationModule {}
