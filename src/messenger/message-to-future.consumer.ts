import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { QUEUE_NAME } from 'src/constants';
import { MessengerService } from './messenger.service';
import { Logger } from '@nestjs/common';

@Processor(QUEUE_NAME.MESSAGE_TO_FUTURE)
export class MessageToFutureConsumer extends WorkerHost {
  private readonly logger = new Logger(MessageToFutureConsumer.name);

  constructor(private readonly messengerService: MessengerService) {
    super();
  }

  async process(job: Job<any, any, string>): Promise<any> {
    const messageId = job.data.messageId;
    this.messengerService.sendMessage(messageId);
    this.logger.log(`Job #${job.id} processing...`);
  }
}
