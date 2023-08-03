import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { exceptions } from './exception.constants';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(error: Error, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    for (const exceptionName in exceptions) {
      const errorClass = exceptions[exceptionName];
      if (error instanceof errorClass) {
        return response.status(Number(exceptionName)).json(error);
      }
    }

    const InternalServerError = {
      error: error.name,
      message: error.message,
    };

    response
      .status(500)
      .json(InternalServerError);
  }
}
