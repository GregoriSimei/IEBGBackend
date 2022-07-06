import { EnumUserRole } from './EnumUserRole';

export class UpdateUserDTO {
  id: number;
  email: string;
  pass: string;
  role?: EnumUserRole;
}
