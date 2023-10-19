import { Repository } from '@core/application/repository';
import { Interest } from '@domain/adoption/enterprise/entities/interest';

export abstract class InterestsRepository extends Repository {
  public abstract findAllByAnimalId(animalId: string): Promise<Interest[]>;
  public abstract findByAnimalIdAndUserId(
    animalId: string,
    userId: string,
  ): Promise<Interest | undefined>;
  public abstract findAllFromUserId(userId: string): Promise<Interest[]>;
  public abstract insert(entity: Interest): Promise<void>;
}
