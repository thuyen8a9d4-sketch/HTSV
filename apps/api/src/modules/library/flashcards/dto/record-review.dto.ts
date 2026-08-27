import { IsBoolean, IsInt } from 'class-validator';

export class RecordReviewDto {
  @IsInt()
  cardId: number;

  @IsBoolean()
  correct: boolean;
}
