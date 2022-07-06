import { Inject, Injectable } from '@nestjs/common';
import { UpdateUserDTO } from 'src/modules/user/DTOs/UpdateUserDTO';
import { UserDTO } from 'src/modules/user/DTOs/UserDTO';
import { IUserRepository } from 'src/modules/user/repositories/IUserRepository';

@Injectable()
export class UpdateUserService {
  constructor(
    @Inject('REPOSITORY_USER')
    private userRepository: IUserRepository,
  ) {}

  async updateUser(userToUpdate: UpdateUserDTO): Promise<UserDTO> {
    return null;
  }
}
