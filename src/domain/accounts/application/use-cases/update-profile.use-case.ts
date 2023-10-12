import { UseCase } from '@core/application/use-case';
import { User } from '@domain/accounts/enterprise/entities/user';
import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { UsersRepository } from '../repositories/users.repository';
import { UserNotFoundError } from './errors/user-not-found.error';
import { UserAlreadyExistsError } from './errors/user-already-exists.error';

type Input = {
  userId: string;
  name: string;
  email: string;
  cpf: string;
  birthday: Date;
  phoneNumber: string;
};

type Output = { user: User };

export class UpdateProfileUseCase implements UseCase<Input, Output> {
  constructor(private usersRepository: UsersRepository) {}

  public async execute({
    userId,
    name,
    email,
    cpf,
    birthday,
    phoneNumber,
  }: Input): Promise<Output> {
    const user = await this.usersRepository.findById(
      UniqueEntityId.create(userId),
    );

    if (!user) {
      throw new UserNotFoundError(userId);
    }

    if (user.email !== email) {
      const userAlreadyExists = await this.usersRepository.findByEmail(email);

      if (userAlreadyExists) {
        throw new UserAlreadyExistsError(email);
      }

      user.email = email;
    }

    if (user.cpf !== cpf) {
      const userAlreadyExists = await this.usersRepository.findByCpf(cpf);

      if (userAlreadyExists) {
        throw new UserAlreadyExistsError(cpf);
      }

      user.cpf = cpf;
    }

    user.name = name;
    user.birthday = birthday;
    user.phoneNumber = phoneNumber;

    await this.usersRepository.save(user);

    return { user };
  }
}
