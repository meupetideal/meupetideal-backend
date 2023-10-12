import { InMemoryUsersRepository } from 'test/repositories/in-memory-users.repository';
import { User } from '@domain/accounts/enterprise/entities/user';
import { FakeHasher } from 'test/gateways/fake-hasher';
import { UserBuilder } from 'test/data-builders/user.builder';
import { ResetPasswordWithCurrentPasswordUseCase } from './reset-password-with-current-password.use-case';
import { HasherGateway } from '../gateways/hasher';
import { UnmatchedPasswordsError } from './errors/unmatched-passwords.error';
import { UserNotFoundError } from './errors/user-not-found.error';

describe('#UC05 ResetPasswordWithCurrentPasswordUseCase', () => {
  let usersRepository: InMemoryUsersRepository;
  let hasher: HasherGateway;

  let resetPasswordWithCurrentPasswordUseCase: ResetPasswordWithCurrentPasswordUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    hasher = new FakeHasher();

    resetPasswordWithCurrentPasswordUseCase =
      new ResetPasswordWithCurrentPasswordUseCase(usersRepository, hasher);
  });

  it('should be able to reset an user password with a token', async () => {
    const user = UserBuilder.create().build();
    await usersRepository.insert(user);

    const spyFindById = vi.spyOn(usersRepository, 'findById');
    const spyUpdate = vi.spyOn(usersRepository, 'update');
    const spyHash = vi.spyOn(hasher, 'hash');

    const input = {
      userId: user.id.value,
      password: 'new-password',
      passwordConfirmation: 'new-password',
    };

    await expect(
      resetPasswordWithCurrentPasswordUseCase.execute(input),
    ).resolves.not.toThrowError();

    expect(spyFindById).toHaveBeenCalledOnce();
    expect(spyUpdate).toHaveBeenCalledWith(expect.any(User));
    expect(spyHash).toHaveBeenCalledWith(input.password);

    expect(usersRepository.items[0].hashedPassword).toBe('new-password-hashed');
  });

  it('should throw an error if the passwords do not match', async () => {
    const user = UserBuilder.create().build();
    await usersRepository.insert(user);

    const input = {
      userId: user.id.value,
      password: 'new-password',
      passwordConfirmation: 'another-new-password',
    };

    await expect(
      resetPasswordWithCurrentPasswordUseCase.execute(input),
    ).rejects.toThrowError(UnmatchedPasswordsError);
  });

  it('should throw an error if the user is not found', async () => {
    const input = {
      userId: 'non-existent-user-id',
      password: 'new-password',
      passwordConfirmation: 'new-password',
    };

    await expect(
      resetPasswordWithCurrentPasswordUseCase.execute(input),
    ).rejects.toThrowError(UserNotFoundError);
  });
});
