import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { PasswordRecoveryTokensRepository } from '@domain/accounts/application/repositories/password-recovery-tokens.repository';
import { PasswordRecoveryToken } from '@domain/accounts/enterprise/entities/password-recovery-token';

export class InMemoryPasswordRecoveryTokensRepository
  implements PasswordRecoveryTokensRepository
{
  private passwordRecoveryTokens: PasswordRecoveryToken[] = [];

  public async findByToken(
    token: string,
  ): Promise<PasswordRecoveryToken | undefined> {
    return this.passwordRecoveryTokens.find((passwordRecoveryToken) =>
      passwordRecoveryToken.token.equals(UniqueEntityId.create(token)),
    );
  }

  public async insert(
    passwordRecoveryToken: PasswordRecoveryToken,
  ): Promise<void> {
    this.passwordRecoveryTokens.push(passwordRecoveryToken);
  }
}
