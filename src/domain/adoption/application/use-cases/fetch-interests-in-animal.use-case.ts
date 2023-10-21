import { UseCase } from '@core/application/use-case';
import { Interest } from '@domain/adoption/enterprise/entities/interest';
import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { InterestsRepository } from '../repositories/interests.repository';
import { UserNotOwnsTheAnimalError } from './errors/user-not-owns-the-animal.error';
import { AnimalsService } from '../services/animals.service';

type Input = {
  ownerId: string;
  animalId: string;
};

type Output = {
  interests: Interest[];
};

export class FetchInterestsInAnimalUseCase implements UseCase<Input, Output> {
  constructor(
    private animalsService: AnimalsService,
    private interestsRepository: InterestsRepository,
  ) {}

  public async execute({ ownerId, animalId }: Input): Promise<Output> {
    const animal = await this.animalsService.getAnimal(animalId);

    if (!animal.ownerId.equals(UniqueEntityId.create(ownerId))) {
      throw new UserNotOwnsTheAnimalError(ownerId, animal.name);
    }

    const interests =
      await this.interestsRepository.findAllByAnimalId(animalId);

    return { interests };
  }
}
