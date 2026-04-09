import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { EmailService } from './email/email.service';
import { HttpModule } from '@nestjs/axios';
import { HttpRequestsUtil } from './utils/http.util';
import { MessengerModule } from './messenger/messenger.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BullModule } from '@nestjs/bullmq';
import { QUEUE_NAME } from './constants';
import { RedisModule } from './redis/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.local' }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<IENV, true>) => ({
        type: 'postgres',
        host: config.get('POSTGRES_HOST'),
        port: config.get('POSTGRES_PORT'),
        username: config.get('POSTGRES_USER'),
        password: config.get('POSTGRES_PASSWORD'),
        database: config.get('POSTGRES_DB'),
        autoLoadEntities: true,
        synchronize: config.get('NODE_ENVIRONMENT') === 'prod' ? false : true,
      }),
    }),
    BullModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService<IENV, true>) => ({
        connection: {
          host: config.get('REDIS_HOST'),
          port: config.get('REDIS_PORT'),
        },
        defaultJobOptions: {
          removeOnComplete: 1000,
          removeOnFail: 5000
        },
      }),
    }),
    BullModule.registerQueueAsync({
      name: QUEUE_NAME.MESSAGE_TO_FUTURE,
    }),
    HttpModule,
    MessengerModule,
    AuthModule,
    UserModule,
    RedisModule,
  ],
  controllers: [AppController],
  providers: [AppService, HttpRequestsUtil, EmailService],
})
export class AppModule {}
