import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { AcademicPrismaService } from '../../../academic-prisma/academic-prisma.service';
import { Difficulty, QuestionStatus } from '../../../generated/academic-client';
import { CreateExamDto } from './dto/create-exam.dto';

async function pickRandomQuestions(
  prisma: AcademicPrismaService,
  subjectId: number,
  difficulty: Difficulty,
  count: number,
) {
  if (!count) return [];
  const candidates = await prisma.nganHangCauHoi.findMany({
    where: { subjectId, difficulty, status: QuestionStatus.APPROVED },
    select: { id: true },
  });
  const shuffled = candidates.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

@Injectable()
export class ExamsService {
  constructor(private readonly prisma: AcademicPrismaService) {}

  async create(createdByUserId: number, dto: CreateExamDto) {
    const [theory, application, practical] = await Promise.all([
      pickRandomQuestions(this.prisma, dto.subjectId, 'EASY', dto.theoryCount ?? 0),
      pickRandomQuestions(this.prisma, dto.subjectId, 'MEDIUM', dto.applicationCount ?? 0),
      pickRandomQuestions(this.prisma, dto.subjectId, 'HARD', dto.practicalCount ?? 0),
    ]);
    const questionIds = [...theory, ...application, ...practical].map((q) => q.id);
    if (questionIds.length === 0) {
      throw new BadRequestException('Không đủ câu hỏi đã duyệt trong ngân hàng để tạo đề thi');
    }

    return this.prisma.$transaction(async (tx) => {
      const exam = await tx.deThi.create({
        data: {
          createdByUserId,
          subjectId: dto.subjectId,
          scopeType: dto.scopeType,
          scopeConfig: (dto.scopeConfig ?? {}) as any,
          totalQuestions: questionIds.length,
          durationMinutes: dto.durationMinutes,
          theoryCount: theory.length,
          applicationCount: application.length,
          practicalCount: practical.length,
        },
      });
      await tx.cauHoiDeThi.createMany({
        data: questionIds.map((questionId, index) => ({
          examId: exam.id,
          questionId,
          orderNo: index + 1,
        })),
      });
      return exam;
    });
  }

  findAll(subjectId?: number) {
    return this.prisma.deThi.findMany({
      where: { subjectId },
      include: { subject: true, _count: { select: { cauHoiDeThis: true } } },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const exam = await this.prisma.deThi.findUnique({
      where: { id },
      include: {
        subject: true,
        cauHoiDeThis: {
          include: { question: { include: { dapAns: true } } },
          orderBy: { orderNo: 'asc' },
        },
      },
    });
    if (!exam) throw new NotFoundException('Không tìm thấy đề thi');
    return exam;
  }

  async remove(id: number) {
    const exam = await this.prisma.deThi.findUnique({ where: { id } });
    if (!exam) throw new NotFoundException('Không tìm thấy đề thi');
    await this.prisma.deThi.delete({ where: { id } });
  }
}
