import { ApiProperty } from '@nestjs/swagger';
import { UserDTO } from './UserDTO';

export class LoginResponseDTO {
  @ApiProperty()
  user: UserDTO;

  @ApiProperty()
  token: string;
}
