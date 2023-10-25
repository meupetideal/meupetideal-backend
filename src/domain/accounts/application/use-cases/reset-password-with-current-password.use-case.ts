import { UseCase } from '@core/application/use-case';
import { inject, injectable } from 'tsyringe';
import { UsersService } from '../services/users.service';
import { HasherGateway } from '../gateways/hasher';
import { UnmatchedPasswordsError } from './errors/unmatched-passwords.error';

type Input = {
  userId: string;
  oldPassword: string;
  password: string;
  passwordConfirmation: string;
};

type Output = void;

@injectable()
export class ResetPasswordWithCurrentPasswordUseCase
  implements UseCase<Input, Output>
{
  constructor(
    @inject('UsersService')
    private usersService: UsersService,
    @inject('HasherGateway')
    private hasher: HasherGateway,
  ) {}

  async execute({
    userId,
    oldPassword,
    password,
    passwordConfirmation,
  }: Input): Promise<Output> {
    const user = await this.usersService.getUser(userId);

    const checkOldPassword = await this.hasher.compare(
      oldPassword,
      user.hashedPassword,
    );

    if (!checkOldPassword) {
      throw new UnmatchedPasswordsError();
    }

    await this.usersService.resetPassword({
      userId,
      password,
      passwordConfirmation,
    });
  }
}
