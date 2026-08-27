import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  MaxLength,
  ValidateNested,
} from 'class-validator';

export const QUESTION_TYPES = ['SINGLE_CHOICE', 'MULTIPLE_CHOICE'] as const;
export const DIFFICULTIES = ['EASY', 'MEDIUM', 'HARD'] as const;

export class AnswerOptionInput {
  @IsString()
  @MaxLength(2)
  optionLabel: string;

  @IsString()
  content: string;

  @IsBoolean()
  isCorrect: boolean;
}

export class CreateQuestionDto {
  @IsInt()
  subjectId: number;

  @IsOptional()
  @IsInt()
  subjectChapterId?: number;

  @IsIn(QUESTION_TYPES)
  questionType: (typeof QUESTION_TYPES)[number];

  @IsOptional()
  @IsIn(DIFFICULTIES)
  difficulty?: (typeof DIFFICULTIES)[number];

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  explanation?: string;

  @IsArray()
  @ArrayMinSize(2)
  @ValidateNested({ each: true })
  @Type(() => AnswerOptionInput)
  answers: AnswerOptionInput[];
}
