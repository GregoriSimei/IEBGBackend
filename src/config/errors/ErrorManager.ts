import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { ErrorResponse } from './ErrorResponse';
import { ErrorModel } from './ErrorModel';

export class ErrorManager implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const responseObject = {
      status: HttpStatus.FORBIDDEN,
      message: `Internal Server error - ${exception.message}`,
    };

    if (exception instanceof ErrorModel) {
      responseObject.message = exception.getMessage();
      responseObject.status = exception.getStatus();
    } else if (exception instanceof HttpException) {
      responseObject.message = exception.message;
      responseObject.status = exception.getStatus();
    }

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    return response
      .status(responseObject.status)
      .json(new ErrorResponse(responseObject));
  }
}
