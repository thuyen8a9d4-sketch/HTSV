import { IsIn, IsInt, IsOptional, Min } from 'class-validator';

export const EXAM_SCOPE_TYPES = ['BY_SUBJECT', 'BY_CHAPTER', 'CUSTOM'] as const;

export class CreateExamDto {
  @IsInt()
  subjectId: number;

  @IsIn(EXAM_SCOPE_TYPES)
  scopeType: (typeof EXAM_SCOPE_TYPES)[number];

  @IsOptional()
  scopeConfig?: Record<string, unknown>;

  @IsOptional()
  @IsInt()
  durationMinutes?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  theoryCount?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  applicationCount?: number;

  @IsOptional()
  @IsInt()
  @Min(0)
  practicalCount?: number;
}
