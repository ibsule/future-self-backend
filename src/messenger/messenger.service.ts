import {
  BadRequestException,
  GoneException,
  Injectable,
  Logger,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateMessengerDto } from './dto/create-messenger.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { MessageToFuture } from './entities/message.entity';
import { Repository } from 'typeorm';
import { InjectQueue } from '@nestjs/bullmq';
import { Queue } from 'bullmq';
import {
  EMAIL_TEMPLATES,
  MESSAGE_FROM_PAST_DEFAULT_EMAIL_SUBJECT,
  QUEUE_NAME,
} from 'src/constants';
import { EmailService } from 'src/email/email.service';
import { User } from 'src/user/entities/user.entity';
@Injectable()
export class MessengerService {
  constructor(
    @InjectRepository(MessageToFuture)
    private readonly messageToFutureRepository: Repository<MessageToFuture>,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectQueue(QUEUE_NAME.MESSAGE_TO_FUTURE)
    private messageToFutureQueue: Queue,
    private readonly emailService: EmailService,
  ) {}

  private readonly logger = new Logger();

  async create(data: CreateMessengerDto, user_id: string) {
    // Validate that date 'send_at' is a future date
    const isDateFuture = new Date(data.send_at).getTime() > Date.now();

    if (!isDateFuture) {
      throw new BadRequestException('send_at should be a time in the future.');
    }

    const message = this.messageToFutureRepository.create({
      ...data,
      created_by: user_id,
    });

    const savedMessage = await this.messageToFutureRepository.save(message);

    if (!savedMessage) {
      throw new UnprocessableEntityException(
        'failed to create message. please try again.',
      );
    }

    const delay = new Date(data.send_at).getTime() - Date.now();

    // Add message to queue
    const job = await this.messageToFutureQueue.add(
      'default',
      {
        messageId: savedMessage.id,
      },
      { delay },
    );

    if (!job) {
      throw new UnprocessableEntityException(
        'failed to add message to queue. please try again',
      );
    }

    return {
      message: 'success',
    };
  }

  async sendMessage(messageId: number) {
    try {
      const message = await this.messageToFutureRepository.findOne({
        where: { id: messageId },
      });

      if (!message) {
        throw new NotFoundException('message with id not found.');
      }

      const user = await this.userRepository.findOneBy({
        id: message.created_by,
      });

      if (!user) {
        throw new NotFoundException('user not found.');
      }

      const recipientEmail = user.email;
      const recipientName = user.first_name;
      const emailSubject = message.title;
      const emailData = {
        recipientName,
        title: message.title,
        content: message.content,
        writtenOn: message.created_at.toLocaleString('en-US', {
          dateStyle: 'full',
          timeStyle: 'short',
        }),
        senderName: user.first_name,
      };

      const emailTemplate = EMAIL_TEMPLATES.MESSAGE_TO_FUTURE;

      // this.emailService.send({
      //   recipientEmail,
      //   recipientName,
      //   emailSubject,
      //   emailData,
      //   emailTemplate,
      // });

      message.sent = true;
      this.messageToFutureRepository.save(message);

      this.logger.verbose(`Message #${message.id} sent.`);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
