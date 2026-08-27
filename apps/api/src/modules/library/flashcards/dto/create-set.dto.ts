import { IsBoolean, IsInt, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateSetDto {
  @IsString()
  @MaxLength(200)
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  subjectId?: number;

  @IsOptional()
  @IsInt()
  materialId?: number;

  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
}
