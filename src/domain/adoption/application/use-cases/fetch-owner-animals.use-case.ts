import { UseCase } from '@core/application/use-case';
import { Animal } from '@domain/adoption/enterprise/entities/animal';
import { AnimalsRepository } from '../repositories/animals.repository';

type Input = {
  ownerId: string;
};

type Output = {
  animals: Animal[];
};

export class FetchOwnerAnimalsUseCase implements UseCase<Input, Output> {
  constructor(private animalsRepository: AnimalsRepository) {}

  public async execute({ ownerId }: Input): Promise<Output> {
    const animals = await this.animalsRepository.findManyByOwnerId(ownerId);

    return { animals };
  }
}
