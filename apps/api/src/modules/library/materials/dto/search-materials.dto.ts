import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class SearchMaterialsDto {
  @IsOptional()
  @IsString()
  q?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  subjectId?: number;

  @IsOptional()
  @IsString()
  type?: string;
}
