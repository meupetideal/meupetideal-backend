import { Repository } from '@core/application/repository';
import { AnimalPhoto } from '@domain/adoption/enterprise/entities/animal-photo';

export abstract class AnimalPhotosRepository extends Repository {
  public abstract createMany(photos: AnimalPhoto[]): Promise<void>;
}
