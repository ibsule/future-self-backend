import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateMessengerDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsDateString({ strict: true })
  @IsNotEmpty()
  send_at: string;
}
