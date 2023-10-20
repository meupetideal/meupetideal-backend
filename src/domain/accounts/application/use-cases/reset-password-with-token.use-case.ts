import { UseCase } from '@core/application/use-case';
import { PasswordRecoveryTokensRepository } from '../repositories/password-recovery-tokens.repository';
import { InvalidRecoveryTokenError } from './errors/invalid-recovery-token.error';
import { UsersService } from '../services/users.service';

type Input = {
  token: string;
  password: string;
  passwordConfirmation: string;
};

type Output = void;

export class ResetPasswordWithTokenUseCase implements UseCase<Input, Output> {
  constructor(
    private passwordRecoveryTokensRepository: PasswordRecoveryTokensRepository,
    private usersService: UsersService,
  ) {}

  async execute({
    token,
    password,
    passwordConfirmation,
  }: Input): Promise<Output> {
    const passwordRecoveryToken =
      await this.passwordRecoveryTokensRepository.findByToken(token);

    if (!passwordRecoveryToken || !passwordRecoveryToken.validateToken()) {
      throw new InvalidRecoveryTokenError();
    }

    await this.usersService.resetPassword({
      userId: passwordRecoveryToken.userId.value,
      password,
      passwordConfirmation,
    });

    await this.passwordRecoveryTokensRepository.delete(passwordRecoveryToken);
  }
}
