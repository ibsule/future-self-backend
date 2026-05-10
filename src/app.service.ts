import { Injectable } from '@nestjs/common';

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
