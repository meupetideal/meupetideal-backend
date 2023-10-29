import { Entity } from './entity';
import { DomainEvent } from './domain-event';
import { DomainEvents } from './domain-events';
import { UniqueEntityId } from './unique-entity-id.vo';

class CustomEntityCreated implements DomainEvent {
  public ocurredAt: Date;

  private entity: CustomEntity;

  constructor(entity: CustomEntity) {
    this.entity = entity;
    this.ocurredAt = new Date();
  }

  public getEntityId(): UniqueEntityId {
    return this.entity.id;
  }
}

class CustomEntity extends Entity<null> {
  static create() {
    const entity = new CustomEntity(null);

    entity.addDomainEvent(new CustomEntityCreated(entity));

    return entity;
  }
}

describe('domain events', () => {
  it('should be able to dispatch and listen to events', async () => {
    const callbackSpy = vi.fn();

    DomainEvents.register(callbackSpy, CustomEntityCreated.name);

    const entity = CustomEntity.create();

    expect(entity.domainEvents).toHaveLength(1);

    DomainEvents.dispatchEventsForEntity(entity.id);

    expect(callbackSpy).toHaveBeenCalled();

    expect(entity.domainEvents).toHaveLength(0);
  });

  test('clearHandlers', () => {
    const callbackSpy = vi.fn();

    DomainEvents.register(callbackSpy, CustomEntityCreated.name);

    DomainEvents.clearHandlers();

    const entity = CustomEntity.create();

    expect(entity.domainEvents).toHaveLength(1);

    DomainEvents.dispatchEventsForEntity(entity.id);

    expect(callbackSpy).not.toHaveBeenCalled();

    expect(entity.domainEvents).toHaveLength(0);
  });

  test('clearMarkedEntitys', () => {
    const callbackSpy = vi.fn();

    DomainEvents.register(callbackSpy, CustomEntityCreated.name);

    const entity = CustomEntity.create();

    expect(entity.domainEvents).toHaveLength(1);

    DomainEvents.clearMarkedEntities();

    DomainEvents.dispatchEventsForEntity(entity.id);

    expect(callbackSpy).not.toHaveBeenCalled();

    expect(entity.domainEvents).toHaveLength(1);
  });

  test('shouldRun', () => {
    const callbackSpy = vi.fn();

    DomainEvents.register(callbackSpy, CustomEntityCreated.name);

    const entity = CustomEntity.create();

    expect(entity.domainEvents).toHaveLength(1);

    DomainEvents.shouldRun = false;

    DomainEvents.dispatchEventsForEntity(entity.id);

    expect(callbackSpy).not.toHaveBeenCalled();

    expect(entity.domainEvents).toHaveLength(0);
  });
});
