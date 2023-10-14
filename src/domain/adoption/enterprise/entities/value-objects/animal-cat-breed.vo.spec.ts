import { ValidationError } from '@core/enterprise/errors/validation.error';
import { AnimalCatBreed, AnimalCatBreedEnum } from './animal-cat-breed.vo';

describe('AnimalCatBreed', () => {
  it('should create AnimalCatBreed with valid string value', () => {
    const animalCatBreed = AnimalCatBreed.create('srd');
    expect(animalCatBreed.value).toEqual(AnimalCatBreedEnum.SRD);
  });

  it('should create AnimalCatBreed with valid enum value', () => {
    const animalCatBreed = AnimalCatBreed.create(AnimalCatBreedEnum.PERSA);
    expect(animalCatBreed.value).toEqual(AnimalCatBreedEnum.PERSA);
  });

  it('should compare two AnimalCatBreed instances with same value', () => {
    const animalCatBreed1 = AnimalCatBreed.create('srd');
    const animalCatBreed2 = AnimalCatBreed.create(AnimalCatBreedEnum.SRD);
    expect(animalCatBreed1.equals(animalCatBreed2)).toBe(true);
  });

  it('should throw ValidationError when creating AnimalCatBreed with invalid string value', () => {
    expect(() => {
      AnimalCatBreed.create('invalid');
    }).toThrow(ValidationError);
  });

  it('should compare two AnimalCatBreed instances with different values', () => {
    const animalCatBreed1 = AnimalCatBreed.create('srd');
    const animalCatBreed2 = AnimalCatBreed.create(AnimalCatBreedEnum.PERSA);
    expect(animalCatBreed1.equals(animalCatBreed2)).toBe(false);
  });
});
