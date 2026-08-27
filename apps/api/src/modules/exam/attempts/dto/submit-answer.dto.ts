import { IsInt, IsOptional } from 'class-validator';

export class SubmitAnswerDto {
  @IsInt()
  examQuestionId: number;

  @IsOptional()
  @IsInt()
  selectedOptionId?: number;
}
