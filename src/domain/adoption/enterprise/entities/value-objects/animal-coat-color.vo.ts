import { ValidationError } from '@core/enterprise/errors/validation.error';
import { ValueObject } from '@core/enterprise/value-object';

export enum AnimalCoatColorEnum {
  WHITE = 'white',
  BLACK = 'black',
  BROWN = 'brown',
  GRAY = 'gray',
  CARAMEL = 'caramel',
  CREAM = 'cream',
  ORANGE = 'orange',
  FAWN = 'fawn',
  BRINDLE = 'brindle',
  CHOCOLATE = 'chocolate',
}

export class AnimalCoatColor extends ValueObject<AnimalCoatColorEnum> {
  public static create(value: string | AnimalCoatColorEnum): AnimalCoatColor {
    const animalCoatColor = AnimalCoatColor.fromString(value);

    return new AnimalCoatColor(animalCoatColor);
  }

  public equals(valueObject: ValueObject<AnimalCoatColorEnum>): boolean {
    return this.value === valueObject.value;
  }

  static fromString(value: string): AnimalCoatColorEnum {
    const key = value.toUpperCase().replaceAll('-', '_');
    const valueExists = Object.keys(AnimalCoatColorEnum).includes(key);

    if (!valueExists) {
      throw new ValidationError(`Animal coat color "${key}" is invalid`);
    }

    return AnimalCoatColorEnum[key];
  }
}
