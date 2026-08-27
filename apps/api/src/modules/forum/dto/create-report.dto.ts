import { IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateReportDto {
  @IsOptional()
  @IsInt()
  confessionId?: number;

  @IsOptional()
  @IsInt()
  commentId?: number;

  @IsString()
  @MaxLength(300)
  reason: string;
}
