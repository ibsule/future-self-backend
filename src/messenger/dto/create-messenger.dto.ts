import { Transform } from 'class-transformer';
import {
  IsDateString,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsFutureTimeString } from 'src/utils/validators/is-future-time-string.validator';

export class CreateMessengerDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsDateString({ strict: true })
  @IsNotEmpty()
  @IsOptional()
  send_at: string;

  @IsFutureTimeString()
  @IsOptional()
  send_after: string;
}
