import { SearchInput, SearchOutput } from '@core/application/pagination';
import { Repository } from '@core/application/repository';
import { Cat } from '@domain/adoption/enterprise/entities/cat';
import { Dog } from '@domain/adoption/enterprise/entities/dog';

export interface AnimalSearchFilters {
  age?: {
    min?: number;
    max?: number;
  };
  weight?: {
    min?: number;
    max?: number;
  };
  gender?: string;
  species?: string;
  sizes?: string[];
  breeds?: string[];
  coatColors?: string[];
  temperaments?: string[];
}

export abstract class AnimalsRepository extends Repository {
  public abstract search(
    data: SearchInput<AnimalSearchFilters>,
  ): Promise<SearchOutput<Cat | Dog>>;
  public abstract findManyByOwnerId(ownerId: string): Promise<(Cat | Dog)[]>;
  public abstract findById(id: string): Promise<Cat | Dog | undefined>;
  public abstract insert(entity: Cat | Dog): Promise<void>;
  public abstract save(entity: Cat | Dog): Promise<void>;
}
