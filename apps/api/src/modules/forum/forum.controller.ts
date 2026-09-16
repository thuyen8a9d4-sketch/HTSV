import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '../../common/decorators/current-user.decorator';
import type { AuthenticatedUser } from '../../common/decorators/current-user.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { Roles } from '../../common/decorators/roles.decorator';
import { OptionalJwtAuthGuard } from '../../common/guards/optional-jwt-auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { CreateReportDto } from './dto/create-report.dto';
import { ReactPostDto } from './dto/react-post.dto';
import { ForumService } from './forum.service';

@Controller('forum')
export class ForumController {
  constructor(private readonly forumService: ForumService) {}

  @Public()
  @Get('categories')
  findAllCategories() {
    return this.forumService.findAllCategories();
  }

  @Public()
  @Get('posts')
  findApprovedPosts() {
    return this.forumService.findApprovedPosts();
  }

  @Public()
  @UseGuards(OptionalJwtAuthGuard)
  @Get('posts/:id')
  findOne(@Param('id', ParseIntPipe) id: number, @CurrentUser() user: AuthenticatedUser | null) {
    return this.forumService.findPostById(id, user);
  }

  @Roles('STUDENT', 'LECTURER', 'ADMIN')
  @Post('posts')
  createPost(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreatePostDto) {
    return this.forumService.createPost(user.userId, dto);
  }

  @Roles('STUDENT', 'LECTURER', 'ADMIN')
  @Post('posts/:id/comments')
  createComment(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: CreateCommentDto,
  ) {
    return this.forumService.createComment(id, user.userId, dto);
  }

  @Roles('STUDENT', 'LECTURER', 'ADMIN')
  @Post('posts/:id/react')
  react(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: AuthenticatedUser,
    @Body() dto: ReactPostDto,
  ) {
    return this.forumService.react(id, user.userId, dto.type);
  }

  @Public()
  @Post('posts/:id/share')
  share(@Param('id', ParseIntPipe) id: number) {
    return this.forumService.share(id);
  }

  @Roles('STUDENT', 'LECTURER', 'ADMIN')
  @Post('reports')
  createReport(@CurrentUser() user: AuthenticatedUser, @Body() dto: CreateReportDto) {
    return this.forumService.createReport(user.userId, dto);
  }
}
