import { ValidationError } from '@core/enterprise/errors/validation.error';
import { ValueObject } from '@core/enterprise/value-object';

export enum AnimalTemperamentEnum {
  PLAYFUL = 'playful',
  AGGRESSIVE = 'aggressive',
  SHY = 'shy',
  ENERGETIC = 'energetic',
  INDEPENDENT = 'independent',
  CALM = 'calm',
  CHILD_FRIENDLY = 'child-friendly',
  ANIMAL_FRIENDLY = 'animal-friendly',
  INTELLIGENT = 'intelligent',
  SOCIABLE = 'sociable',
  CONFIDENT = 'confident',
  AFFECTIONATE = 'affectionate',
  ADVENTUROUS = 'adventurous',
}

export const animalTemperamentTranslations: Record<
  AnimalTemperamentEnum,
  string
> = {
  playful: 'Brincalhão',
  aggressive: 'Agressivo',
  shy: 'Tímido',
  energetic: 'Energético',
  independent: 'Independente',
  calm: 'Calmo',
  'child-friendly': 'Amigável com crianças',
  'animal-friendly': 'Amigável com animais',
  intelligent: 'Inteligente',
  sociable: 'Sociável',
  confident: 'Confiante',
  affectionate: 'Afetuoso',
  adventurous: 'Aventureiro',
};

export class AnimalTemperament extends ValueObject<AnimalTemperamentEnum> {
  public static create(
    value: string | AnimalTemperamentEnum,
  ): AnimalTemperament {
    const animalTemperament = AnimalTemperament.fromString(value);

    return new AnimalTemperament(animalTemperament);
  }

  public equals(valueObject: ValueObject<AnimalTemperamentEnum>): boolean {
    return this.value === valueObject.value;
  }

  static fromString(value: string): AnimalTemperamentEnum {
    const key = value.toUpperCase().replaceAll('-', '_');
    const valueExists = Object.keys(AnimalTemperamentEnum).includes(key);

    if (!valueExists) {
      throw new ValidationError(`Animal temperament "${key}" is invalid`);
    }

    return AnimalTemperamentEnum[key];
  }
}
