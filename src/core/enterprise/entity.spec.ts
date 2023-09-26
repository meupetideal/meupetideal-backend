import { waitFor } from 'test/utils/wait-for';
import { Entity } from './entity';
import { UniqueEntityId } from './unique-entity-id.vo';

interface StubProps {
  name: string;
}

class StubEntity extends Entity<StubProps> {
  public static create(
    props: StubProps,
    id?: UniqueEntityId,
    createdAt?: Date,
    updatedAt?: Date,
  ): StubEntity {
    return new StubEntity(props, id, createdAt, updatedAt);
  }

  get name() {
    return this.props.name;
  }
}

describe('Entity Unit Tests', () => {
  it('should instantiate Entity with props and optional parameters', () => {
    const props = { name: 'John Doe' };
    const id = UniqueEntityId.create();
    const createdAt = new Date();
    const updatedAt = new Date();

    const entity = StubEntity.create(props, id, createdAt, updatedAt);

    expect(entity.name).toEqual(props.name);
    expect(entity.id).toEqual(id);
    expect(entity.createdAt).toEqual(createdAt);
    expect(entity.updatedAt).toEqual(updatedAt);
  });

  it('should have getters for id, createdAt, and updatedAt', () => {
    const entity = StubEntity.create({ name: 'John Doe' });

    expect(entity.id).toBeDefined();
    expect(entity.createdAt).toBeDefined();
    expect(entity.updatedAt).toBeDefined();
  });

  it('should be equal to another Entity instance', () => {
    const id = UniqueEntityId.create();
    const entity1 = StubEntity.create({ name: 'John Doe' }, id);
    const entity2 = StubEntity.create({ name: 'John Doe' }, id);

    expect(entity1.equals(entity2)).toBe(true);
  });

  it('should update Entity with _touch() method', () => {
    const entity = StubEntity.create({ name: 'John Doe' });
    const originalUpdatedAt = entity.updatedAt;

    (entity as any)._touch();

    waitFor(() => expect(entity.updatedAt).not.toEqual(originalUpdatedAt));
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
});
