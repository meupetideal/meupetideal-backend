import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { DomainEvent } from '@core/enterprise/domain-event';
import { Interest } from '../entities/interest';

export class InterestDemonstratedEvent implements DomainEvent {
  public ocurredAt: Date;

  public interest: Interest;

  constructor(interest: Interest) {
    this.interest = interest;
    this.ocurredAt = new Date();
  }

  getAggregateId(): UniqueEntityId {
    return this.interest.id;
  }
}
