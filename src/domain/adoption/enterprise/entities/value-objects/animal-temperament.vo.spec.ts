import { ValidationError } from '@core/enterprise/errors/validation.error';
import {
  AnimalTemperament,
  AnimalTemperamentEnum,
} from './animal-temperament.vo';

describe('AnimalTemperament', () => {
  it('should create AnimalTemperament with valid string value', () => {
    const animalTemperament = AnimalTemperament.create('adventurous');
    expect(animalTemperament.value).toEqual(AnimalTemperamentEnum.ADVENTUROUS);
  });

  it('should create AnimalTemperament with valid enum value', () => {
    const animalTemperament = AnimalTemperament.create(
      AnimalTemperamentEnum.AGGRESSIVE,
    );
    expect(animalTemperament.value).toEqual(AnimalTemperamentEnum.AGGRESSIVE);
  });

  it('should compare two AnimalTemperament instances with same value', () => {
    const animalTemperament1 = AnimalTemperament.create('adventurous');
    const animalTemperament2 = AnimalTemperament.create(
      AnimalTemperamentEnum.ADVENTUROUS,
    );
    expect(animalTemperament1.equals(animalTemperament2)).toBe(true);
  });

  it('should throw ValidationError when creating AnimalTemperament with invalid string value', () => {
    expect(() => {
      AnimalTemperament.create('invalid');
    }).toThrow(ValidationError);
  });

  it('should compare two AnimalTemperament instances with different values', () => {
    const animalTemperament1 = AnimalTemperament.create('adventurous');
    const animalTemperament2 = AnimalTemperament.create(
      AnimalTemperamentEnum.AGGRESSIVE,
    );
    expect(animalTemperament1.equals(animalTemperament2)).toBe(false);
  });
});
