import { InMemoryUsersRepository } from 'test/repositories/in-memory-users.repository';
import { User } from '@domain/accounts/enterprise/entities/user';
import { FakeHasher } from 'test/gateways/fake-hasher';
import { InMemoryPasswordRecoveryTokensRepository } from 'test/repositories/in-memory-password-recovery-tokens.repository';
import { PasswordRecoveryToken } from '@domain/accounts/enterprise/entities/password-recovery-token';
import { makeUser } from 'test/factories/make-user';
import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { ResetPasswordWithTokenUseCase } from './reset-password-with-token.use-case';
import { HasherGateway } from '../gateways/hasher';
import { InvalidRecoveryTokenError } from './errors/invalid-recovery-token.error';
import { UnmatchedPasswordsError } from './errors/unmatched-passwords.error';
import { UserNotFoundError } from './errors/user-not-found.error';

describe('#UC04 ResetPasswordWithTokenUseCase', () => {
  let usersRepository: InMemoryUsersRepository;
  let passwordRecoveryTokensRepository: InMemoryPasswordRecoveryTokensRepository;
  let hasher: HasherGateway;

  let resetPasswordWithTokenUseCase: ResetPasswordWithTokenUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    passwordRecoveryTokensRepository =
      new InMemoryPasswordRecoveryTokensRepository();
    hasher = new FakeHasher();

    resetPasswordWithTokenUseCase = new ResetPasswordWithTokenUseCase(
      passwordRecoveryTokensRepository,
      usersRepository,
      hasher,
    );
  });

  it('should be able to reset an user password with a token', async () => {
    const user = makeUser();
    const passwordRecoveryToken = PasswordRecoveryToken.create({
      token: UniqueEntityId.create(),
      userId: user.id,
    });

    await usersRepository.insert(user);
    await passwordRecoveryTokensRepository.insert(passwordRecoveryToken);

    const spyFindByToken = vi.spyOn(
      passwordRecoveryTokensRepository,
      'findByToken',
    );
    const spyDelete = vi.spyOn(passwordRecoveryTokensRepository, 'delete');
    const spyFindById = vi.spyOn(usersRepository, 'findById');
    const spyUpdate = vi.spyOn(usersRepository, 'update');
    const spyHash = vi.spyOn(hasher, 'hash');

    const input = {
      token: passwordRecoveryToken.token.value,
      password: 'new-password',
      passwordConfirmation: 'new-password',
    };

    await expect(
      resetPasswordWithTokenUseCase.execute(input),
    ).resolves.not.toThrowError();

    expect(spyFindByToken).toHaveBeenCalledWith(passwordRecoveryToken.token);
    expect(spyDelete).toHaveBeenCalledWith(expect.any(PasswordRecoveryToken));
    expect(spyFindById).toHaveBeenCalledOnce();
    expect(spyUpdate).toHaveBeenCalledWith(expect.any(User));
    expect(spyHash).toHaveBeenCalledWith(input.password);

    expect(usersRepository.items[0].hashedPassword).toBe('new-password-hashed');
  });

  it('should throw an error if the token does not exists', async () => {
    const input = {
      token: UniqueEntityId.create().value,
      password: 'new-password',
      passwordConfirmation: 'new-password',
    };

    await expect(
      resetPasswordWithTokenUseCase.execute(input),
    ).rejects.toThrowError(InvalidRecoveryTokenError);
  });

  it('should throw an error if the token is invalid', async () => {
    const user = makeUser();
    const passwordRecoveryToken = PasswordRecoveryToken.create({
      token: UniqueEntityId.create(),
      userId: user.id,
      expiresAt: new Date(Date.now() - 1000),
    });
    await usersRepository.insert(user);
    await passwordRecoveryTokensRepository.insert(passwordRecoveryToken);

    const input = {
      token: passwordRecoveryToken.token.value,
      password: 'new-password',
      passwordConfirmation: 'new-password',
    };

    await expect(
      resetPasswordWithTokenUseCase.execute(input),
    ).rejects.toThrowError(InvalidRecoveryTokenError);
  });

  it('should throw an error if the passwords do not match', async () => {
    const user = makeUser();
    const passwordRecoveryToken = PasswordRecoveryToken.create({
      token: UniqueEntityId.create(),
      userId: user.id,
    });
    await usersRepository.insert(user);
    await passwordRecoveryTokensRepository.insert(passwordRecoveryToken);

    const input = {
      token: passwordRecoveryToken.token.value,
      password: 'new-password',
      passwordConfirmation: 'another-new-password',
    };

    await expect(
      resetPasswordWithTokenUseCase.execute(input),
    ).rejects.toThrowError(UnmatchedPasswordsError);
  });

  it('should throw an error if the user is not found', async () => {
    const passwordRecoveryToken = PasswordRecoveryToken.create({
      token: UniqueEntityId.create(),
      userId: UniqueEntityId.create(),
    });
    await passwordRecoveryTokensRepository.insert(passwordRecoveryToken);

    const input = {
      token: passwordRecoveryToken.token.value,
      password: 'new-password',
      passwordConfirmation: 'new-password',
    };

    await expect(
      resetPasswordWithTokenUseCase.execute(input),
    ).rejects.toThrowError(UserNotFoundError);
  });
});
