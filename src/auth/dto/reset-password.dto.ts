import { IsEmail, IsNotEmpty, isString, IsString } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  new_password: string;

  @IsNotEmpty()
  @IsString()
  reset_password_token: string;
}
