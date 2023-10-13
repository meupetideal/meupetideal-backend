import { Repository } from '@core/application/repository';
import { PasswordRecoveryToken } from '@domain/accounts/enterprise/entities/password-recovery-token';

export abstract class PasswordRecoveryTokensRepository extends Repository {
  public abstract findByToken(
    token: string,
  ): Promise<PasswordRecoveryToken | undefined>;
  public abstract insert(entity: PasswordRecoveryToken): Promise<void>;
  public abstract delete(entity: PasswordRecoveryToken): Promise<void>;
}
