import { Module } from '@nestjs/common';
import { AcademicPrismaModule } from '../../academic-prisma/academic-prisma.module';
import { UsersModule } from '../users/users.module';
import { CommerceController } from './commerce/commerce.controller';
import { CommerceService } from './commerce/commerce.service';
import { RevenueAdminController } from './commerce/revenue-admin.controller';
import { FlashcardsController } from './flashcards/flashcards.controller';
import { FlashcardsService } from './flashcards/flashcards.service';
import { MaterialsAdminController } from './materials/materials-admin.controller';
import { MaterialsController } from './materials/materials.controller';
import { MaterialsService } from './materials/materials.service';
import { QnaController } from './qna/qna.controller';
import { QnaService } from './qna/qna.service';
import { RatingsController } from './ratings/ratings.controller';
import { RatingsService } from './ratings/ratings.service';
import { SubjectsAdminController } from './subjects/subjects-admin.controller';

@Module({
  imports: [AcademicPrismaModule, UsersModule],
  controllers: [
    MaterialsController,
    MaterialsAdminController,
    FlashcardsController,
    RatingsController,
    QnaController,
    CommerceController,
    RevenueAdminController,
    SubjectsAdminController,
  ],
  providers: [MaterialsService, FlashcardsService, RatingsService, QnaService, CommerceService],
})
export class LibraryModule {}
