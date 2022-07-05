import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDTO {
  @ApiProperty()
  email: string;

  @ApiProperty()
  pass: string;
}
