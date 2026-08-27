import { IsIn, IsOptional, IsString, MaxLength } from 'class-validator';

export const SUBJECT_LEVELS = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED'] as const;

export class CreateSubjectDto {
  @IsString()
  @MaxLength(20)
  code: string;

  @IsString()
  @MaxLength(150)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsIn(SUBJECT_LEVELS)
  level?: (typeof SUBJECT_LEVELS)[number];
}
