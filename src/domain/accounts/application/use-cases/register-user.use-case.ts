import { UseCase } from '@core/application/use-case';
import { User } from '@domain/accounts/enterprise/entities/user';
import { UsersService } from '../services/users.service';

type Input = {
  name: string;
  cpf: string;
  email: string;
  password: string;
  birthday: Date;
  phoneNumber: string;
};

type Output = {
  user: User;
};

export class RegisterUserUseCase implements UseCase<Input, Output> {
  constructor(private usersService: UsersService) {}

  async execute({
    name,
    cpf,
    email,
    password,
    birthday,
    phoneNumber,
  }: Input): Promise<Output> {
    const user = await this.usersService.register({
      name,
      cpf,
      email,
      password,
      birthday,
      phoneNumber,
    });

    return { user };
  }
}
