import { Module } from '@nestjs/common';
import { AcademicPrismaService } from './academic-prisma.service';

@Module({
  providers: [AcademicPrismaService],
  exports: [AcademicPrismaService],
})
export class AcademicPrismaModule {}
