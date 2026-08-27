import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { AcademicPrismaService } from '../../../academic-prisma/academic-prisma.service';
import { DocumentQuestionStatus } from '../../../generated/academic-client';
import { UsersService } from '../../users/users.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { CreateQuestionDto } from './dto/create-question.dto';

@Injectable()
export class QnaService {
  constructor(
    private readonly prisma: AcademicPrismaService,
    private readonly usersService: UsersService,
  ) {}

  async findForMaterial(materialId: number) {
    const questions = await this.prisma.cauHoiTaiLieu.findMany({
      where: { materialId },
      include: { answers: { orderBy: { createdAt: 'asc' } } },
      orderBy: { createdAt: 'desc' },
    });
    const withAskers = await this.usersService.attachOwners(
      questions.map((q) => ({ ...q, ownerUserId: q.askerUserId })),
    );
    return Promise.all(
      withAskers.map(async (q) => ({
        ...q,
        answers: await this.usersService.attachOwners(
          q.answers.map((a) => ({ ...a, ownerUserId: a.responderUserId })),
        ),
      })),
    );
  }

  askQuestion(materialId: number, askerUserId: number, dto: CreateQuestionDto) {
    return this.prisma.cauHoiTaiLieu.create({
      data: { materialId, askerUserId, title: dto.title, body: dto.body },
    });
  }

  async answerQuestion(questionId: number, responderUserId: number, dto: CreateAnswerDto) {
    const question = await this.prisma.cauHoiTaiLieu.findUnique({ where: { id: questionId } });
    if (!question) throw new NotFoundException('Không tìm thấy câu hỏi');
    const answer = await this.prisma.cauTraLoiTaiLieu.create({
      data: { questionId, responderUserId, body: dto.body },
    });
    if (question.status === DocumentQuestionStatus.OPEN) {
      await this.prisma.cauHoiTaiLieu.update({
        where: { id: questionId },
        data: { status: DocumentQuestionStatus.ANSWERED },
      });
    }
    return answer;
  }

  async acceptAnswer(answerId: number, requesterUserId: number) {
    const answer = await this.prisma.cauTraLoiTaiLieu.findUnique({
      where: { id: answerId },
      include: { question: true },
    });
    if (!answer) throw new NotFoundException('Không tìm thấy câu trả lời');
    if (answer.question.askerUserId !== requesterUserId) {
      throw new ForbiddenException('Chỉ người đặt câu hỏi mới được chọn câu trả lời hay nhất');
    }
    await this.prisma.cauTraLoiTaiLieu.update({ where: { id: answerId }, data: { isAccepted: true } });
    return this.prisma.cauHoiTaiLieu.update({
      where: { id: answer.questionId },
      data: { status: DocumentQuestionStatus.CLOSED },
    });
  }
}
