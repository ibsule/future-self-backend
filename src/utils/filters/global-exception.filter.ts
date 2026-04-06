import { ExceptionFilter, Catch, ArgumentsHost, Logger } from '@nestjs/common';
import { Response } from 'express';

@Catch()
export default class GlobalExceptionsHandler implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionsHandler.name);

  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const status = exception.status || 500;

    let message = '';

    this.logger.log(exception);

    message = exception?.response?.message || exception.message || 'Internal server error.';

    return response.json({
      statusCode: status,
      message: message.toString(),
      error: {},
    });
  }
}