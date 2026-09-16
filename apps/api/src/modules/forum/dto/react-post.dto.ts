import { IsEnum } from 'class-validator';
import { LikeType } from '../../../generated/core-client';

export class ReactPostDto {
  @IsEnum(LikeType)
  type: LikeType;
}
