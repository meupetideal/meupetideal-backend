import { UseCase } from '@core/application/use-case';
import { User } from '@domain/accounts/enterprise/entities/user';
import { inject, injectable } from 'tsyringe';
import { UsersService } from '../services/users.service';

type Input = {
  userId: string;
};

type Output = {
  user: User;
};

@injectable()
export class ShowProfileUseCase implements UseCase<Input, Output> {
  constructor(
    @inject('UsersService')
    private usersService: UsersService,
  ) {}

  public async execute({ userId }: Input): Promise<Output> {
    const user = await this.usersService.getUser(userId);

    return { user };
  }
}
