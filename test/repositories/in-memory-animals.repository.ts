import {
  SearchInput,
  SearchMapper,
  SearchOutput,
} from '@core/application/pagination';
import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { AnimalsRepository } from '@domain/adoption/application/repositories/animals.repository';
import { Cat } from '@domain/adoption/enterprise/entities/cat';
import { Dog } from '@domain/adoption/enterprise/entities/dog';

type Item = Cat | Dog;

export class InMemoryAnimalsRepository implements AnimalsRepository {
  public items: Item[] = [];

  public async search({
    page,
    perPage,
  }: SearchInput): Promise<SearchOutput<Item>> {
    const animals = this.items.filter((item) => item.isAvailable());
    const total = animals.length;

    const paginatedItems = SearchMapper.paginate<Item>({
      page,
      perPage,
      items: animals,
    });

    return SearchMapper.toOutput<Item>({
      page,
      total,
      items: paginatedItems,
    });
  }

  public async findById(id: string): Promise<Item | undefined> {
    return this.items.find((item) => item.id.equals(UniqueEntityId.create(id)));
  }

  public async insert(entity: Item): Promise<void> {
    this.items.push(entity);
  }

  public async save(entity: Item): Promise<void> {
    const index = this.items.findIndex((item) => item.id.equals(entity.id));

    this.items[index] = entity;
  }
}
