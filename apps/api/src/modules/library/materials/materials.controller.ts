import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { CurrentUser } from '../../../common/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../../../common/decorators/current-user.decorator';
import { Public } from '../../../common/decorators/public.decorator';
import { Roles } from '../../../common/decorators/roles.decorator';
import { OptionalJwtAuthGuard } from '../../../common/guards/optional-jwt-auth.guard';
import { CreateMaterialDto } from './dto/create-material.dto';
import { SearchMaterialsDto } from './dto/search-materials.dto';
import { MaterialsService } from './materials.service';

@Controller('library')
export class MaterialsController {
  constructor(private readonly materialsService: MaterialsService) {}

  @Public()
  @Get('subjects')
  findAllSubjects() {
    return this.materialsService.findAllSubjects();
  }

  @Public()
  @Get('materials')
  search(@Query() filters: SearchMaterialsDto) {
    return this.materialsService.search(filters);
  }

  @Public()
  @UseGuards(OptionalJwtAuthGuard)
  @Get('materials/:id')
  findOne(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: AuthenticatedUser | null) {
    return this.materialsService.findOne(id, user?.userId ?? null);
  }

  @Public()
  @UseGuards(OptionalJwtAuthGuard)
  @Get('materials/:id/download')
  async download(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: AuthenticatedUser | null,
    @Res() res: Response,
  ) {
    const { filePath, mimeType } = await this.materialsService.getFileForDownload(
      id,
      user?.userId ?? null,
    );
    res.setHeader('Content-Type', mimeType);
    res.sendFile(filePath);
  }

  @Roles('LECTURER', 'ADMIN')
  @Get('my-uploads')
  findMyUploads(@CurrentUser() user: AuthenticatedUser) {
    return this.materialsService.findMyUploads(user.userId);
  }

  @Roles('LECTURER', 'ADMIN')
  @Post('materials')
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateMaterialDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.materialsService.upload(user.userId, dto, file);
  }
}
