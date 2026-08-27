import { IsString, MaxLength } from 'class-validator';

export class CreateRoleDto {
  @IsString()
  @MaxLength(30)
  code: string;

  @IsString()
  @MaxLength(100)
  name: string;
}
