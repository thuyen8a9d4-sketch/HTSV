import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class SearchQuestionsDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  subjectId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  subjectChapterId?: number;

  @IsOptional()
  @IsString()
  difficulty?: string;
}
