import { Module } from '@nestjs/common';
import { CorePrismaService } from './core-prisma.service';

@Module({
  providers: [CorePrismaService],
  exports: [CorePrismaService],
})
export class CorePrismaModule {}
