import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

const PASSWORD_REGEX = /^[A-Z](?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>_-]).{7,}$/;

export class RegisterDto {
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  username: string;

  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsString()
  @MaxLength(150)
  fullName: string;

  @IsString()
  @Matches(PASSWORD_REGEX, {
    message:
      'Mật khẩu phải bắt đầu bằng chữ hoa, chứa ít nhất 1 số, 1 ký tự đặc biệt và tối thiểu 8 ký tự',
  })
  password: string;
}
