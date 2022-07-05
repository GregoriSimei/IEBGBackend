import { UserDTO } from '../DTOs/UserDTO';

export interface IUserRepository {
  create(user: UserDTO): Promise<UserDTO>;
  createPasswordHash(password: string): Promise<string>;
  verifyPasswordHash(password: string, hashToCompare: string): Promise<boolean>;
  findUserByEmail(email: string): Promise<UserDTO>;
}
