import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { AcademicPrismaService } from '../../../academic-prisma/academic-prisma.service';
import { CardMasteryStatus, FlashcardSetStatus } from '../../../generated/academic-client';
import { UsersService } from '../../users/users.service';
import { CreateSetDto } from './dto/create-set.dto';
import { RecordReviewDto } from './dto/record-review.dto';
import { UpdateCardsDto } from './dto/update-cards.dto';

@Injectable()
export class FlashcardsService {
  constructor(
    private readonly prisma: AcademicPrismaService,
    private readonly usersService: UsersService,
  ) {}

  async findPublicSets(subjectId?: number) {
    const sets = await this.prisma.boTheGhiNho.findMany({
      where: { status: FlashcardSetStatus.PUBLISHED, isPublic: true, subjectId },
      include: { subject: true },
      orderBy: { createdAt: 'desc' },
    });
    return this.usersService.attachOwners(sets);
  }

  findMySets(ownerUserId: number) {
    return this.prisma.boTheGhiNho.findMany({
      where: { ownerUserId },
      include: { subject: true, cards: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const set = await this.prisma.boTheGhiNho.findUnique({
      where: { id },
      include: { subject: true, cards: { orderBy: { position: 'asc' } } },
    });
    if (!set) throw new NotFoundException('Không tìm thấy bộ thẻ ghi nhớ');
    const [owner] = await this.usersService.findManyByIds([set.ownerUserId]);
    return { ...set, owner: owner ?? null };
  }

  create(ownerUserId: number, dto: CreateSetDto) {
    return this.prisma.boTheGhiNho.create({
      data: {
        ownerUserId,
        title: dto.title,
        description: dto.description,
        subjectId: dto.subjectId,
        materialId: dto.materialId,
        isPublic: dto.isPublic ?? true,
      },
    });
  }

  async replaceCards(setId: number, ownerUserId: number, dto: UpdateCardsDto) {
    const set = await this.getOwnedSet(setId, ownerUserId);
    await this.prisma.theGhiNho.deleteMany({ where: { setId: set.id } });
    await this.prisma.theGhiNho.createMany({
      data: dto.cards.map((c) => ({
        setId: set.id,
        term: c.term,
        definition: c.definition,
        position: c.position,
      })),
    });
    await this.prisma.boTheGhiNho.update({
      where: { id: set.id },
      data: { cardCount: dto.cards.length },
    });
    return this.findOne(set.id);
  }

  async publish(setId: number, ownerUserId: number) {
    await this.getOwnedSet(setId, ownerUserId);
    return this.prisma.boTheGhiNho.update({
      where: { id: setId },
      data: { status: FlashcardSetStatus.PUBLISHED },
    });
  }

  async getStudyQueue(setId: number, studentUserId: number) {
    const cards = await this.prisma.theGhiNho.findMany({
      where: { setId },
      orderBy: { position: 'asc' },
    });
    const results = await this.prisma.ketQuaTheThe.findMany({
      where: { cardId: { in: cards.map((c) => c.id) }, studentUserId },
    });
    const resultByCard = new Map(results.map((r) => [r.cardId, r]));

    const priority: Record<CardMasteryStatus, number> = { NEW: 0, LEARNING: 1, MASTERED: 2 };
    return cards
      .map((card) => ({ card, result: resultByCard.get(card.id) ?? null }))
      .sort(
        (a, b) =>
          priority[a.result?.masteryStatus ?? 'NEW'] - priority[b.result?.masteryStatus ?? 'NEW'],
      );
  }

  async recordReview(setId: number, studentUserId: number, dto: RecordReviewDto) {
    const card = await this.prisma.theGhiNho.findUnique({ where: { id: dto.cardId } });
    if (!card || card.setId !== setId) throw new NotFoundException('Không tìm thấy thẻ ghi nhớ');

    const existing = await this.prisma.ketQuaTheThe.findUnique({
      where: { cardId_studentUserId: { cardId: dto.cardId, studentUserId } },
    });
    const correctStreak = dto.correct ? (existing?.correctStreak ?? 0) + 1 : 0;
    const masteryStatus: CardMasteryStatus =
      correctStreak >= 3 ? 'MASTERED' : correctStreak >= 1 ? 'LEARNING' : 'NEW';

    await this.prisma.ketQuaTheThe.upsert({
      where: { cardId_studentUserId: { cardId: dto.cardId, studentUserId } },
      update: { correctStreak, masteryStatus, lastReviewedAt: new Date() },
      create: {
        cardId: dto.cardId,
        studentUserId,
        correctStreak,
        masteryStatus,
        lastReviewedAt: new Date(),
      },
    });

    await this.prisma.tienDoHocTap.upsert({
      where: { setId_studentUserId: { setId, studentUserId } },
      update: { lastStudiedAt: new Date() },
      create: { setId, studentUserId, lastStudiedAt: new Date() },
    });

    return { masteryStatus, correctStreak };
  }

  private async getOwnedSet(setId: number, ownerUserId: number) {
    const set = await this.prisma.boTheGhiNho.findUnique({ where: { id: setId } });
    if (!set) throw new NotFoundException('Không tìm thấy bộ thẻ ghi nhớ');
    if (set.ownerUserId !== ownerUserId) {
      throw new ForbiddenException('Bạn không có quyền chỉnh sửa bộ thẻ này');
    }
    return set;
  }
}
