import { InMemoryUsersRepository } from 'test/repositories/in-memory-users.repository';
import { InMemoryPasswordRecoveryTokensRepository } from 'test/repositories/in-memory-password-recovery-tokens.repository';
import { makeUser } from 'test/factories/make-user';
import { PasswordRecoveryToken } from '@domain/accounts/enterprise/entities/password-recovery-token';
import { PasswordRecoveryTokensRepository } from '../repositories/password-recovery-tokens.repository';
import { UsersRepository } from '../repositories/users.repository';
import { RecoverPasswordWithEmailUseCase } from './recover-password-with-email.use-case';
import { UserAlreadyExistsError } from './errors/user-already-exists.error';

describe('#UC02 RecoverPasswordWithEmailUseCase', () => {
  let usersRepository: UsersRepository;
  let passwordRecoveryTokensRepository: PasswordRecoveryTokensRepository;

  let recoverPasswordWithEmailUseCase: RecoverPasswordWithEmailUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    passwordRecoveryTokensRepository =
      new InMemoryPasswordRecoveryTokensRepository();

    recoverPasswordWithEmailUseCase = new RecoverPasswordWithEmailUseCase(
      usersRepository,
      passwordRecoveryTokensRepository,
    );
  });

  it('should create a password recovery token', async () => {
    const spyFindByEmail = vi.spyOn(usersRepository, 'findByEmail');
    const spyInsert = vi.spyOn(passwordRecoveryTokensRepository, 'insert');

    const existingUser = makeUser({ email: 'existing.user@example.com' });
    await usersRepository.insert(existingUser);

    const input = {
      email: 'existing.user@example.com',
    };

    await expect(
      recoverPasswordWithEmailUseCase.execute(input),
    ).resolves.not.toThrow();

    expect(spyFindByEmail).toHaveBeenCalledWith(input.email);
    expect(spyInsert).toHaveBeenCalledWith(expect.any(PasswordRecoveryToken));
  });

  it('should throw an error if the user does not exist', async () => {
    const existingUser = makeUser({ email: 'existing.user@example.com' });

    await usersRepository.insert(existingUser);

    const input = {
      email: 'not.the.same@email.com',
    };

    await expect(
      recoverPasswordWithEmailUseCase.execute(input),
    ).rejects.toThrow(UserAlreadyExistsError);
  });
});
