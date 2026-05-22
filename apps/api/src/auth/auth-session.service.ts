import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { IAuthSession } from './interfaces/auth-session.interface';
import { RedisService } from 'src/redis/redis.service';
import {
  AUTH_SESSION_PREFIX,
  AUTH_SESSION_TTL,
  USER_SESSIONS_PREFIX,
} from 'src/constants';
import { nanoid } from 'nanoid';

@Injectable()
export class AuthSessionService {
  constructor(private readonly redisService: RedisService) {}

  async create(data: IAuthSession) {
    try {
      const sessionId = nanoid();

      const authSessionKey = `${AUTH_SESSION_PREFIX}${sessionId}`;
      const authSessionValue = JSON.stringify(data);
      const userSessionKey = `${USER_SESSIONS_PREFIX}${data.userId}`;
      const userSessionsValue = sessionId;

      const authSession = await this.redisService.set({
        key: authSessionKey,
        value: authSessionValue,
        ttl: AUTH_SESSION_TTL,
      });

      if (!authSession) throw new UnprocessableEntityException();

      const userSession = await this.redisService.addToSet({
        key: userSessionKey,
        value: userSessionsValue,
      });

      if (!userSession) throw new UnprocessableEntityException();

      return sessionId;
    } catch (error) {
      return null;
    }
  }

  async get(sessionId: string) {
    try {
      const key = `${AUTH_SESSION_PREFIX}${sessionId}`;
      const result = await this.redisService.get({ key });
      return JSON.parse(result);
    } catch (error) {
      return null;
    }
  }

  async delete(sessionId: string, userId: string) {
    try {
      const authSessionKey = `${AUTH_SESSION_PREFIX}${sessionId}`;
      const userSessionsKey = `${USER_SESSIONS_PREFIX}${userId}`;

      await this.redisService.remove({ keys: [authSessionKey] });
      await this.redisService.removeFromSet({
        key: userSessionsKey,
        value: sessionId,
      });
    } catch (error) {
      return null;
    }
  }

  async deleteAll(userId: string) {
    try {
      const userSessionsKey = `${USER_SESSIONS_PREFIX}${userId}`;

      // Get all session keys associated to user
      const authSessions = await this.redisService.getMembersInSet({
        key: userSessionsKey,
      });

      if (!authSessions) return null;

      // Delete all user auth sessions
      if (authSessions.length) {
        const keys = authSessions.map(
          (sessionId) => `${AUTH_SESSION_PREFIX}${sessionId}`,
        );
        await this.redisService.remove({ keys });
      }

      // Clear the user sessions set
      await this.redisService.remove({ keys: [userSessionsKey] });
    } catch (error) {
      return null;
    }
  }
}
