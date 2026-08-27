import { Body, Controller, Get, Post } from '@nestjs/common';
import { IsInt } from 'class-validator';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../../../common/decorators/current-user.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { CommerceService } from './commerce.service';

class BuyDto {
  @IsInt()
  materialId: number;
}

@Controller('library')
export class CommerceController {
  constructor(private readonly commerceService: CommerceService) {}

  @Roles('STUDENT', 'LECTURER', 'ADMIN')
  @Post('buy')
  buy(@CurrentUser() user: AuthenticatedUser, @Body() dto: BuyDto) {
    return this.commerceService.buy(user.userId, dto.materialId);
  }

  @Roles('STUDENT', 'LECTURER', 'ADMIN')
  @Get('my-orders')
  findMyOrders(@CurrentUser() user: AuthenticatedUser) {
    return this.commerceService.findMyOrders(user.userId);
  }
}
