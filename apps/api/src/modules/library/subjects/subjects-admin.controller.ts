import { Body, Controller, Delete, Param, ParseIntPipe, Post, Put } from '@nestjs/common';
import { AcademicPrismaService } from '../../../academic-prisma/academic-prisma.service';
import { CreateSubjectDto } from './dto/create-subject.dto';

@Controller('admin/library/subjects')
export class SubjectsAdminController {
  constructor(private readonly prisma: AcademicPrismaService) {}

  @Post()
  create(@Body() dto: CreateSubjectDto) {
    return this.prisma.monHoc.create({ data: dto });
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: CreateSubjectDto) {
    return this.prisma.monHoc.update({ where: { id }, data: dto });
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.prisma.monHoc.delete({ where: { id } });
  }
}
