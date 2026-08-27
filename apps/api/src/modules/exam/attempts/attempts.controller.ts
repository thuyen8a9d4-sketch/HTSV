import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { AttemptsService } from './attempts.service';
import { SubmitAnswerDto } from './dto/submit-answer.dto';

@Controller('exam')
export class AttemptsController {
  constructor(private readonly attemptsService: AttemptsService) {}

  @Roles('STUDENT', 'LECTURER', 'ADMIN')
  @Post('exams/:id/start')
  start(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: AuthenticatedUser) {
    return this.attemptsService.start(id, user.userId);
  }

  @Roles('STUDENT', 'LECTURER', 'ADMIN')
  @Post('attempts/:id/answer')
  answer(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: SubmitAnswerDto,
  ) {
    return this.attemptsService.answer(id, user.userId, dto);
  }

  @Roles('STUDENT', 'LECTURER', 'ADMIN')
  @Post('attempts/:id/submit')
  submit(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: AuthenticatedUser) {
    return this.attemptsService.submit(id, user.userId);
  }

  @Roles('STUDENT', 'LECTURER', 'ADMIN')
  @Get('attempts/:id')
  findOne(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: AuthenticatedUser) {
    return this.attemptsService.findOne(id, user.userId);
  }

  @Roles('STUDENT', 'LECTURER', 'ADMIN')
  @Get('my-attempts')
  findMyAttempts(@CurrentUser() user: AuthenticatedUser) {
    return this.attemptsService.findMyAttempts(user.userId);
  }
}
