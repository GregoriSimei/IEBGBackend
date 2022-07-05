import { ResponseModel } from 'src/shared/DTO/ResponseModel';

export class ErrorResponse extends ResponseModel {
  constructor({ message, status }) {
    super(message, status);
  }
}
