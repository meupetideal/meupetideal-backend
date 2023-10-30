import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { RefreshTokensRepository } from '@domain/accounts/application/repositories/refresh-tokens.repository';
import { RefreshToken } from '@domain/accounts/enterprise/entities/refresh-token';

export class InMemoryRefreshTokensRepository
  implements RefreshTokensRepository
{
  public items: RefreshToken[] = [];

  public async findByTokenId(
    tokenId: string,
  ): Promise<RefreshToken | undefined> {
    const item = this.items.find((entity) =>
      entity.token.equals(UniqueEntityId.create(tokenId)),
    );

    return item ?? undefined;
  }

  public async insert(entity: RefreshToken): Promise<void> {
    this.items.push(entity);
  }

  public async delete(entity: RefreshToken): Promise<void> {
    this.items = this.items.filter((item) => !item.equals(entity));
  }
}
