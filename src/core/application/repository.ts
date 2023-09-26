import { Entity } from '@core/enterprise/entity';
import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';

export abstract class Repository<E extends Entity> {
  abstract findById(id: string | UniqueEntityId): Promise<E | undefined>;
  abstract insert(entity: E): Promise<void>;
  abstract update(entity: E): Promise<void>;
  abstract delete(entity: E): Promise<void>;
}
