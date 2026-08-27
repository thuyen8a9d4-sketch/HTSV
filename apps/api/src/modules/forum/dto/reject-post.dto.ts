import { IsOptional, IsString, MaxLength } from 'class-validator';

export class RejectPostDto {
  @IsOptional()
  @IsString()
  @MaxLength(300)
  reason?: string;
}
