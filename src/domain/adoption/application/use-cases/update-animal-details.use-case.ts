import { UseCase } from '@core/application/use-case';
import { Cat } from '@domain/adoption/enterprise/entities/cat';
import { Dog } from '@domain/adoption/enterprise/entities/dog';
import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { AnimalGender } from '@domain/adoption/enterprise/entities/value-objects/animal-gender.vo';
import { AnimalSize } from '@domain/adoption/enterprise/entities/value-objects/animal-size.vo';
import { AnimalTemperament } from '@domain/adoption/enterprise/entities/value-objects/animal-temperament.vo';
import { AnimalCoatColor } from '@domain/adoption/enterprise/entities/value-objects/animal-coat-color.vo';
import { AnimalFactory } from '@domain/adoption/enterprise/entities/factories/animal.factory';
import { AnimalNotFoundError } from './errors/animal-not-found.error';
import { AnimalsRepository } from '../repositories/animals.repository';
import { UserNotOwnsTheAnimalError } from './errors/user-not-owns-the-animal.error';

type Input = {
  animalId: string;
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

export class UpdateAnimalDetailsUseCase implements UseCase<Input, Output> {
  constructor(private animalsRepository: AnimalsRepository) {}

  public async execute({
    animalId,
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
    const animal = await this.animalsRepository.findById(animalId);

    if (!animal) {
      throw new AnimalNotFoundError(animalId);
    }

    const ownerUniqueEntityId = UniqueEntityId.create(ownerId);

    if (!animal.ownerId.equals(ownerUniqueEntityId)) {
      throw new UserNotOwnsTheAnimalError(ownerId, animal.name);
    }

    animal.name = name;
    animal.gender = AnimalGender.create(gender);
    animal.approximateAge = approximateAge;
    animal.approximateWeight = approximateWeight;
    animal.size = AnimalSize.create(size);
    animal.temperaments = temperaments.map((temperament) =>
      AnimalTemperament.create(temperament),
    );
    animal.coatColors = coatColors.map((coatColor) =>
      AnimalCoatColor.create(coatColor),
    );
    animal.isVaccinated = isVaccinated;
    animal.isDewormed = isDewormed;
    animal.isNeutered = isNeutered;
    animal.isSpecialNeeds = isSpecialNeeds;
    animal.breed = AnimalFactory.toDomainBreed(animal.species, breed);

    return { animal };
  }
}
