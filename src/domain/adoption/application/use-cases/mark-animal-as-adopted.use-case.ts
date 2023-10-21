import { UseCase } from '@core/application/use-case';
import { Cat } from '@domain/adoption/enterprise/entities/cat';
import { Dog } from '@domain/adoption/enterprise/entities/dog';
import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { AnimalsRepository } from '../repositories/animals.repository';
import { UserNotOwnsTheAnimalError } from './errors/user-not-owns-the-animal.error';
import { AnimalsService } from '../services/animals.service';

type Input = {
  animalId: string;
  ownerId: string;
};

type Output = {
  animal: Dog | Cat;
};

export class MarkAnimalAsAdoptedUseCase implements UseCase<Input, Output> {
  constructor(
    private animalsService: AnimalsService,
    private animalsRepository: AnimalsRepository,
  ) {}

  public async execute({ animalId, ownerId }: Input): Promise<Output> {
    const animal = await this.animalsService.getAnimal(animalId);

    const ownerUniqueEntityId = UniqueEntityId.create(ownerId);

    if (!animal.ownerId.equals(ownerUniqueEntityId)) {
      throw new UserNotOwnsTheAnimalError(animalId, ownerId);
    }

    animal.adopt();

    await this.animalsRepository.save(animal);

    return { animal };
  }
}
