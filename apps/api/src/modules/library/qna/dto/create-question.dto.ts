import { IsString, MaxLength } from 'class-validator';

export class CreateQuestionDto {
  @IsString()
  @MaxLength(200)
  title: string;

  @IsString()
  body: string;
}
