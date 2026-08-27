import { Module } from '@nestjs/common';
import { AcademicPrismaModule } from '../../academic-prisma/academic-prisma.module';
import { UsersModule } from '../users/users.module';
import { AttemptsController } from './attempts/attempts.controller';
import { AttemptsService } from './attempts/attempts.service';
import { ExamsController } from './exams/exams.controller';
import { ExamsService } from './exams/exams.service';
import { QuestionBankController } from './question-bank/question-bank.controller';
import { QuestionBankService } from './question-bank/question-bank.service';

@Module({
  imports: [AcademicPrismaModule, UsersModule],
  controllers: [QuestionBankController, ExamsController, AttemptsController],
  providers: [QuestionBankService, ExamsService, AttemptsService],
})
export class ExamModule {}
