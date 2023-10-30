import { UseCase } from '@core/application/use-case';
import { inject, injectable } from 'tsyringe';
import { RefreshToken } from '@domain/accounts/enterprise/entities/refresh-token';
import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { RefreshTokensRepository } from '../repositories/refresh-tokens.repository';
import { EncrypterGateway } from '../gateways/encrypter';
import { RefreshTokenNotFoundError } from './errors/refresh-token-not-found.error';
import { InvalidRefreshTokenError } from './errors/invalid-refresh-token.error';

type Input = {
  refreshToken: string;
};

type Output = {
  accessToken: string;
  refreshToken: string;
};

@injectable()
export class RefreshTokenUseCase implements UseCase<Input, Output> {
  constructor(
    @inject('RefreshTokensRepository')
    private refreshTokensRepository: RefreshTokensRepository,
    @inject('EncrypterGateway')
    private encrypter: EncrypterGateway,
  ) {}

  public async execute({ refreshToken }: Input): Promise<Output> {
    const { sub: userId } = await this.encrypter.decrypt(
      refreshToken,
      'refresh',
    );

    if (!userId) {
      throw new InvalidRefreshTokenError();
    }

    const oldRefreshToken =
      await this.refreshTokensRepository.findByTokenId(refreshToken);

    if (!oldRefreshToken) {
      throw new RefreshTokenNotFoundError();
    }

    if (!oldRefreshToken.validateToken()) {
      throw new InvalidRefreshTokenError();
    }

    await this.refreshTokensRepository.delete(oldRefreshToken);

    const newAccessToken = await this.encrypter.encrypt({ sub: userId });
    const newRefreshToken = await this.encrypter.encrypt(
      {
        sub: userId,
        type: 'refresh_token',
      },
      'refresh',
    );

    const newRefreshTokenEntity = RefreshToken.create({
      userId: UniqueEntityId.create(userId as string),
      token: UniqueEntityId.create(newRefreshToken),
    });

    await this.refreshTokensRepository.insert(newRefreshTokenEntity);

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }
}
