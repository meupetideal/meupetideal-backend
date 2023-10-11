import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { PasswordRecoveryTokensRepository } from '@domain/accounts/application/repositories/password-recovery-tokens.repository';
import { PasswordRecoveryToken } from '@domain/accounts/enterprise/entities/password-recovery-token';

export class InMemoryPasswordRecoveryTokensRepository
  implements PasswordRecoveryTokensRepository
{
  items: PasswordRecoveryToken[] = [];

  public async findByToken(
    token: UniqueEntityId,
  ): Promise<PasswordRecoveryToken | undefined> {
    return this.items.find((item) => item.token.equals(token));
  }

  public async insert(entity: PasswordRecoveryToken): Promise<void> {
    this.items.push(entity);
  }

  public async delete(entity: PasswordRecoveryToken): Promise<void> {
    const index = this.items.findIndex(
      (item) => item.id.value === entity.id.value,
    );

    this.items.splice(index, 1);
  }
}
