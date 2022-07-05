import { ApiProperty } from '@nestjs/swagger';

export class ErrorModel {
  @ApiProperty()
  protected message: string;

  @ApiProperty()
  protected status: number;

  constructor(message: string, status: number) {
    this.message = message;
    this.status = status;
  }

  getMessage(): string {
    return this.message;
  }

  getStatus(): number {
    return this.status;
  }
}
