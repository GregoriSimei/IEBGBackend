import { Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserDTO } from '../DTOs/UserDTO';
import { IUserRepository } from './IUserRepository';
import { BinaryLike, pbkdf2Sync } from 'crypto';

export class UserRepository implements IUserRepository {
  private hashSalt: BinaryLike = process.env.PASS_HASH_SALT as string;
  private hashIteration: number = parseInt(process.env.PASS_HASH_ITERATION);
  private hashType: string = process.env.PASS_HASH_TYPE as string;

  constructor(
    @Inject('TYPEORM_ENTITY_USER')
    private userRepository: Repository<UserDTO>,
  ) {}

  async create(user: UserDTO): Promise<UserDTO> {
    return this.userRepository.save(user);
  }

  async findUserByEmail(email: string): Promise<UserDTO> {
    return this.userRepository.findOneBy({
      email,
    });
  }

  async createPasswordHash(password: string): Promise<string> {
    const passwordHashed = pbkdf2Sync(
      password,
      this.hashSalt,
      this.hashIteration,
      64,
      this.hashType,
    ).toString('hex');

    return passwordHashed;
  }

  async verifyPasswordHash(
    password: string,
    hashToCompare: string,
  ): Promise<boolean> {
    const passwordHashed = pbkdf2Sync(
      password,
      this.hashSalt,
      this.hashIteration,
      64,
      this.hashType,
    ).toString('hex');

    return passwordHashed == hashToCompare;
  }
}
