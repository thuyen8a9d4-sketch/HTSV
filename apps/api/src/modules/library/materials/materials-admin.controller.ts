import { Body, Controller, Get, Param, ParseIntPipe, Put } from '@nestjs/common';
import { RejectMaterialDto } from './dto/reject-material.dto';
import { MaterialsService } from './materials.service';

@Controller('admin/library/materials')
export class MaterialsAdminController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Get()
  findAll() {
    return this.materialsService.findAllAdmin();
  }

  @Put(':id/publish')
  publish(@Param('id', ParseIntPipe) id: number) {
    return this.materialsService.publish(id);
  }

  @Put(':id/reject')
  reject(@Param('id', ParseIntPipe) id: number, @Body() dto: RejectMaterialDto) {
    return this.materialsService.reject(id, dto);
  }
}
