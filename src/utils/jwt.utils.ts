import { ConfigService } from '@nestjs/config';
import * as jwt from 'jsonwebtoken';

const configService = new ConfigService<IENV, true>()
const APPLICATION_KEY = configService.get('APP_KEY', {infer: true});

export function createJwtToken(data: object, expiresIn = '1d') {
  const token = jwt.sign(data, APPLICATION_KEY, {
    expiresIn,
  });

  return token;
}

export function decodeJwtToken(token: string) {
  try {
    const data = jwt.verify(token, APPLICATION_KEY);
    return data;
  } catch (error) {
    return false;
  }
}
