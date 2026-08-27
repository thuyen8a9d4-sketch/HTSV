import { IsBoolean, IsOptional, IsString, MinLength } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @MinLength(1)
  content: string;

  @IsOptional()
  @IsBoolean()
  isAnonymous?: boolean;
}
