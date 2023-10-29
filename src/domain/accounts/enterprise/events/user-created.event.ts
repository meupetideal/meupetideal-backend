import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { DomainEvent } from '@core/enterprise/domain-event';
import { User } from '../entities/user';

export class UserCreatedEvent implements DomainEvent {
  public ocurredAt: Date;

  public user: User;

  constructor(user: User) {
    this.user = user;
    this.ocurredAt = new Date();
  }

  getEntityId(): UniqueEntityId {
    return this.user.id;
  }
}
