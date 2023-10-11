import { Repository } from '@core/application/repository';
import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { PasswordRecoveryToken } from '@domain/accounts/enterprise/entities/password-recovery-token';

export abstract class PasswordRecoveryTokensRepository extends Repository {
  public abstract findByToken(
    token: UniqueEntityId,
  ): Promise<PasswordRecoveryToken | undefined>;
  public abstract insert(entity: PasswordRecoveryToken): Promise<void>;
  public abstract delete(entity: PasswordRecoveryToken): Promise<void>;
}
