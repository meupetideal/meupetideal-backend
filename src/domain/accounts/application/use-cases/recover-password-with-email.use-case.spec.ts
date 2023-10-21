import { InMemoryUsersRepository } from 'test/repositories/in-memory-users.repository';
import { InMemoryPasswordRecoveryTokensRepository } from 'test/repositories/in-memory-password-recovery-tokens.repository';
import { PasswordRecoveryToken } from '@domain/accounts/enterprise/entities/password-recovery-token';
import { UserBuilder } from 'test/data-builders/user.builder';
import { PasswordRecoveryTokensRepository } from '../repositories/password-recovery-tokens.repository';
import { UsersRepository } from '../repositories/users.repository';
import { RecoverPasswordWithEmailUseCase } from './recover-password-with-email.use-case';
import { UserNotFoundError } from './errors/user-not-found.error';
import { PasswordRecoveryTokensService } from '../services/password-recovery-tokens.service';

describe('#UC02 RecoverPasswordWithEmailUseCase', () => {
  let usersRepository: UsersRepository;
  let passwordRecoveryTokensRepository: PasswordRecoveryTokensRepository;

  let passwordRecoveryTokensService: PasswordRecoveryTokensService;

  let recoverPasswordWithEmailUseCase: RecoverPasswordWithEmailUseCase;

  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    passwordRecoveryTokensRepository =
      new InMemoryPasswordRecoveryTokensRepository();

    passwordRecoveryTokensService = new PasswordRecoveryTokensService(
      passwordRecoveryTokensRepository,
    );

    recoverPasswordWithEmailUseCase = new RecoverPasswordWithEmailUseCase(
      passwordRecoveryTokensService,
      usersRepository,
    );
  });

  it('should create a password recovery token', async () => {
    const spyFindByEmail = vi.spyOn(usersRepository, 'findByEmail');
    const spyInsert = vi.spyOn(passwordRecoveryTokensRepository, 'insert');

    const existingUser = UserBuilder.create()
      .withEmail('existing.user@example.com')
      .build();
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
    const existingUser = UserBuilder.create()
      .withEmail('existing.user@example.com')
      .build();

    await usersRepository.insert(existingUser);

    const input = {
      email: 'not.the.same@email.com',
    };

    await expect(
      recoverPasswordWithEmailUseCase.execute(input),
    ).rejects.toThrow(UserNotFoundError);
  });
});
