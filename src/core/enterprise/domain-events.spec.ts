import { AggregateRoot } from './aggregate-root';
import { DomainEvent } from './domain-event';
import { DomainEvents } from './domain-events';
import { UniqueEntityId } from './unique-entity-id.vo';

class CustomAggregateCreated implements DomainEvent {
  public ocurredAt: Date;

  private aggregate: CustomAggregate;

  constructor(aggregate: CustomAggregate) {
    this.aggregate = aggregate;
    this.ocurredAt = new Date();
  }

  public getAggregateId(): UniqueEntityId {
    return this.aggregate.id;
  }
}

class CustomAggregate extends AggregateRoot<null> {
  static create() {
    const aggregate = new CustomAggregate(null);

    aggregate.addDomainEvent(new CustomAggregateCreated(aggregate));

    return aggregate;
  }
}

describe('domain events', () => {
  it('should be able to dispatch and listen to events', async () => {
    const callbackSpy = vi.fn();

    DomainEvents.register(callbackSpy, CustomAggregateCreated.name);

    const aggregate = CustomAggregate.create();

    expect(aggregate.domainEvents).toHaveLength(1);

    DomainEvents.dispatchEventsForAggregate(aggregate.id);

    expect(callbackSpy).toHaveBeenCalled();

    expect(aggregate.domainEvents).toHaveLength(0);
  });

  test('clearHandlers', () => {
    const callbackSpy = vi.fn();

    DomainEvents.register(callbackSpy, CustomAggregateCreated.name);

    DomainEvents.clearHandlers();

    const aggregate = CustomAggregate.create();

    expect(aggregate.domainEvents).toHaveLength(1);

    DomainEvents.dispatchEventsForAggregate(aggregate.id);

    expect(callbackSpy).not.toHaveBeenCalled();

    expect(aggregate.domainEvents).toHaveLength(0);
  });

  test('clearMarkedAggregates', () => {
    const callbackSpy = vi.fn();

    DomainEvents.register(callbackSpy, CustomAggregateCreated.name);

    const aggregate = CustomAggregate.create();

    expect(aggregate.domainEvents).toHaveLength(1);

    DomainEvents.clearMarkedAggregates();

    DomainEvents.dispatchEventsForAggregate(aggregate.id);

    expect(callbackSpy).not.toHaveBeenCalled();

    expect(aggregate.domainEvents).toHaveLength(1);
  });

  test('shouldRun', () => {
    const callbackSpy = vi.fn();

    DomainEvents.register(callbackSpy, CustomAggregateCreated.name);

    const aggregate = CustomAggregate.create();

    expect(aggregate.domainEvents).toHaveLength(1);

    DomainEvents.shouldRun = false;

    DomainEvents.dispatchEventsForAggregate(aggregate.id);

    expect(callbackSpy).not.toHaveBeenCalled();

    expect(aggregate.domainEvents).toHaveLength(0);
  });
});
