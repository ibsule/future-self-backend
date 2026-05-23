import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthSession } from './entities/auth.entity';
import { User } from 'src/user/entities/user.entity';
import { AuthSessionService } from './auth-session.service';
import { EmailService } from 'src/email/email.service';
import { HttpModule } from '@nestjs/axios';
import { HttpRequestsUtil } from 'src/utils/http.util';

@Module({
  imports: [TypeOrmModule.forFeature([AuthSession, User]), HttpModule],
  controllers: [AuthController],
  providers: [AuthService, AuthSessionService, HttpRequestsUtil, EmailService],
  exports: [AuthSessionService],
})
export class AuthModule {}
