import { UseCase } from '@core/application/use-case';
import { Cat } from '@domain/adoption/enterprise/entities/cat';
import { Dog } from '@domain/adoption/enterprise/entities/dog';
import { AnimalsRepository } from '../repositories/animals.repository';
import { AnimalNotFoundError } from './errors/animal-not-found.error';

type Input = {
  animalId: string;
};

type Output = {
  animal: Dog | Cat;
};

export class ShowAnimalDetailsUseCase implements UseCase<Input, Output> {
  constructor(private animalsRepository: AnimalsRepository) {}

  public async execute({ animalId }: Input): Promise<Output> {
    const animal = await this.animalsRepository.findById(animalId);

    if (!animal) {
      throw new AnimalNotFoundError(animalId);
    }

    return { animal };
  }
}
