import { IsEmail, IsNotEmpty, isString, IsString, MaxLength, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(32)
  new_password: string;

  @IsNotEmpty()
  @IsString()
  reset_password_token: string;
}
