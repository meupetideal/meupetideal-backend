import { UseCase } from '@core/application/use-case';
import { User } from '@domain/accounts/enterprise/entities/user';
import { inject, injectable } from 'tsyringe';
import { UsersService } from '../services/users.service';

type Input = {
  name: string;
  cpf: string;
  email: string;
  password: string;
  birthday: Date;
  phoneNumber: string;
  neighborhood: string;
  city: string;
  state: string;
  country: string;
};

type Output = {
  user: User;
};

@injectable()
export class RegisterUserUseCase implements UseCase<Input, Output> {
  constructor(@inject('UsersService') private usersService: UsersService) {}

  async execute({
    name,
    cpf,
    email,
    password,
    birthday,
    phoneNumber,
    neighborhood,
    city,
    state,
    country,
  }: Input): Promise<Output> {
    const user = await this.usersService.register({
      name,
      cpf,
      email,
      password,
      birthday,
      phoneNumber,
      neighborhood,
      city,
      state,
      country,
    });

    return { user };
  }
}
