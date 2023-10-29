import { Entity } from './entity';
import { DomainEvent } from './domain-event';
import { UniqueEntityId } from './unique-entity-id.vo';

type DomainEventCallback = (event: unknown) => void;

export class DomainEvents {
  private static handlersMap: Record<string, DomainEventCallback[]> = {};

  private static markedEntities: Entity<unknown>[] = [];

  public static shouldRun = true;

  public static markEntityForDispatch(aggregate: Entity<unknown>) {
    const aggregateFound = !!this.findMarkedEntityByID(aggregate.id);

    if (!aggregateFound) {
      this.markedEntities.push(aggregate);
    }
  }

  private static dispatchEntityEvents(aggregate: Entity<unknown>) {
    aggregate.domainEvents.forEach((event: DomainEvent) =>
      this.dispatch(event),
    );
  }

  private static removeEntityFromMarkedDispatchList(
    aggregate: Entity<unknown>,
  ) {
    const index = this.markedEntities.findIndex((a) => a.equals(aggregate));

    this.markedEntities.splice(index, 1);
  }

  private static findMarkedEntityByID(
    id: UniqueEntityId,
  ): Entity<unknown> | undefined {
    return this.markedEntities.find((aggregate) => aggregate.id.equals(id));
  }

  public static dispatchEventsForEntity(id: UniqueEntityId) {
    const aggregate = this.findMarkedEntityByID(id);

    if (aggregate) {
      this.dispatchEntityEvents(aggregate);
      aggregate.clearEvents();
      this.removeEntityFromMarkedDispatchList(aggregate);
    }
  }

  public static register(
    callback: DomainEventCallback,
    eventClassName: string,
  ) {
    const wasEventRegisteredBefore = eventClassName in this.handlersMap;

    if (!wasEventRegisteredBefore) {
      this.handlersMap[eventClassName] = [];
    }

    this.handlersMap[eventClassName].push(callback);
  }

  public static clearHandlers() {
    this.handlersMap = {};
  }

  public static clearMarkedEntities() {
    this.markedEntities = [];
  }

  private static dispatch(event: DomainEvent) {
    const eventClassName: string = event.constructor.name;

    const isEventRegistered = eventClassName in this.handlersMap;

    if (!this.shouldRun) {
      return;
    }

    if (isEventRegistered) {
      const handlers = this.handlersMap[eventClassName];

      for (const handler of handlers) {
        handler(event);
      }
    }
  }
}
