import { ValidationError } from '@core/enterprise/errors/validation.error';
import { ValueObject } from '@core/enterprise/value-object';

export enum AnimalCatBreedEnum {
  SRD = 'srd',
  PERSA = 'persa',
}

export class AnimalCatBreed extends ValueObject<AnimalCatBreedEnum> {
  public static create(value: string | AnimalCatBreedEnum): AnimalCatBreed {
    const animalCatBreed = AnimalCatBreed.fromString(value);

    return new AnimalCatBreed(animalCatBreed);
  }

  public equals(valueObject: AnimalCatBreed): boolean {
    return this.value === valueObject.value;
  }

  static fromString(value: string): AnimalCatBreedEnum {
    const key = value.toUpperCase().replaceAll('-', '_');
    const valueExists = Object.keys(AnimalCatBreedEnum).includes(key);

    if (!valueExists) {
      throw new ValidationError(`Cat breed "${key}" is invalid`);
    }

    return AnimalCatBreedEnum[key];
  }
}
