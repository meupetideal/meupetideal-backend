import { UseCase } from '@core/application/use-case';
import { Cat } from '@domain/adoption/enterprise/entities/cat';
import { Dog } from '@domain/adoption/enterprise/entities/dog';
import { inject, injectable } from 'tsyringe';
import { AnimalsService } from '../services/animals.service';

type Input = {
  animalId: string;
};

type Output = {
  animal: Dog | Cat;
};

@injectable()
export class ShowAnimalDetailsUseCase implements UseCase<Input, Output> {
  constructor(
    @inject('AnimalsService')
    private animalsService: AnimalsService,
  ) {}

  public async execute({ animalId }: Input): Promise<Output> {
    const animal = await this.animalsService.getAnimal(animalId);

    return { animal };
  }
}
