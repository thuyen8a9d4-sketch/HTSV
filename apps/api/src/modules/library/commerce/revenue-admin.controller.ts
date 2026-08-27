import { Controller, Get } from '@nestjs/common';
import { CommerceService } from './commerce.service';

@Controller('admin/revenue')
export class RevenueAdminController {
  constructor(private readonly commerceService: CommerceService) {}

  @Get()
  async getSummary() {
    const [summary, orders] = await Promise.all([
      this.commerceService.getRevenueSummary(),
      this.commerceService.findAllOrdersAdmin(),
    ]);
    return { ...summary, orders };
  }
}
