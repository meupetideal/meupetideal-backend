import { Repository } from '@core/application/repository';
import { Animal } from '@domain/adoption/enterprise/entities/animal';

export abstract class AnimalsRepository extends Repository {
  public abstract insert(entity: Animal): Promise<void>;
}
