import { InMemoryUsersRepository } from 'test/repositories/in-memory-users.repository';
import { User } from '@domain/accounts/enterprise/entities/user';
import { FakeHasher } from 'test/gateways/fake-hasher';
import { UserBuilder } from 'test/data-builders/user.builder';
import { ResetPasswordWithCurrentPasswordUseCase } from './reset-password-with-current-password.use-case';
import { HasherGateway } from '../gateways/hasher';
import { UnmatchedPasswordsError } from './errors/unmatched-passwords.error';
import { UserNotFoundError } from './errors/user-not-found.error';
import { UsersService } from '../services/users.service';

describe('#UC05 ResetPasswordWithCurrentPasswordUseCase', () => {
  let usersRepository: InMemoryUsersRepository;
  let usersService: UsersService;
  let hasher: HasherGateway;

  let resetPasswordWithCurrentPasswordUseCase: ResetPasswordWithCurrentPasswordUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    hasher = new FakeHasher();
    usersService = new UsersService(usersRepository, hasher);

    resetPasswordWithCurrentPasswordUseCase =
      new ResetPasswordWithCurrentPasswordUseCase(usersService, hasher);
  });

  it('should be able to reset an user password with current password', async () => {
    const user = UserBuilder.create()
      .withHashedPassword('old-password-hashed')
      .build();
    await usersRepository.insert(user);

    const spyFindById = vi.spyOn(usersRepository, 'findById');
    const spyUpdate = vi.spyOn(usersRepository, 'save');
    const spyHash = vi.spyOn(hasher, 'hash');

    const input = {
      userId: user.id.value,
      oldPassword: 'old-password',
      password: 'new-password',
      passwordConfirmation: 'new-password',
    };

    await expect(
      resetPasswordWithCurrentPasswordUseCase.execute(input),
    ).resolves.not.toThrowError();

    expect(spyFindById).toHaveBeenCalledTimes(2);
    expect(spyUpdate).toHaveBeenCalledWith(expect.any(User));
    expect(spyHash).toHaveBeenCalledWith(input.password);

    expect(usersRepository.items[0].hashedPassword).toBe('new-password-hashed');
  });

  it('should throw an error if the old password do not match with the registered password', async () => {
    const user = UserBuilder.create()
      .withHashedPassword('old-password-hashed')
      .build();
    await usersRepository.insert(user);

    const input = {
      userId: user.id.value,
      oldPassword: 'different-old-password',
      password: 'new-password',
      passwordConfirmation: 'new-password',
    };

    await expect(() =>
      resetPasswordWithCurrentPasswordUseCase.execute(input),
    ).rejects.toThrow(UnmatchedPasswordsError);
  });

  it('should throw an error if the new passwords do not match', async () => {
    const user = UserBuilder.create()
      .withHashedPassword('old-password-hashed')
      .build();
    await usersRepository.insert(user);

    const input = {
      userId: user.id.value,
      oldPassword: 'old-password',
      password: 'new-password',
      passwordConfirmation: 'another-new-password',
    };

    await expect(() =>
      resetPasswordWithCurrentPasswordUseCase.execute(input),
    ).rejects.toThrow(UnmatchedPasswordsError);
  });

  it('should throw an error if the user is not found', async () => {
    const input = {
      userId: 'non-existent-user-id',
      oldPassword: 'old-password',
      password: 'new-password',
      passwordConfirmation: 'new-password',
    };

    await expect(
      resetPasswordWithCurrentPasswordUseCase.execute(input),
    ).rejects.toThrowError(UserNotFoundError);
  });
});
