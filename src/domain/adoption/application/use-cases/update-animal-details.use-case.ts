import { UseCase } from '@core/application/use-case';
import { Cat } from '@domain/adoption/enterprise/entities/cat';
import { Dog } from '@domain/adoption/enterprise/entities/dog';
import { AnimalGender } from '@domain/adoption/enterprise/entities/value-objects/animal-gender.vo';
import { AnimalSize } from '@domain/adoption/enterprise/entities/value-objects/animal-size.vo';
import { AnimalTemperament } from '@domain/adoption/enterprise/entities/value-objects/animal-temperament.vo';
import { AnimalCoatColor } from '@domain/adoption/enterprise/entities/value-objects/animal-coat-color.vo';
import { AnimalFactory } from '@domain/adoption/enterprise/entities/factories/animal.factory';
import { inject, injectable } from 'tsyringe';
import { AnimalsRepository } from '../repositories/animals.repository';
import { AnimalsService } from '../services/animals.service';

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

@injectable()
export class UpdateAnimalDetailsUseCase implements UseCase<Input, Output> {
  constructor(
    @inject('AnimalsService')
    private animalsService: AnimalsService,
    @inject('AnimalsRepository')
    private animalsRepository: AnimalsRepository,
  ) {}

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
    const animal = await this.animalsService.getOwnerAnimal(animalId, ownerId);

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

    await this.animalsRepository.save(animal);

    return { animal };
  }
}
