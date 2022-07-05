import { HttpStatus } from '@nestjs/common';
import { ErrorModel } from 'src/config/errors/ErrorModel';

export class BadRequest extends ErrorModel {
  constructor(message: string) {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
