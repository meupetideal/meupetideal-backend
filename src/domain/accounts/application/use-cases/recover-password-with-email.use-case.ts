import { UseCase } from '@core/application/use-case';
import { PasswordRecoveryToken } from '@domain/accounts/enterprise/entities/password-recovery-token';
import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { UsersRepository } from '../repositories/users.repository';
import { PasswordRecoveryTokensRepository } from '../repositories/password-recovery-tokens.repository';
import { UserNotFoundError } from './errors/user-not-found.error';

type Input = {
  email: string;
};

type Output = void;

export class RecoverPasswordWithEmailUseCase implements UseCase<Input, Output> {
  constructor(
    private usersRepository: UsersRepository,
    private passwordRecoveryTokensRepository: PasswordRecoveryTokensRepository,
  ) {}

  public async execute({ email }: Input): Promise<Output> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFoundError(email);
    }

    const passwordRecoveryToken = PasswordRecoveryToken.create({
      userId: user.id,
      token: UniqueEntityId.create(),
    });

    await this.passwordRecoveryTokensRepository.insert(passwordRecoveryToken);
  }
}
