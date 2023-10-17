import { UseCase } from '@core/application/use-case';
import { Interest } from '@domain/adoption/enterprise/entities/interest';
import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { AnimalsRepository } from '../repositories/animals.repository';
import { AnimalNotFoundError } from './errors/animal-not-found.error';
import { InterestsRepository } from '../repositories/interests.repository';
import { InterestAlreadyDemonstratedError } from './errors/interest-already-demonstrated.error';
import { AnimalIsUnavailableError } from './errors/animal-is-unavailable.error';
import { UserIsAnimalOwnerError } from './errors/user-is-animal-owner.error';

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
    private animalsRepository: AnimalsRepository,
    private interestsRepository: InterestsRepository,
  ) {}

  async execute({ animalId, userId }: Input): Promise<Output> {
    const animal = await this.animalsRepository.findById(animalId);

    if (!animal) {
      throw new AnimalNotFoundError(animalId);
    }

    const existingInterest =
      await this.interestsRepository.findByAnimalIdAndUserId(animalId, userId);

    if (existingInterest) {
      throw new InterestAlreadyDemonstratedError(userId, animalId);
    }

    if (animal.ownerId.equals(UniqueEntityId.create(userId))) {
      throw new UserIsAnimalOwnerError(userId, animalId);
    }

    if (animal.isUnavailable()) {
      throw new AnimalIsUnavailableError(animal.name);
    }

    const interest = Interest.create({
      animalId: animal.id,
      userId: UniqueEntityId.create(userId),
    });

    await this.interestsRepository.insert(interest);

    return { interest };
  }
}
