export class ResponseModel {
  status: number;
  message: string;

  constructor(message, status) {
    this.message = message;
    this.status = status;
  }
}
