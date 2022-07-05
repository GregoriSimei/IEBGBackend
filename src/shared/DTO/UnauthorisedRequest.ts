import { HttpStatus } from '@nestjs/common';
import { ErrorModel } from 'src/config/errors/ErrorModel';

export class UnauthorizedRequest extends ErrorModel {
  constructor(message: string) {
    super(message, HttpStatus.UNAUTHORIZED);
  }
}
