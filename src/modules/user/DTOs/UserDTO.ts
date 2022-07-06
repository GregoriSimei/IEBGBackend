import { ApiProperty } from '@nestjs/swagger';
import { EnumUserRole } from './EnumUserRole';

export class UserDTO {
  @ApiProperty()
  id?: number;

  @ApiProperty()
  email: string;

  @ApiProperty()
  role: EnumUserRole;

  @ApiProperty()
  pass: string;

  @ApiProperty()
  created_at?: Date;

  @ApiProperty()
  updated_at?: Date;
}
