import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AcademicPrismaService } from '../../../academic-prisma/academic-prisma.service';
import { QuestionStatus } from '../../../generated/academic-client';
import { UsersService } from '../../users/users.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { SearchQuestionsDto } from './dto/search-questions.dto';

@Injectable()
export class QuestionBankService {
  constructor(
    private readonly prisma: AcademicPrismaService,
    private readonly usersService: UsersService,
  ) {}

  findAll(filters: SearchQuestionsDto) {
    return this.prisma.nganHangCauHoi.findMany({
      where: {
        subjectId: filters.subjectId,
        subjectChapterId: filters.subjectChapterId,
        difficulty: filters.difficulty as any,
      },
      include: { dapAns: true, subject: true, subjectChapter: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const question = await this.prisma.nganHangCauHoi.findUnique({
      where: { id },
      include: { dapAns: true, subject: true, subjectChapter: true },
    });
    if (!question) throw new NotFoundException('Không tìm thấy câu hỏi');
    return question;
  }

  async create(createdByUserId: number, dto: CreateQuestionDto) {
    const correctCount = dto.answers.filter((a) => a.isCorrect).length;
    if (correctCount !== 1) {
      throw new BadRequestException('Mỗi câu hỏi phải có đúng 1 đáp án đúng');
    }

    return this.prisma.$transaction(async (tx) => {
      const question = await tx.nganHangCauHoi.create({
        data: {
          subjectId: dto.subjectId,
          subjectChapterId: dto.subjectChapterId,
          questionType: dto.questionType,
          difficulty: dto.difficulty ?? 'MEDIUM',
          content: dto.content,
          explanation: dto.explanation,
          status: QuestionStatus.PENDING_REVIEW,
          createdByUserId,
        },
      });
      await tx.dapAn.createMany({
        data: dto.answers.map((a) => ({
          questionId: question.id,
          optionLabel: a.optionLabel,
          content: a.content,
          isCorrect: a.isCorrect,
        })),
      });
      return question;
    });
  }

  async review(id: number, reviewedByUserId: number, approve: boolean) {
    await this.findOne(id);
    return this.prisma.nganHangCauHoi.update({
      where: { id },
      data: {
        status: approve ? QuestionStatus.APPROVED : QuestionStatus.REJECTED,
        reviewedByUserId,
      },
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.nganHangCauHoi.delete({ where: { id } });
  }
}
