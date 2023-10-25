import { UseCase } from '@core/application/use-case';
import { Cat } from '@domain/adoption/enterprise/entities/cat';
import { Dog } from '@domain/adoption/enterprise/entities/dog';
import { inject, injectable } from 'tsyringe';
import { AnimalsService } from '../services/animals.service';

type Input = {
  species: 'dog' | 'cat';
  ownerId: string;
  name: string;
  gender: string;
  approximateAge: number;
  approximateWeight: number;
  size: string;
  temperaments: string[];
  coatColors: string[];
  isVaccinated: boolean;
  isDewormed: boolean;
  isNeutered: boolean;
  isSpecialNeeds: boolean;
  breed: string;
};

type Output = {
  animal: Dog | Cat;
};

@injectable()
export class RegisterAnimalForAdoptionUseCase
  implements UseCase<Input, Output>
{
  constructor(
    @inject('AnimalsService')
    private animalsService: AnimalsService,
  ) {}

  public async execute({
    species,
    ownerId,
    name,
    gender,
    approximateAge,
    approximateWeight,
    size,
    temperaments,
    coatColors,
    isVaccinated,
    isDewormed,
    isNeutered,
    isSpecialNeeds,
    breed,
  }: Input): Promise<Output> {
    const animal = await this.animalsService.register({
      species,
      ownerId,
      name,
      gender,
      approximateAge,
      approximateWeight,
      size,
      temperaments,
      coatColors,
      isVaccinated,
      isDewormed,
      isNeutered,
      isSpecialNeeds,
      breed,
    });

    return { animal };
  }
}
