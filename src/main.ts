import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import GlobalExceptionsHandler from './utils/filters/global-exception.filter';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalFilters(new GlobalExceptionsHandler());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.use(morgan('combined'));
  app.use(helmet());

  const config = app.get(ConfigService<IENV, true>);
  const APP_PORT = config.get('APP_PORT');

  await app.listen(APP_PORT, () => {
    console.log(`Server running on ${APP_PORT}`);
  });
}

bootstrap();
