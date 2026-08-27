import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CreateExamDto } from './dto/create-exam.dto';
import { ExamsService } from './exams.service';

class SubjectFilterDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  subjectId?: number;
}

@Controller('exam/exams')
export class ExamsController {
  constructor(private readonly examsService: ExamsService) {}

  @Roles('STUDENT', 'LECTURER', 'ADMIN')
  @Get()
  findAll(@Query() filter: SubjectFilterDto) {
    return this.examsService.findAll(filter.subjectId);
  }

  @Roles('STUDENT', 'LECTURER', 'ADMIN')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.examsService.findOne(id);
  }

  @Roles('LECTURER', 'ADMIN')
  @Post()
  create(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreateExamDto) {
    return this.examsService.create(user.userId, dto);
  }

  @Roles('LECTURER', 'ADMIN')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.examsService.remove(id);
  }
}
