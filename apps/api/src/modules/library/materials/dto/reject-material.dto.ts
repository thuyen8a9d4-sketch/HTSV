import { IsOptional, IsString, MaxLength } from 'class-validator';

export class RejectMaterialDto {
  @IsOptional()
  @IsString()
  @MaxLength(300)
  reason?: string;
}
