import { Service } from '@core/application/service';
import { Dog } from '@domain/adoption/enterprise/entities/dog';
import { Cat } from '@domain/adoption/enterprise/entities/cat';
import { AnimalFactory } from '@domain/adoption/enterprise/entities/factories/animal.factory';
import { AnimalsRepository } from '../repositories/animals.repository';
import { AnimalNotFoundError } from '../use-cases/errors/animal-not-found.error';

interface RegisterAnimalInput {
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
}

export class AnimalsService implements Service {
  constructor(private animalsRepository: AnimalsRepository) {}

  public async getAnimal(animalId: string): Promise<Dog | Cat> {
    const animal = await this.animalsRepository.findById(animalId);

    if (!animal) {
      throw new AnimalNotFoundError(animalId);
    }

    return animal;
  }

  public async register({
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
  }: RegisterAnimalInput): Promise<Dog | Cat> {
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

    return animal;
  }
}
