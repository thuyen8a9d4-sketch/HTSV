import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { AcademicPrismaService } from '../../../academic-prisma/academic-prisma.service';
import { AttemptStatus } from '../../../generated/academic-client';
import { SubmitAnswerDto } from './dto/submit-answer.dto';

@Injectable()
export class AttemptsService {
  constructor(private readonly prisma: AcademicPrismaService) {}

  async start(examId: number, studentUserId: number) {
    const exam = await this.prisma.deThi.findUnique({
      where: { id: examId },
      include: {
        cauHoiDeThis: {
          include: { question: { include: { dapAns: true } } },
          orderBy: { orderNo: 'asc' },
        },
      },
    });
    if (!exam) throw new NotFoundException('Không tìm thấy đề thi');

    const attempt = await this.prisma.luotLamBai.create({
      data: { examId, studentUserId },
    });

    const questions = exam.cauHoiDeThis.map((cq) => ({
      examQuestionId: cq.id,
      content: cq.question.content,
      options: cq.question.dapAns.map((a) => ({ id: a.id, optionLabel: a.optionLabel, content: a.content })),
    }));

    return { attemptId: attempt.id, examId, durationMinutes: exam.durationMinutes, questions };
  }

  async answer(attemptId: number, studentUserId: number, dto: SubmitAnswerDto) {
    const attempt = await this.getOwnedInProgressAttempt(attemptId, studentUserId);
    await this.prisma.cauTraLoi.upsert({
      where: { attemptId_examQuestionId: { attemptId: attempt.id, examQuestionId: dto.examQuestionId } },
      update: { selectedOptionId: dto.selectedOptionId, answeredAt: new Date() },
      create: {
        attemptId: attempt.id,
        examQuestionId: dto.examQuestionId,
        selectedOptionId: dto.selectedOptionId,
        answeredAt: new Date(),
      },
    });
    return { ok: true };
  }

  async submit(attemptId: number, studentUserId: number) {
    const attempt = await this.getOwnedInProgressAttempt(attemptId, studentUserId);

    const cauTraLois = await this.prisma.cauTraLoi.findMany({ where: { attemptId: attempt.id } });
    let correctCount = 0;
    let wrongCount = 0;
    for (const answer of cauTraLois) {
      const option = answer.selectedOptionId
        ? await this.prisma.dapAn.findUnique({ where: { id: answer.selectedOptionId } })
        : null;
      const isCorrect = option?.isCorrect ?? false;
      if (isCorrect) correctCount++;
      else wrongCount++;
      await this.prisma.cauTraLoi.update({ where: { id: answer.id }, data: { isCorrect } });
    }

    const totalQuestions = await this.prisma.cauHoiDeThi.count({ where: { examId: attempt.examId } });
    const score = totalQuestions > 0 ? (correctCount / totalQuestions) * 10 : 0;

    return this.prisma.luotLamBai.update({
      where: { id: attempt.id },
      data: {
        status: AttemptStatus.SUBMITTED,
        submittedAt: new Date(),
        correctCount,
        wrongCount,
        score,
      },
    });
  }

  async findOne(attemptId: number, studentUserId: number) {
    const attempt = await this.prisma.luotLamBai.findUnique({
      where: { id: attemptId },
      include: {
        cauTraLois: {
          include: { examQuestion: { include: { question: { include: { dapAns: true } } } } },
        },
        exam: true,
      },
    });
    if (!attempt || attempt.studentUserId !== studentUserId) {
      throw new NotFoundException('Không tìm thấy lượt làm bài');
    }
    return attempt;
  }

  findMyAttempts(studentUserId: number) {
    return this.prisma.luotLamBai.findMany({
      where: { studentUserId },
      include: { exam: { include: { subject: true } } },
      orderBy: { startedAt: 'desc' },
    });
  }

  private async getOwnedInProgressAttempt(attemptId: number, studentUserId: number) {
    const attempt = await this.prisma.luotLamBai.findUnique({ where: { id: attemptId } });
    if (!attempt || attempt.studentUserId !== studentUserId) {
      throw new NotFoundException('Không tìm thấy lượt làm bài');
    }
    if (attempt.status !== AttemptStatus.IN_PROGRESS) {
      throw new ForbiddenException('Bài thi đã được nộp');
    }
    return attempt;
  }
}
