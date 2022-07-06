import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/modules/user/DTOs/CreateUserDTO';
import { EnumUserRole } from 'src/modules/user/DTOs/EnumUserRole';
import { UserDTO } from 'src/modules/user/DTOs/UserDTO';
import { IUserRepository } from 'src/modules/user/repositories/IUserRepository';
import { BadRequest } from 'src/shared/DTO/BadRequest';

@Injectable()
export class CreateUserService {
  constructor(
    @Inject('REPOSITORY_USER')
    private userRepository: IUserRepository,
  ) {}

  async createUser(userToCreate: CreateUserDTO): Promise<UserDTO> {
    const { email, pass } = userToCreate;

    const userExist = await this.userRepository.findUserByEmail(email);
    if (userExist) throw new BadRequest('User already exist.');

    const passwordHashed = await this.userRepository.createPasswordHash(pass);

    const createdUser = await this.userRepository.create({
      email,
      role: EnumUserRole.USER,
      pass: passwordHashed,
    });

    delete createdUser.pass;

    return createdUser;
  }
}
