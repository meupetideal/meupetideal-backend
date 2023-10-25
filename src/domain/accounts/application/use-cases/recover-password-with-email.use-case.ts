import { UseCase } from '@core/application/use-case';
import { inject, injectable } from 'tsyringe';
import { PasswordRecoveryTokensService } from '../services/password-recovery-tokens.service';
import { UserNotFoundError } from './errors/user-not-found.error';
import { UsersRepository } from '../repositories/users.repository';

type Input = {
  email: string;
};

type Output = void;

@injectable()
export class RecoverPasswordWithEmailUseCase implements UseCase<Input, Output> {
  constructor(
    @inject('PasswordRecoveryTokensService')
    private passwordRecoveryTokensService: PasswordRecoveryTokensService,
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  public async execute({ email }: Input): Promise<Output> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new UserNotFoundError(email);
    }

    await this.passwordRecoveryTokensService.register({ userId: user.id });
  }
}
