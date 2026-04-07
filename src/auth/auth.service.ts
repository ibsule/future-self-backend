import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { compareStringAndHash } from 'src/utils/string.utils';
import { AuthSessionService } from './auth-session.service';
import { User } from 'src/user/entities/user.entity';
import { createJwtToken } from 'src/utils/jwt.utils';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly authSessionService: AuthSessionService,
  ) {}

  async login({ email, password }) {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user) throw new NotFoundException('user with this email not found.');

    const isMatch = await compareStringAndHash(password, user.password_hash);

    if (!isMatch) throw new BadRequestException('invalid password.');

    const payload = {
      user_id: user.id,
    };

    // Create JWT Token
    const token = createJwtToken(payload);

    await this.authSessionService.create({
      user_id: user.id,
      user_email: user.email,
    });

    return {
      token,
    };
  }
}
