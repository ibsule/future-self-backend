import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisClientType } from '@redis/client';
import { createClient } from 'redis';

@Injectable()
export class RedisService {
  private redisClient: RedisClientType;
  private redisUrl: string;

  private readonly logger = new Logger(RedisService.name);

  constructor(private readonly configService: ConfigService<IENV, true>) {
    this.redisUrl = `redis://${this.configService.get('REDIS_HOST')}:${this.configService.get('REDIS_PORT')}`;
    this.redisClient = createClient({
      url: this.redisUrl,
      socket: { connectTimeout: 10000 },
    });
    this.redisClient
      .connect()
      .then(() => this.logger.log(`Connected to redis successfully.`))
      .catch((e) => {
        this.logger.error(`Error connecting to redis: ${e.message}`);
      });
  }

  async set({ key, value, ttl }: { key: string; value: any; ttl: number }) {
    try {
      const result = await this.redisClient.set(key, JSON.stringify(value), {
        expiration: { type: 'EX', value: ttl },
      });
      return result;
    } catch (error: any) {
      this.logger.error(error.message);
      return null;
    }
  }

  async addToSet({ key, value }: { key: string; value: any }) {
    try {
      const result = await this.redisClient.sAdd(key, value);
      return result;
    } catch (error: any) {
      this.logger.error(error.message);
      return null;
    }
  }

  async get({ key }: { key: string }) {
    try {
      const result = await this.redisClient.get(key);
      if (!result) return null;

      return JSON.parse(result);
    } catch (error: any) {
      this.logger.error(error.message);
      return null;
    }
  }

  async remove({ keys }: { keys: string[] }) {
    try {
      const result = await this.redisClient.del(keys);
      return result;
    } catch (error: any) {
      this.logger.error(error.message);
      return null;
    }
  }

  async removeFromSet({ key, value }: { key: string; value: any }) {
    try {
      const result = await this.redisClient.sRem(key, value);
      return result;
    } catch (error: any) {
      this.logger.error(error.message);
      return null;
    }
  }

  async getMembersInSet({ key }: { key: string }) {
    try {
      const result = await this.redisClient.sMembers(key);
      return result;
    } catch (error: any) {
      this.logger.error(error.message);
      return null;
    }
  }
}
