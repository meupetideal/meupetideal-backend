import { InMemoryRefreshTokensRepository } from 'test/repositories/in-memory-refresh-tokens.repository';
import { FakeEncrypter } from 'test/gateways/fake-encrypter';
import { RefreshTokenBuilder } from 'test/data-builders/refresh-token.builder';
import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { RefreshTokenUseCase } from './refresh-token.use-case';
import { EncrypterGateway } from '../gateways/encrypter';
import { InvalidRefreshTokenError } from './errors/invalid-refresh-token.error';

describe('RefreshTokenUseCase', () => {
  let refreshTokensRepository: InMemoryRefreshTokensRepository;
  let encrypter: EncrypterGateway;

  let refreshTokenUseCaseUseCase: RefreshTokenUseCase;

  beforeEach(() => {
    refreshTokensRepository = new InMemoryRefreshTokensRepository();
    encrypter = new FakeEncrypter();

    refreshTokenUseCaseUseCase = new RefreshTokenUseCase(
      refreshTokensRepository,
      encrypter,
    );
  });

  it('should be able to refresh token', async () => {
    const sub = UniqueEntityId.create();
    const token = JSON.stringify({ sub });

    const refreshToken = RefreshTokenBuilder.create().withToken(token).build();
    await refreshTokensRepository.insert(refreshToken);

    const input = {
      refreshToken: token,
    };

    const output = await refreshTokenUseCaseUseCase.execute(input);

    expect(output.accessToken).toBe(token);
    expect(output.refreshToken).toBe(
      JSON.stringify({ sub, type: 'refresh_token' }),
    );
  });

  it('should not be able to refresh token with expired refresh token', async () => {
    const sub = UniqueEntityId.create();
    const token = JSON.stringify({ sub });

    const refreshToken = RefreshTokenBuilder.create()
      .withToken(token)
      .withExpiresAt(new Date(2021, 7, 26))
      .build();
    await refreshTokensRepository.insert(refreshToken);

    const input = {
      refreshToken: token,
    };

    await expect(
      refreshTokenUseCaseUseCase.execute(input),
    ).rejects.toBeInstanceOf(InvalidRefreshTokenError);
  });
});
