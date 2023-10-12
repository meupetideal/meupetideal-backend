import { UseCase } from '@core/application/use-case';
import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { UsersRepository } from '../repositories/users.repository';
import { HasherGateway } from '../gateways/hasher';
import { UnmatchedPasswordsError } from './errors/unmatched-passwords.error';
import { UserNotFoundError } from './errors/user-not-found.error';

type Input = {
  userId: string;
  password: string;
  passwordConfirmation: string;
};

type Output = void;

export class ResetPasswordWithCurrentPasswordUseCase
  implements UseCase<Input, Output>
{
  constructor(
    private usersRepository: UsersRepository,
    private hasher: HasherGateway,
  ) {}

  async execute({
    userId,
    password,
    passwordConfirmation,
  }: Input): Promise<Output> {
    const user = await this.usersRepository.findById(
      UniqueEntityId.create(userId),
    );

    if (!user) {
      throw new UserNotFoundError(userId);
    }

    if (password !== passwordConfirmation) {
      throw new UnmatchedPasswordsError();
    }

    const hashedPassword = await this.hasher.hash(password);

    user.hashedPassword = hashedPassword;

    await this.usersRepository.save(user);
  }
}
