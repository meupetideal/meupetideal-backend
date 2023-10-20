import { UseCase } from '@core/application/use-case';
import { UsersService } from '../services/users.service';

type Input = {
  userId: string;
  password: string;
  passwordConfirmation: string;
};

type Output = void;

export class ResetPasswordWithCurrentPasswordUseCase
  implements UseCase<Input, Output>
{
  constructor(private usersService: UsersService) {}

  async execute({
    userId,
    password,
    passwordConfirmation,
  }: Input): Promise<Output> {
    await this.usersService.resetPassword({
      userId,
      password,
      passwordConfirmation,
    });
  }
}
