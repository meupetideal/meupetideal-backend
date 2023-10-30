import { Repository } from '@core/application/repository';
import { RefreshToken } from '@domain/accounts/enterprise/entities/refresh-token';

export abstract class RefreshTokensRepository extends Repository {
  public abstract findByTokenId(
    tokenId: string,
  ): Promise<RefreshToken | undefined>;
  public abstract insert(entity: RefreshToken): Promise<void>;
  public abstract delete(entity: RefreshToken): Promise<void>;
}
