import { UseCase } from '@core/application/use-case';
import { AnimalFactory } from '@domain/adoption/enterprise/entities/factories/animal.factory';
import { Cat } from '@domain/adoption/enterprise/entities/cat';
import { Dog } from '@domain/adoption/enterprise/entities/dog';
import { AnimalsRepository } from '../repositories/animals.repository';

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

export class RegisterAnimalForAdoptionUseCase
  implements UseCase<Input, Output>
{
  constructor(private animalsRepository: AnimalsRepository) {}

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
    const animal = AnimalFactory.create(species, {
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

    await this.animalsRepository.insert(animal);

    return { animal };
  }
}
