import { ValidationError } from '@core/enterprise/errors/validation.error';
import { AnimalGender, AnimalGenderEnum } from './animal-gender.vo';

describe('AnimalGender', () => {
  it('should create AnimalGender with valid string value', () => {
    const animalGender = AnimalGender.create('female');
    expect(animalGender.value).toEqual(AnimalGenderEnum.FEMALE);
  });

  it('should create AnimalGender with valid enum value', () => {
    const animalGender = AnimalGender.create(AnimalGenderEnum.MALE);
    expect(animalGender.value).toEqual(AnimalGenderEnum.MALE);
  });

  it('should compare two AnimalGender instances with same value', () => {
    const animalGender1 = AnimalGender.create('female');
    const animalGender2 = AnimalGender.create(AnimalGenderEnum.FEMALE);
    expect(animalGender1.equals(animalGender2)).toBe(true);
  });

  it('should throw ValidationError when creating AnimalGender with invalid string value', () => {
    expect(() => {
      AnimalGender.create('invalid');
    }).toThrow(ValidationError);
  });

  it('should compare two AnimalGender instances with different values', () => {
    const animalGender1 = AnimalGender.create('female');
    const animalGender2 = AnimalGender.create(AnimalGenderEnum.MALE);
    expect(animalGender1.equals(animalGender2)).toBe(false);
  });
});
