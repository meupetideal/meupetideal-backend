import { Entity } from '@core/enterprise/entity';
import { EntityValidationError } from '@core/enterprise/errors/validation.error';
import { PickOut } from '@core/enterprise/logic/pick-out';
import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { RefreshTokenValidatorFactory } from '../validators/refresh-token.validator';

interface RefreshTokenProps {
  userId: UniqueEntityId;
  token: UniqueEntityId;
  expiresAt: Date;
}

export class RefreshToken extends Entity<RefreshTokenProps> {
  public static create(
    props: PickOut<RefreshTokenProps, 'expiresAt'>,
    id?: UniqueEntityId,
  ): RefreshToken {
    const expirationTime = 60 * 60 * 1000 * 24 * 7;
    const expiresAt = props.expiresAt ?? new Date(Date.now() + expirationTime);
    const propsWithExpiration = {
      ...props,
      expiresAt,
    };
    this.validate(propsWithExpiration);
    return new RefreshToken(propsWithExpiration, id);
  }

  get userId(): UniqueEntityId {
    return this.props.userId;
  }

  set userId(userId: UniqueEntityId) {
    this.props.userId = userId;
  }

  get token(): UniqueEntityId {
    return this.props.token;
  }

  set token(token: UniqueEntityId) {
    this.props.token = token;
  }

  get expiresAt(): Date {
    return this.props.expiresAt;
  }

  set expiresAt(expiresAt: Date) {
    this.props.expiresAt = expiresAt;
  }

  static validate(data: RefreshTokenProps): void {
    const validator = RefreshTokenValidatorFactory.create();
    const isValid = validator.validate({
      ...data,
    });

    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  public validateToken(): boolean {
    return this.expiresAt.getTime() > new Date().getTime();
  }
}
