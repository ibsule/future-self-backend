import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthSession } from './entities/auth.entity';
import { User } from 'src/user/entities/user.entity';
import { AuthSessionService } from './auth-session.service';

@Module({
  imports: [TypeOrmModule.forFeature([AuthSession, User])],
  controllers: [AuthController],
  providers: [AuthService, AuthSessionService],
})
export class AuthModule {}
