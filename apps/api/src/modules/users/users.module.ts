import { Module } from '@nestjs/common';
import { CorePrismaModule } from '../../core-prisma/core-prisma.module';
import { UsersService } from './users.service';

@Module({
  imports: [CorePrismaModule],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
