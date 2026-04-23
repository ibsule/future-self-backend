import { Injectable } from '@nestjs/common';
import { EmailService } from './email/email.service';

@Injectable()
export class AppService {
  getServerStatus(): object {
    return {
      name: 'futureself-api',
      status: 'running',
      current_time: new Date().toString(),
    };
  }
}
