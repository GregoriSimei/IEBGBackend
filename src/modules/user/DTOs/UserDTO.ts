import { ApiProperty } from '@nestjs/swagger';

export class UserDTO {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  pass: string;

  @ApiProperty()
  created_at?: Date;

  @ApiProperty()
  updated_at?: Date;
}
