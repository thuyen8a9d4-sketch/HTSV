import { IsEmail, IsString, Length, Matches } from 'class-validator';

const PASSWORD_REGEX = /^[A-Z](?=.*[0-9])(?=.*[!@#$%^&*(),.?":{}|<>_-]).{7,}$/;

export class ResetPasswordDto {
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 6)
  code: string;

  @IsString()
  @Matches(PASSWORD_REGEX, {
    message:
      'Mật khẩu phải bắt đầu bằng chữ hoa, chứa ít nhất 1 số, 1 ký tự đặc biệt và tối thiểu 8 ký tự',
  })
  newPassword: string;
}
