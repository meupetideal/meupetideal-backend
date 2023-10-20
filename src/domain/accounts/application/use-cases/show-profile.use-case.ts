import { UseCase } from '@core/application/use-case';
import { User } from '@domain/accounts/enterprise/entities/user';
import { UsersService } from '../services/users.service';

type Input = {
  userId: string;
};

type Output = {
  user: User;
};

export class ShowProfileUseCase implements UseCase<Input, Output> {
  constructor(private usersService: UsersService) {}

  public async execute({ userId }: Input): Promise<Output> {
    const user = await this.usersService.getUser(userId);

    return { user };
  }
}
