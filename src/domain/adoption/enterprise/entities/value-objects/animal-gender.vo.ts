import { ValidationError } from '@core/enterprise/errors/validation.error';
import { ValueObject } from '@core/enterprise/value-object';

export enum AnimalGenderEnum {
  MALE = 'male',
  FEMALE = 'female',
}

export class AnimalGender extends ValueObject<AnimalGenderEnum> {
  public static create(value: string | AnimalGenderEnum): AnimalGender {
    const animalGender = AnimalGender.fromString(value);

    return new AnimalGender(animalGender);
  }

  public equals(valueObject: ValueObject<AnimalGenderEnum>): boolean {
    return this.value === valueObject.value;
  }

  static fromString(value: string): AnimalGenderEnum {
    const key = value.toUpperCase().replaceAll('-', '_');
    const valueExists = Object.keys(AnimalGenderEnum).includes(key);

    if (!valueExists) {
      throw new ValidationError(`Animal gender ${key} is invalid`);
    }

    return AnimalGenderEnum[key];
  }
}
