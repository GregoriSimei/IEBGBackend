import { sign } from 'jsonwebtoken';
import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDTO } from 'src/modules/user/DTOs/CreateUserDTO';
import { IUserRepository } from 'src/modules/user/repositories/IUserRepository';
import { BadRequest } from 'src/shared/DTO/BadRequest';
import { authConfig } from 'src/config/Auth';
import { LoginResponseDTO } from 'src/modules/user/DTOs/LoginResponseDTO';

@Injectable()
export class LoginService {
  constructor(
    @Inject('REPOSITORY_USER')
    private userRepository: IUserRepository,
  ) {}

  async login(userToLogin: CreateUserDTO): Promise<LoginResponseDTO> {
    const anyLoginErrorText = 'Email or password incorrect.';

    const { email, pass } = userToLogin;

    const userExist = await this.userRepository.findUserByEmail(email);
    if (!userExist) throw new BadRequest(anyLoginErrorText);

    const passwordHashed = userExist.pass;
    const passwordMatch = await this.userRepository.verifyPasswordHash(
      pass,
      passwordHashed,
    );

    if (!passwordMatch) throw new BadRequest(anyLoginErrorText);

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign(
      {
        id: userExist.id,
        email: userExist.email,
        role: userExist.role,
      },
      secret,
      {
        subject: String(userExist.id),
        expiresIn,
      },
    );

    delete userExist.pass;

    const response: LoginResponseDTO = {
      user: userExist,
      token,
    };

    return response;
  }
}
