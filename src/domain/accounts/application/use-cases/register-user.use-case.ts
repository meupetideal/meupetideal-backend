import { UseCase } from '@core/application/use-case';
import { User } from '@domain/accounts/enterprise/entities/user';
import { UsersRepository } from '../repositories/users.repository';
import { UserAlreadyExistsError } from './errors/user-already-exists.error';
import { HasherGateway } from '../gateways/hasher';

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
  constructor(
    private usersRepository: UsersRepository,
    private hasher: HasherGateway,
  ) {}

  async execute({
    name,
    cpf,
    email,
    password,
    birthday,
    phoneNumber,
  }: Input): Promise<Output> {
    let userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError(email);
    }

    userAlreadyExists = await this.usersRepository.findByCpf(cpf);

    if (userAlreadyExists) {
      throw new UserAlreadyExistsError(cpf);
    }

    const hashedPassword = await this.hasher.hash(password);

    const user = User.create({
      name,
      cpf,
      email,
      hashedPassword,
      birthday,
      phoneNumber,
    });

    await this.usersRepository.insert(user);

    return { user };
  }
}
