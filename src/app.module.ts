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
    HttpModule,
    MessengerModule,
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, HttpRequestsUtil, EmailService],
})
export class AppModule {}
