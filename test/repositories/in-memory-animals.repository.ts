import { AnimalsRepository } from '@domain/adoption/application/repositories/animals.repository';
import { Animal } from '@domain/adoption/enterprise/entities/animal';

export class InMemoryAnimalsRepository implements AnimalsRepository {
  public items: Animal[] = [];

  public async insert(entity: Animal<unknown>): Promise<void> {
    this.items.push(entity);
  }
}
