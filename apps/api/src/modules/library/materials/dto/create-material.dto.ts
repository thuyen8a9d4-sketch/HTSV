import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsIn, IsInt, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';

export const TAI_LIEU_TYPES = ['SLIDE', 'LESSON_PLAN', 'TEXTBOOK', 'OTHER'] as const;

function toBoolean({ value }: { value: unknown }) {
  if (typeof value === 'boolean') return value;
  return value === 'true' || value === '1';
}

export class CreateMaterialDto {
  @IsString()
  @MaxLength(200)
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsIn(TAI_LIEU_TYPES)
  type: (typeof TAI_LIEU_TYPES)[number];

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  subjectId?: number;

  @IsOptional()
  @Transform(toBoolean)
  @IsBoolean()
  isFree?: boolean;

  @IsOptional()
  @Transform(toBoolean)
  @IsBoolean()
  isSellable?: boolean;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price?: number;
}
