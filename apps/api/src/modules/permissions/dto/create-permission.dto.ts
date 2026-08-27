import { IsOptional, IsString, MaxLength } from 'class-validator';

export class CreatePermissionDto {
  @IsString()
  @MaxLength(60)
  code: string;

  @IsString()
  @MaxLength(150)
  name: string;

  @IsOptional()
  @IsString()
  @MaxLength(300)
  description?: string;
}
