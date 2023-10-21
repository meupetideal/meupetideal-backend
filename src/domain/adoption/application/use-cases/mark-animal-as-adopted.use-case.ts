import { UseCase } from '@core/application/use-case';
import { Cat } from '@domain/adoption/enterprise/entities/cat';
import { Dog } from '@domain/adoption/enterprise/entities/dog';
import { AnimalsRepository } from '../repositories/animals.repository';
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
    const animal = await this.animalsService.getOwnerAnimal(animalId, ownerId);

    animal.adopt();

    await this.animalsRepository.save(animal);

    return { animal };
  }
}
