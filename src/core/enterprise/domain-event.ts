import { UniqueEntityId } from './unique-entity-id.vo';

export abstract class DomainEvent {
  abstract ocurredAt: Date;
  abstract getAggregateId(): UniqueEntityId;
}
