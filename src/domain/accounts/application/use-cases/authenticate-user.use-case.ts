import { UseCase } from '@core/application/use-case';
import { UsersRepository } from '../repositories/users.repository';
import { HasherGateway } from '../gateways/hasher';
import { WrongCredentialsError } from './errors/wrong-credentials.error';
import { EncrypterGateway } from '../gateways/encrypter';

interface Input {
  email: string;
  password: string;
}

type Output = { accessToken: string };

export class AuthenticateUserUseCase implements UseCase<Input, Output> {
  constructor(
    private usersRepository: UsersRepository,
    private hasher: HasherGateway,
    private encrypter: EncrypterGateway,
  ) {}

  async execute({ email, password }: Input): Promise<Output> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new WrongCredentialsError();
    }

    const isPasswordValid = await this.hasher.compare(
      password,
      user.hashedPassword,
    );

    if (!isPasswordValid) {
      throw new WrongCredentialsError();
    }

    const accessToken = await this.encrypter.encrypt({ sub: user.id.value });

    return { accessToken };
  }
}
