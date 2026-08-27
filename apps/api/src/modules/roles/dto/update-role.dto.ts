import { IsOptional, IsString, MaxLength } from 'class-validator';

export class UpdateRoleDto {
  @IsOptional()
  @IsString()
  @MaxLength(30)
  code?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  name?: string;
}
