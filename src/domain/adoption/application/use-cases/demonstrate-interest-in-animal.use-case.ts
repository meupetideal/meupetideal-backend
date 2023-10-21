import { UseCase } from '@core/application/use-case';
import { Interest } from '@domain/adoption/enterprise/entities/interest';
import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { InterestAlreadyDemonstratedError } from './errors/interest-already-demonstrated.error';
import { AnimalIsUnavailableError } from './errors/animal-is-unavailable.error';
import { UserIsAnimalOwnerError } from './errors/user-is-animal-owner.error';
import { AnimalsService } from '../services/animals.service';
import { InterestsService } from '../services/interests.service';

type Input = {
  animalId: string;
  userId: string;
};

type Output = {
  interest: Interest;
};

export class DemonstrateInterestInAnimalUseCase
  implements UseCase<Input, Output>
{
  constructor(
    private animalsService: AnimalsService,
    private interestsService: InterestsService,
  ) {}

  async execute({ animalId, userId }: Input): Promise<Output> {
    const animal = await this.animalsService.getAnimal(animalId);

    const existingInterest = await this.interestsService.getInterest(
      animalId,
      userId,
    );

    if (existingInterest) {
      throw new InterestAlreadyDemonstratedError(userId, animalId);
    }

    if (animal.ownerId.equals(UniqueEntityId.create(userId))) {
      throw new UserIsAnimalOwnerError(userId, animalId);
    }

    if (animal.isUnavailable()) {
      throw new AnimalIsUnavailableError(animal.name);
    }

    const interest = await this.interestsService.register({
      animalId,
      userId,
    });

    return { interest };
  }
}
