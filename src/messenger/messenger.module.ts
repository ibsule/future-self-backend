import { Module } from '@nestjs/common';
import { MessengerService } from './messenger.service';
import { MessengerController } from './messenger.controller';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MessageToFuture } from './entities/message.entity';
import { BullModule } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import { QUEUE_NAME } from 'src/constants';
import { MessageToFutureConsumer } from './message-to-future.consumer';
import { EmailService } from 'src/email/email.service';
import { HttpModule } from '@nestjs/axios';
import { HttpRequestsUtil } from 'src/utils/http.util';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([MessageToFuture, User]),
    BullModule.registerQueueAsync({ name: QUEUE_NAME.MESSAGE_TO_FUTURE }),
    AuthModule,
    HttpModule,
  ],
  controllers: [MessengerController],
  providers: [
    MessengerService,
    MessageToFutureConsumer,
    HttpRequestsUtil,
    EmailService,
  ],
})
export class MessengerModule {}
