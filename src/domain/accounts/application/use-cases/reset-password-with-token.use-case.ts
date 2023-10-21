import { UseCase } from '@core/application/use-case';
import { PasswordRecoveryTokensRepository } from '../repositories/password-recovery-tokens.repository';
import { UsersService } from '../services/users.service';
import { PasswordRecoveryTokensService } from '../services/password-recovery-tokens.service';

type Input = {
  token: string;
  password: string;
  passwordConfirmation: string;
};

type Output = void;

export class ResetPasswordWithTokenUseCase implements UseCase<Input, Output> {
  constructor(
    private passwordRecoveryTokensService: PasswordRecoveryTokensService,
    private passwordRecoveryTokensRepository: PasswordRecoveryTokensRepository,
    private usersService: UsersService,
  ) {}

  async execute({
    token,
    password,
    passwordConfirmation,
  }: Input): Promise<Output> {
    const passwordRecoveryToken =
      await this.passwordRecoveryTokensService.getValidPasswordRecoveryToken(
        token,
      );

    await this.usersService.resetPassword({
      userId: passwordRecoveryToken.userId.value,
      password,
      passwordConfirmation,
    });

    await this.passwordRecoveryTokensRepository.delete(passwordRecoveryToken);
  }
}
