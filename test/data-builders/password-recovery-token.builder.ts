import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { PasswordRecoveryToken } from '@domain/accounts/enterprise/entities/password-recovery-token';

export class PasswordRecoveryTokenBuilder {
  private id: string | undefined;

  private userId: string | undefined;

  private token: string | undefined;

  private expiresAt: Date | undefined;

  private constructor() {}

  public static create(): PasswordRecoveryTokenBuilder {
    return new PasswordRecoveryTokenBuilder();
  }

  public withId(id: string): PasswordRecoveryTokenBuilder {
    this.id = id;
    return this;
  }

  public withUserId(userId: string): PasswordRecoveryTokenBuilder {
    this.userId = userId;
    return this;
  }

  public withToken(token: string): PasswordRecoveryTokenBuilder {
    this.token = token;
    return this;
  }

  public withExpiresAt(expiresAt: Date): PasswordRecoveryTokenBuilder {
    this.expiresAt = expiresAt;
    return this;
  }

  public build(): PasswordRecoveryToken {
    return PasswordRecoveryToken.create(
      {
        userId: UniqueEntityId.create(this.userId),
        token: UniqueEntityId.create(this.token),
        expiresAt: this.expiresAt,
      },
      UniqueEntityId.create(this.id),
    );
  }
}
