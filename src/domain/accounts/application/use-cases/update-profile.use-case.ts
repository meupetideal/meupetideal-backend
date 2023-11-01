import { UseCase } from '@core/application/use-case';
import { User } from '@domain/accounts/enterprise/entities/user';
import { inject, injectable } from 'tsyringe';
import { Email } from '@domain/accounts/enterprise/entities/value-objects/email.vo';
import { CPF } from '@domain/accounts/enterprise/entities/value-objects/cpf.vo';
import { Birthday } from '@domain/accounts/enterprise/entities/value-objects/birthday.vo';
import { PhoneNumber } from '@domain/accounts/enterprise/entities/value-objects/phone-number.vo';
import { UsersRepository } from '../repositories/users.repository';
import { UserAlreadyExistsError } from './errors/user-already-exists.error';
import { UsersService } from '../services/users.service';

type Input = {
  userId: string;
  name: string;
  email: string;
  cpf: string;
  birthday: Date;
  phoneNumber: string;
};

type Output = { user: User };

@injectable()
export class UpdateProfileUseCase implements UseCase<Input, Output> {
  constructor(
    @inject('UsersService')
    private usersService: UsersService,
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  public async execute({
    userId,
    name,
    email,
    cpf,
    birthday,
    phoneNumber,
  }: Input): Promise<Output> {
    const user = await this.usersService.getUser(userId);
    const emailVO = Email.create(email);
    const cpfVO = CPF.create(cpf);

    if (!user.email.equals(emailVO)) {
      const userAlreadyExists = await this.usersRepository.findByEmail(email);

      if (userAlreadyExists) {
        throw new UserAlreadyExistsError(email);
      }

      user.email = emailVO;
    }

    if (!user.cpf.equals(cpfVO)) {
      const userAlreadyExists = await this.usersRepository.findByCpf(cpf);

      if (userAlreadyExists) {
        throw new UserAlreadyExistsError(cpf);
      }

      user.cpf = cpfVO;
    }

    user.name = name;
    user.birthday = Birthday.create(birthday);
    user.phoneNumber = PhoneNumber.create(phoneNumber);

    await this.usersRepository.save(user);

    return { user };
  }
}
