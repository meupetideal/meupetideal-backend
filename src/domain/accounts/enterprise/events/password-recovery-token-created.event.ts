import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { DomainEvent } from '@core/enterprise/domain-event';
import { PasswordRecoveryToken } from '../entities/password-recovery-token';

export class PasswordRecoveryTokenCreatedEvent implements DomainEvent {
  public ocurredAt: Date;

  public passwordRecoveryToken: PasswordRecoveryToken;

  constructor(passwordRecoveryToken: PasswordRecoveryToken) {
    this.passwordRecoveryToken = passwordRecoveryToken;
    this.ocurredAt = new Date();
  }

  getAggregateId(): UniqueEntityId {
    return this.passwordRecoveryToken.id;
  }
}
