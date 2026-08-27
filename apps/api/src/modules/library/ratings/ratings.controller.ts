import { Body, Controller, Get, Param, ParseIntPipe, Put } from '@nestjs/common';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../../../common/decorators/current-user.decorator';
import { Public } from '../../../common/decorators/public.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CreateRatingDto } from './dto/create-rating.dto';
import { RatingsService } from './ratings.service';

@Controller('library/materials/:materialId/ratings')
export class RatingsController {
  constructor(private readonly ratingsService: RatingsService) {}

  @Public()
  @Get()
  findForMaterial(@Param('materialId', ParseIntPipe) materialId: number) {
    return this.ratingsService.findForMaterial(materialId);
  }

  @Roles('STUDENT', 'LECTURER', 'ADMIN')
  @Put()
  upsert(
    @Param('materialId', ParseIntPipe) materialId: number,
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateRatingDto,
  ) {
    return this.ratingsService.upsert(materialId, user.userId, dto);
  }
}
