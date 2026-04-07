import { Injectable } from '@nestjs/common';
import { EmailService } from './email/email.service';

@Injectable()
export class AppService {
  getServerStatus(): object {
    return {
      status: 'ok',
      current_time: new Date().toString(),
      message: 'server is running',
    };
  }
}
