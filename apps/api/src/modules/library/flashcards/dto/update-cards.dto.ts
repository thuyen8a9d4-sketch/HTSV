import { Type } from 'class-transformer';
import { IsArray, IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';

export class CardInput {
  @IsOptional()
  @IsInt()
  id?: number;

  @IsString()
  term: string;

  @IsString()
  definition: string;

  @IsInt()
  position: number;
}

export class UpdateCardsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CardInput)
  cards: CardInput[];
}
