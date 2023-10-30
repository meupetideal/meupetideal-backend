import { UseCase } from '@core/application/use-case';
import { inject, injectable } from 'tsyringe';
import { RefreshToken } from '@domain/accounts/enterprise/entities/refresh-token';
import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { UsersRepository } from '../repositories/users.repository';
import { HasherGateway } from '../gateways/hasher';
import { WrongCredentialsError } from './errors/wrong-credentials.error';
import { EncrypterGateway } from '../gateways/encrypter';
import { RefreshTokensRepository } from '../repositories/refresh-tokens.repository';

interface Input {
  email: string;
  password: string;
}

type Output = {
  accessToken: string;
  refreshToken: string;
};

@injectable()
export class AuthenticateUserUseCase implements UseCase<Input, Output> {
  constructor(
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
    @inject('RefreshTokensRepository')
    private refreshTokensRepository: RefreshTokensRepository,
    @inject('HasherGateway')
    private hasher: HasherGateway,
    @inject('EncrypterGateway')
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
    const refreshToken = await this.encrypter.encrypt(
      {
        sub: user.id.value,
        type: 'refresh_token',
      },
      'refresh',
    );

    const refreshTokenEntity = RefreshToken.create({
      userId: user.id,
      token: UniqueEntityId.create(refreshToken),
    });

    await this.refreshTokensRepository.insert(refreshTokenEntity);

    return { accessToken, refreshToken };
  }
}
