import { SearchInput, SearchOutput } from '@core/application/pagination';
import { Repository } from '@core/application/repository';
import { Cat } from '@domain/adoption/enterprise/entities/cat';
import { Dog } from '@domain/adoption/enterprise/entities/dog';

type Item = Cat | Dog;

export abstract class AnimalsRepository extends Repository {
  public abstract search(data: SearchInput): Promise<SearchOutput<Item>>;
  public abstract findManyByOwnerId(ownerId: string): Promise<Item[]>;
  public abstract findById(id: string): Promise<Item | undefined>;
  public abstract insert(entity: Item): Promise<void>;
  public abstract save(entity: Item): Promise<void>;
}
