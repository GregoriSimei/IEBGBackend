import { UserRepository } from 'src/modules/user/repositories/UserRepository';
import { Repository } from 'typeorm';
import { UserDTO } from '../../DTOs/UserDTO';
import { IUserRepository } from '../IUserRepository';

describe('User Login Service', () => {
  let userRepository: IUserRepository;

  beforeEach(async () => {
    const userRepositoryORM: Repository<UserDTO> = null;
    userRepository = new UserRepository(userRepositoryORM);
  });

  it('When pass some password to createPasswordHash function should return a valid hash with length equals 64 characters', async () => {
    const hashValidRegex = /[0-9a-f]{64}/i;
    const passwordToHash = '123456';

    const passwordHashed = await userRepository.createPasswordHash(
      passwordToHash,
    );

    expect(hashValidRegex.test(passwordHashed)).toBe(true);
  });

  it('When create some hashed password and compare it in verifyPasswordHash function should return a true varification', async () => {
    const passwordToHash = '123456';

    const passwordHashed = await userRepository.createPasswordHash(
      passwordToHash,
    );

    const hashTest = await userRepository.verifyPasswordHash(
      passwordToHash,
      passwordHashed,
    );

    expect(hashTest).toBe(true);
  });

  it('When some password with a wrong hash in verifyPasswordHash function should return a false varification', async () => {
    const passwordToHash = '123456';
    const worngPasswordHash = 'ahuiq4380jh193hj5jh34';

    const hashTest = await userRepository.verifyPasswordHash(
      passwordToHash,
      worngPasswordHash,
    );

    expect(hashTest).toBe(false);
  });
});
