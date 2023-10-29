import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { EntityValidationError } from '@core/enterprise/errors/validation.error';
import { PickOut } from '@core/enterprise/logic/pick-out';
import { Entity } from '@core/enterprise/entity';
import { PasswordRecoveryTokenValidatorFactory } from '../validators/password-recovery-token.validator';
import { PasswordRecoveryTokenCreatedEvent } from '../events/password-recovery-token-created.event';

export interface PasswordRecoveryTokenProps {
  userId: UniqueEntityId;
  token: UniqueEntityId;
  expiresAt: Date;
}

export class PasswordRecoveryToken extends Entity<PasswordRecoveryTokenProps> {
  public static create(
    props: PickOut<PasswordRecoveryTokenProps, 'expiresAt'>,
    id?: UniqueEntityId,
  ): PasswordRecoveryToken {
    const expirationTime = 60 * 60 * 1000 * 2;
    const expiresAt = props.expiresAt ?? new Date(Date.now() + expirationTime);
    const propsWithExpiration = {
      ...props,
      expiresAt,
    };
    this.validate(propsWithExpiration);
    const passwordRecoveryToken = new PasswordRecoveryToken(
      propsWithExpiration,
      id,
    );

    const isNew = !id;
    if (isNew) {
      passwordRecoveryToken.addDomainEvent(
        new PasswordRecoveryTokenCreatedEvent(passwordRecoveryToken),
      );
    }

    return passwordRecoveryToken;
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

  static validate(data: PasswordRecoveryTokenProps): void {
    const validator = PasswordRecoveryTokenValidatorFactory.create();
    const isValid = validator.validate({
      ...data,
      userId: data.userId?.value,
      token: data.token?.value,
    });

    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  public validateToken(): boolean {
    return this.expiresAt.getTime() > new Date().getTime();
  }
}
