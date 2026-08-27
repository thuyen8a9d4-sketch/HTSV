import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CreateQuestionDto } from './dto/create-question.dto';
import { SearchQuestionsDto } from './dto/search-questions.dto';
import { QuestionBankService } from './question-bank.service';

@Controller('exam/questions')
@Roles('LECTURER', 'ADMIN')
export class QuestionBankController {
  constructor(private readonly questionBankService: QuestionBankService) {}

  @Get()
  findAll(@Query() filters: SearchQuestionsDto) {
    return this.questionBankService.findAll(filters);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.questionBankService.findOne(id);
  }

  @Post()
  create(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreateQuestionDto) {
    return this.questionBankService.create(user.userId, dto);
  }

  @Put(':id/approve')
  approve(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: AuthenticatedUser) {
    return this.questionBankService.review(id, user.userId, true);
  }

  @Put(':id/reject')
  reject(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: AuthenticatedUser) {
    return this.questionBankService.review(id, user.userId, false);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.questionBankService.remove(id);
  }
}
