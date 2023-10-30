import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { RefreshToken } from '@domain/accounts/enterprise/entities/refresh-token';

export class RefreshTokenBuilder {
  private id: string | undefined;

  private userId: string | undefined;

  private token: string | undefined;

  private expiresAt: Date | undefined;

  private constructor() {}

  public static create(): RefreshTokenBuilder {
    return new RefreshTokenBuilder();
  }

  public withId(id: string): RefreshTokenBuilder {
    this.id = id;
    return this;
  }

  public withUserId(userId: string): RefreshTokenBuilder {
    this.userId = userId;
    return this;
  }

  public withToken(token: string): RefreshTokenBuilder {
    this.token = token;
    return this;
  }

  public withExpiresAt(expiresAt: Date): RefreshTokenBuilder {
    this.expiresAt = expiresAt;
    return this;
  }

  public build(): RefreshToken {
    return RefreshToken.create(
      {
        userId: UniqueEntityId.create(this.userId),
        token: UniqueEntityId.create(this.token),
        expiresAt: this.expiresAt,
      },
      this.id ? UniqueEntityId.create(this.id) : undefined,
    );
  }
}
