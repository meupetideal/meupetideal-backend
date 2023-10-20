import { Service } from '@core/application/service';
import { User } from '@domain/accounts/enterprise/entities/user';
import { UnmatchedPasswordsError } from '../use-cases/errors/unmatched-passwords.error';
import { UserNotFoundError } from '../use-cases/errors/user-not-found.error';
import { HasherGateway } from '../gateways/hasher';
import { UsersRepository } from '../repositories/users.repository';
import { UserAlreadyExistsError } from '../use-cases/errors/user-already-exists.error';

type RegisterUserInput = {
  name: string;
  cpf: string;
  email: string;
  password: string;
  birthday: Date;
  phoneNumber: string;
};

type ResetPasswordInput = {
  userId: string;
  password: string;
  passwordConfirmation: string;
};

export class UsersService implements Service {
  constructor(
    private usersRepository: UsersRepository,
    private hasher: HasherGateway,
  ) {}

  public async getUser(userId: string): Promise<User> {
    const user = await this.usersRepository.findById(userId);

    if (!user) {
      throw new UserNotFoundError(userId);
    }

    return user;
  }

  public async register({
    name,
    cpf,
    email,
    password,
    birthday,
    phoneNumber,
  }: RegisterUserInput): Promise<User> {
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

    return user;
  }

  public async resetPassword({
    userId,
    password,
    passwordConfirmation,
  }: ResetPasswordInput) {
    if (password !== passwordConfirmation) {
      throw new UnmatchedPasswordsError();
    }

    const user = await this.getUser(userId);

    const hashedPassword = await this.hasher.hash(password);

    user.hashedPassword = hashedPassword;

    await this.usersRepository.save(user);
  }
}