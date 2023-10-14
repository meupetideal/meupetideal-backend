import { ValidationError } from '@core/enterprise/errors/validation.error';
import { ValueObject } from '@core/enterprise/value-object';

export enum AnimalSizeEnum {
  EXTRA_SMALL = 'extra-small',
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
  EXTRA_LARGE = 'extra-large',
}

export class AnimalSize extends ValueObject<AnimalSizeEnum> {
  public static create(value: string | AnimalSizeEnum): AnimalSize {
    const animalSize = AnimalSize.fromString(value);

    return new AnimalSize(animalSize);
  }

  public equals(valueObject: ValueObject<AnimalSizeEnum>): boolean {
    return this.value === valueObject.value;
  }

  static fromString(value: string): AnimalSizeEnum {
    const key = value.toUpperCase().replaceAll('-', '_');
    const valueExists = Object.keys(AnimalSizeEnum).includes(key);

    if (!valueExists) {
      throw new ValidationError(`Animal size "${key}" is invalid`);
    }

    return AnimalSizeEnum[key];
  }
}
