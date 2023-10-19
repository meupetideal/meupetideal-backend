import { AggregateRoot } from './aggregate-root';
import { UniqueEntityId } from './unique-entity-id.vo';

class StubAggregateRoot extends AggregateRoot<unknown> {
  static create(props: unknown, id?: UniqueEntityId): StubAggregateRoot {
    return new StubAggregateRoot(props, id);
  }
}

class StubDomainEvent {}

describe('AggregateRoot', () => {
  it('should add domain event to list of domain events when adding a domain event', () => {
    const aggregate = StubAggregateRoot.create({});

    const domainEvent = new StubDomainEvent();

    aggregate.addDomainEvent(domainEvent);

    expect(aggregate.domainEvents).toContain(domainEvent);
  });

  it('should clear the list of domain events when clearing the domain events', () => {
    const aggregate = StubAggregateRoot.create({});
    const domainEvent1 = new StubDomainEvent();
    const domainEvent2 = new StubDomainEvent();

    aggregate.addDomainEvent(domainEvent1);
    aggregate.addDomainEvent(domainEvent2);

    aggregate.clearEvents();

    expect(aggregate.domainEvents).toEqual([]);
  });

  it('should return true when comparing two aggregate roots with the same ID', () => {
    const id = UniqueEntityId.create();
    const aggregate1 = StubAggregateRoot.create({}, id);
    const aggregate2 = StubAggregateRoot.create({}, id);

    expect(aggregate1.equals(aggregate2)).toBe(true);
  });

  it('should return an empty list of domain events when aggregate root has no domain events', () => {
    const aggregate = StubAggregateRoot.create({});

    expect(aggregate.domainEvents).toEqual([]);
  });

  it('should return a list with the single domain event when aggregate root has one domain event', () => {
    const aggregate = StubAggregateRoot.create({});
    const domainEvent = new StubDomainEvent();

    aggregate.addDomainEvent(domainEvent);

    expect(aggregate.domainEvents).toEqual([domainEvent]);
  });
});
