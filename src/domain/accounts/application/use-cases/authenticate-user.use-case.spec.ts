import { InMemoryUsersRepository } from 'test/repositories/in-memory-users.repository';
import { FakeHasher } from 'test/gateways/fake-hasher';
import { FakeEncrypter } from 'test/gateways/fake-encrypter';
import { UserBuilder } from 'test/data-builders/user.builder';
import { InMemoryRefreshTokensRepository } from 'test/repositories/in-memory-refresh-tokens.repository';
import { AuthenticateUserUseCase } from './authenticate-user.use-case';
import { HasherGateway } from '../gateways/hasher';
import { EncrypterGateway } from '../gateways/encrypter';
import { WrongCredentialsError } from './errors/wrong-credentials.error';

describe('#UC03 AuthenticateUserUseCase', () => {
  let usersRepository: InMemoryUsersRepository;
  let refreshTokensRepository: InMemoryRefreshTokensRepository;
  let hasher: HasherGateway;
  let encrypter: EncrypterGateway;

  let authenticateUserUseCase: AuthenticateUserUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    refreshTokensRepository = new InMemoryRefreshTokensRepository();

    hasher = new FakeHasher();
    encrypter = new FakeEncrypter();

    authenticateUserUseCase = new AuthenticateUserUseCase(
      usersRepository,
      refreshTokensRepository,
      hasher,
      encrypter,
    );
  });

  it('should be able to authenticate an user', async () => {
    const usersRepositoryFindByEmailSpy = vi.spyOn(
      usersRepository,
      'findByEmail',
    );
    const hasherCompareSpy = vi.spyOn(hasher, 'compare');

    const user = UserBuilder.create()
      .withEmail('test@email.com')
      .withHashedPassword('some-password-hashed')
      .build();
    await usersRepository.insert(user);

    const input = {
      email: 'test@email.com',
      password: 'some-password',
    };

    const output = await authenticateUserUseCase.execute(input);

    expect(output).toHaveProperty('accessToken');
    expect(output.accessToken).toBe(JSON.stringify({ sub: user.id.value }));

    expect(usersRepositoryFindByEmailSpy).toHaveBeenCalledWith(
      'test@email.com',
    );
    expect(hasherCompareSpy).toHaveBeenCalledWith(
      'some-password',
      'some-password-hashed',
    );
  });

  it('should throw an error if the user does not exists', async () => {
    const input = {
      email: 'non.user@email.com',
      password: 'some-password',
    };

    await expect(authenticateUserUseCase.execute(input)).rejects.toThrow(
      WrongCredentialsError,
    );
  });

  it('should throw an error if the password is wrong', async () => {
    const user = UserBuilder.create()
      .withEmail('test@email.com')
      .withHashedPassword('some-password-hashed')
      .build();
    await usersRepository.insert(user);

    const input = {
      email: 'test@email.com',
      password: 'wrong-password',
    };

    await expect(authenticateUserUseCase.execute(input)).rejects.toThrow(
      WrongCredentialsError,
    );
  });
});
