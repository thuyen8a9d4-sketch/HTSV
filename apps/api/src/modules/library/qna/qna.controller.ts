import { Body, Controller, Get, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../../../common/decorators/current-user.decorator';
import { Public } from '../../../common/decorators/public.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { CreateQuestionDto } from './dto/create-question.dto';
import { QnaService } from './qna.service';

@Controller('library')
export class QnaController {
  constructor(private readonly qnaService: QnaService) {}

  @Public()
  @Get('materials/:materialId/questions')
  findForMaterial(@Param('materialId', ParseIntPipe) materialId: number) {
    return this.qnaService.findForMaterial(materialId);
  }

  @Roles('STUDENT', 'LECTURER', 'ADMIN')
  @Post('materials/:materialId/questions')
  askQuestion(
    @Param('materialId', ParseIntPipe) materialId: number,
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateQuestionDto,
  ) {
    return this.qnaService.askQuestion(materialId, user.userId, dto);
  }

  @Roles('STUDENT', 'LECTURER', 'ADMIN')
  @Post('questions/:questionId/answers')
  answerQuestion(
    @Param('questionId', ParseIntPipe) questionId: number,
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateAnswerDto,
  ) {
    return this.qnaService.answerQuestion(questionId, user.userId, dto);
  }

  @Roles('STUDENT', 'LECTURER', 'ADMIN')
  @Put('answers/:answerId/accept')
  acceptAnswer(
    @Param('answerId', ParseIntPipe) answerId: number,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.qnaService.acceptAnswer(answerId, user.userId);
  }
}
