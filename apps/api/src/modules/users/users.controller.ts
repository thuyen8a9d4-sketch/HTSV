import {
  Controller,
  Get,
  Put,
  Post,
  Body,
  Request,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UsersService } from './users.service';

interface CustomRequest {
  user?: {
    id?: number;
  };
  query?: {
    userId?: string;
  };
  body?: {
    userId?: string | number;
  };
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // 1. GET /api/users/profile - Lấy thông tin chi tiết profile
  @Get('profile')
  async getProfile(@Request() req: CustomRequest) {
    const userId = req.user?.id ?? Number(req.query?.userId ?? 1);
    return this.usersService.getProfileWithDetails(userId);
  }

  // 2. PUT /api/users/profile - Cập nhật thông tin cá nhân
  @Put('profile')
  async updateProfile(
    @Request() req: CustomRequest,
    @Body() body: { userId?: number; fullName?: string },
  ) {
    const userId = req.user?.id ?? Number(body.userId ?? 1);
    return this.usersService.updateProfile(userId, {
      fullName: body.fullName,
    });
  }

  // 3. POST /api/users/profile/avatar - Upload và cập nhật ảnh đại diện
  @Post('profile/avatar')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads/avatars',
        filename: (_req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `avatar-${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (_req, file, callback) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif)$/)) {
          return callback(
            new BadRequestException('Chỉ chấp nhận file ảnh (jpg, png, gif)!'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async uploadAvatar(
    @Request() req: CustomRequest,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Vui lòng chọn file ảnh hợp lệ.');
    }
    const userId = req.user?.id ?? Number(req.body?.userId ?? 1);
    const avatarUrl = `/uploads/avatars/${file.filename}`;
    return this.usersService.updateAvatar(userId, avatarUrl);
  }
}
