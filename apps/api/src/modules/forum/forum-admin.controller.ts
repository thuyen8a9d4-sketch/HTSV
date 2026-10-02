import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../../common/decorators/current-user.decorator';
import { CreateCategoryDto } from './dto/create-category.dto';
import { RejectPostDto } from './dto/reject-post.dto';
import { ForumService } from './forum.service';

@Controller('admin/forum')
export class ForumAdminController {
  constructor(private readonly forumService: ForumService) {}

  @Get('posts')
  findAllPosts() {
    return this.forumService.findAllPostsAdmin();
  }

  @Put('posts/:id/approve')
  approve(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: AuthenticatedUser,
  ) {
    return this.forumService.approvePost(id, user.userId);
  }

  @Put('posts/:id/reject')
  reject(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: RejectPostDto,
  ) {
    return this.forumService.rejectPost(id, user.userId, dto);
  }

  @Post('categories')
  createCategory(@Body() dto: CreateCategoryDto) {
    return this.forumService.createCategory(dto);
  }

  @Delete('categories/:id')
  removeCategory(@Param('id', ParseIntPipe) id: number) {
    return this.forumService.removeCategory(id);
  }
}
