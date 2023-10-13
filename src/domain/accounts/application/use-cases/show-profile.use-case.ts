import { UseCase } from '@core/application/use-case';
import { User } from '@domain/accounts/enterprise/entities/user';
import { UsersRepository } from '../repositories/users.repository';
import { UserNotFoundError } from './errors/user-not-found.error';

type Input = {
  userId: string;
};

type Output = {
  user: User;
};

export class ShowProfileUseCase implements UseCase<Input, Output> {
  constructor(private usersRepository: UsersRepository) {}

  public async execute({ userId }: Input): Promise<Output> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError(userId);
    }

    return { user };
  }
}
