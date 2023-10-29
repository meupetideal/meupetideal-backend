import { Entity } from './entity';
import { UniqueEntityId } from './unique-entity-id.vo';

interface StubProps {
  name: string;
}

class StubEntity extends Entity<StubProps> {
  public static create(props: StubProps, id?: UniqueEntityId): StubEntity {
    return new StubEntity(props, id);
  }

  get name() {
    return this.props.name;
  }
}

class StubDomainEvent {}

describe('Entity Unit Tests', () => {
  it('should instantiate Entity with props and optional parameters', () => {
    const props = { name: 'John Doe' };
    const id = UniqueEntityId.create();

    const entity = StubEntity.create(props, id);

    expect(entity.name).toEqual(props.name);
    expect(entity.id).toEqual(id);
  });

  it('should have getters for id, createdAt, and updatedAt', () => {
    const entity = StubEntity.create({ name: 'John Doe' });

    expect(entity.id).toBeDefined();
  });

  it('should be equal to another Entity instance', () => {
    const id = UniqueEntityId.create();
    const entity1 = StubEntity.create({ name: 'John Doe' }, id);
    const entity2 = StubEntity.create({ name: 'John Doe' }, id);

    expect(entity1.equals(entity2)).toBe(true);
  });

  it('should not be equal to a non-Entity object', () => {
    const entity = StubEntity.create({ name: 'John Doe' });
    const nonEntityObject = { name: 'John Doe' } as any;

    expect(entity.equals(nonEntityObject)).toBe(false);
  });

  it('should not be equal to null or undefined', () => {
    const entity = StubEntity.create({ name: 'John Doe' });

    expect(entity.equals(null as any)).toBe(false);
    expect(entity.equals(undefined as any)).toBe(false);
  });

  describe('Events', () => {
    it('should add domain event to list of domain events when adding a domain event', () => {
      const entity = StubEntity.create({ name: 'John Doe' });

      const domainEvent = new StubDomainEvent();

      entity['addDomainEvent' as any](domainEvent);

      expect(entity.domainEvents).toContain(domainEvent);
    });

    it('should clear the list of domain events when clearing the domain events', () => {
      const entity = StubEntity.create({ name: 'John Doe' });
      const domainEvent1 = new StubDomainEvent();
      const domainEvent2 = new StubDomainEvent();

      entity['addDomainEvent' as any](domainEvent1);
      entity['addDomainEvent' as any](domainEvent2);

      entity.clearEvents();

      expect(entity.domainEvents).toEqual([]);
    });

    it('should return true when comparing two entities with the same ID', () => {
      const id = UniqueEntityId.create();
      const entity1 = StubEntity.create({ name: 'John Doe' }, id);
      const entity2 = StubEntity.create({ name: 'John Doe' }, id);

      expect(entity1.equals(entity2)).toBe(true);
    });

    it('should return an empty list of domain events when entity has no domain events', () => {
      const entity = StubEntity.create({ name: 'John Doe' });

      expect(entity.domainEvents).toEqual([]);
    });

    it('should return a list with the single domain event when entity has one domain event', () => {
      const entity = StubEntity.create({ name: 'John Doe' });
      const domainEvent = new StubDomainEvent();

      entity['addDomainEvent' as any](domainEvent);

      expect(entity.domainEvents).toEqual([domainEvent]);
    });
  });
});
