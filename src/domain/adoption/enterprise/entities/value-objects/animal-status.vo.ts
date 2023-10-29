import { ValidationError } from '@core/enterprise/errors/validation.error';
import { ValueObject } from '@core/enterprise/value-object';

export enum AnimalStatusEnum {
  ADOPTED = 'adopted',
  AVAILABLE = 'available',
}

export const animalStatusTranslations: Record<AnimalStatusEnum, string> = {
  adopted: 'Adotado',
  available: 'Disponível',
};

export class AnimalStatus extends ValueObject<AnimalStatusEnum> {
  public static create(
    value: string | AnimalStatusEnum | undefined,
  ): AnimalStatus {
    if (!value) {
      return new AnimalStatus(AnimalStatusEnum.AVAILABLE);
    }

    const animalStatus = AnimalStatus.fromString(value);

    return new AnimalStatus(animalStatus);
  }

  public equals(valueObject: ValueObject<AnimalStatusEnum>): boolean {
    return this.value === valueObject.value;
  }

  static fromString(value: string): AnimalStatusEnum {
    const key = value.toUpperCase().replaceAll('-', '_');
    const valueExists = Object.keys(AnimalStatusEnum).includes(key);

    if (!valueExists) {
      throw new ValidationError(`Animal status "${key}" is invalid`);
    }

    return AnimalStatusEnum[key];
  }
}
