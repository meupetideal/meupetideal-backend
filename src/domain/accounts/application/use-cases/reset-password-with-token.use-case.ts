import { UseCase } from '@core/application/use-case';
import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { UsersRepository } from '../repositories/users.repository';
import { HasherGateway } from '../gateways/hasher';
import { PasswordRecoveryTokensRepository } from '../repositories/password-recovery-tokens.repository';
import { InvalidRecoveryTokenError } from './errors/invalid-recovery-token.error';
import { UnmatchedPasswordsError } from './errors/unmatched-passwords.error';
import { UserNotFoundError } from './errors/user-not-found.error';

type Input = {
  token: string;
  password: string;
  passwordConfirmation: string;
};

type Output = void;

export class ResetPasswordWithTokenUseCase implements UseCase<Input, Output> {
  constructor(
    private passwordRecoveryTokensRepository: PasswordRecoveryTokensRepository,
    private usersRepository: UsersRepository,
    private hasher: HasherGateway,
  ) {}

  async execute({
    token,
    password,
    passwordConfirmation,
  }: Input): Promise<Output> {
    const passwordRecoveryToken =
      await this.passwordRecoveryTokensRepository.findByToken(
        UniqueEntityId.create(token),
      );

    if (!passwordRecoveryToken || !passwordRecoveryToken.validateToken()) {
      throw new InvalidRecoveryTokenError();
    }

    if (password !== passwordConfirmation) {
      throw new UnmatchedPasswordsError();
    }

    const user = await this.usersRepository.findById(
      passwordRecoveryToken.userId,
    );

    if (!user) {
      throw new UserNotFoundError(passwordRecoveryToken.userId.value);
    }

    const hashedPassword = await this.hasher.hash(password);

    user.hashedPassword = hashedPassword;

    await this.usersRepository.update(user);

    await this.passwordRecoveryTokensRepository.delete(passwordRecoveryToken);
  }
}
