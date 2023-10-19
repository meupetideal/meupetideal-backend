import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { Dog } from '@domain/adoption/enterprise/entities/dog';
import { AnimalDogBreed } from '@domain/adoption/enterprise/entities/value-objects/animal-dog-breed.vo';
import { AnimalCoatColor } from '@domain/adoption/enterprise/entities/value-objects/animal-coat-color.vo';
import { AnimalGender } from '@domain/adoption/enterprise/entities/value-objects/animal-gender.vo';
import { AnimalSize } from '@domain/adoption/enterprise/entities/value-objects/animal-size.vo';
import { AnimalStatus } from '@domain/adoption/enterprise/entities/value-objects/animal-status.vo';
import { AnimalTemperament } from '@domain/adoption/enterprise/entities/value-objects/animal-temperament.vo';

export class DogBuilder {
  private id: string | undefined;

  ownerId: string | undefined;

  name: string = 'Rosita';

  gender: string = 'female';

  approximateAge: number = 1;

  approximateWeight: number = 2;

  size: string = 'extra-small';

  temperaments: string[] = ['calm', 'child-friendly'];

  coatColors: string[] = ['black', 'white'];

  isVaccinated: boolean = true;

  isDewormed: boolean = true;

  isNeutered: boolean = false;

  isSpecialNeeds: boolean = false;

  breed: string = 'chihuahua';

  status: string | undefined;

  private constructor() {}

  public static create(): DogBuilder {
    return new DogBuilder();
  }

  public withId(id: string): DogBuilder {
    this.id = id;
    return this;
  }

  public withOwnerId(ownerId: string): DogBuilder {
    this.ownerId = ownerId;
    return this;
  }

  public build(): Dog {
    return Dog.create(
      {
        ownerId: UniqueEntityId.create(this.ownerId),
        species: 'dog',
        name: this.name,
        gender: AnimalGender.create(this.gender),
        approximateAge: this.approximateAge,
        approximateWeight: this.approximateWeight,
        size: AnimalSize.create(this.size),
        temperaments: this.temperaments.map((temperament) =>
          AnimalTemperament.create(temperament),
        ),
        coatColors: this.coatColors.map((coatColor) =>
          AnimalCoatColor.create(coatColor),
        ),
        isVaccinated: this.isVaccinated,
        isDewormed: this.isDewormed,
        isNeutered: this.isNeutered,
        isSpecialNeeds: this.isSpecialNeeds,
        status: AnimalStatus.create(this.status),
        breed: AnimalDogBreed.create(this.breed),
      },
      this.id ? UniqueEntityId.create(this.id) : undefined,
    );
  }
}
