import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsInt, IsOptional } from 'class-validator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../../../common/decorators/current-user.decorator';
import { Public } from '../../../common/decorators/public.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CreateSetDto } from './dto/create-set.dto';
import { RecordReviewDto } from './dto/record-review.dto';
import { UpdateCardsDto } from './dto/update-cards.dto';
import { FlashcardsService } from './flashcards.service';

class SubjectFilterDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  subjectId?: number;
}

@Controller('library/flashcard-sets')
export class FlashcardsController {
  constructor(private readonly flashcardsService: FlashcardsService) {}

  @Public()
  @Get()
  findPublicSets(@Query() filter: SubjectFilterDto) {
    return this.flashcardsService.findPublicSets(filter.subjectId);
  }

  @Roles('STUDENT', 'LECTURER', 'ADMIN')
  @Get('my')
  findMySets(@CurrentUser() user: AuthenticatedUser) {
    return this.flashcardsService.findMySets(user.userId);
  }

  @Public()
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.flashcardsService.findOne(id);
  }

  @Roles('STUDENT', 'LECTURER', 'ADMIN')
  @Post()
  create(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreateSetDto) {
    return this.flashcardsService.create(user.userId, dto);
  }

  @Roles('STUDENT', 'LECTURER', 'ADMIN')
  @Put(':id/cards')
  replaceCards(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: UpdateCardsDto,
  ) {
    return this.flashcardsService.replaceCards(id, user.userId, dto);
  }

  @Roles('STUDENT', 'LECTURER', 'ADMIN')
  @Put(':id/publish')
  publish(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: AuthenticatedUser) {
    return this.flashcardsService.publish(id, user.userId);
  }

  @Roles('STUDENT', 'LECTURER', 'ADMIN')
  @Get(':id/study')
  getStudyQueue(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: AuthenticatedUser) {
    return this.flashcardsService.getStudyQueue(id, user.userId);
  }

  @Roles('STUDENT', 'LECTURER', 'ADMIN')
  @Post(':id/review')
  recordReview(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: RecordReviewDto,
  ) {
    return this.flashcardsService.recordReview(id, user.userId, dto);
  }
}
