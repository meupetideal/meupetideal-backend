import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { AnimalsRepository } from '@domain/adoption/application/repositories/animals.repository';
import { Cat } from '@domain/adoption/enterprise/entities/cat';
import { Dog } from '@domain/adoption/enterprise/entities/dog';

export class InMemoryAnimalsRepository implements AnimalsRepository {
  public items: (Dog | Cat)[] = [];

  public async findById(id: string): Promise<Cat | Dog | undefined> {
    return this.items.find((item) => item.id.equals(UniqueEntityId.create(id)));
  }

  public async insert(entity: Dog | Cat): Promise<void> {
    this.items.push(entity);
  }

  public async save(entity: Dog | Cat): Promise<void> {
    const index = this.items.findIndex((item) => item.id.equals(entity.id));

    this.items[index] = entity;
  }
}
