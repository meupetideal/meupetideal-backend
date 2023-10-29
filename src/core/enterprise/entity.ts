import { DomainEvent } from './domain-event';
import { DomainEvents } from './domain-events';
import { UniqueEntityId } from './unique-entity-id.vo';

export abstract class Entity<Props = unknown> {
  private _id: UniqueEntityId;

  private _domainEvents: DomainEvent[] = [];

  protected readonly props: Props;

  protected constructor(props: Props, id?: UniqueEntityId) {
    this.props = props;
    this._id = id ?? UniqueEntityId.create();
  }

  get id(): UniqueEntityId {
    return this._id;
  }

  get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }

  public equals(entity: Entity<Props>): boolean {
    if (!(entity instanceof Entity)) {
      return false;
    }

    return entity.id.equals(this._id);
  }

  protected addDomainEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent);
    DomainEvents.markEntityForDispatch(this);
  }

  public clearEvents() {
    this._domainEvents = [];
  }
}
