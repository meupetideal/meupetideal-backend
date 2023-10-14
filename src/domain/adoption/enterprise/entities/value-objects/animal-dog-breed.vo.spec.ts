import { ValidationError } from '@core/enterprise/errors/validation.error';
import { AnimalDogBreed, AnimalDogBreedEnum } from './animal-dog-breed.vo';

describe('AnimalDogBreed', () => {
  it('should create AnimalDogBreed with valid string value', () => {
    const animalDogBreed = AnimalDogBreed.create('srd');
    expect(animalDogBreed.value).toEqual(AnimalDogBreedEnum.SRD);
  });

  it('should create AnimalDogBreed with valid enum value', () => {
    const animalDogBreed = AnimalDogBreed.create(AnimalDogBreedEnum.CHIHUAHUA);
    expect(animalDogBreed.value).toEqual(AnimalDogBreedEnum.CHIHUAHUA);
  });

  it('should compare two AnimalDogBreed instances with same value', () => {
    const animalDogBreed1 = AnimalDogBreed.create('srd');
    const animalDogBreed2 = AnimalDogBreed.create(AnimalDogBreedEnum.SRD);
    expect(animalDogBreed1.equals(animalDogBreed2)).toBe(true);
  });

  it('should throw ValidationError when creating AnimalDogBreed with invalid string value', () => {
    expect(() => {
      AnimalDogBreed.create('invalid');
    }).toThrow(ValidationError);
  });

  it('should compare two AnimalDogBreed instances with different values', () => {
    const animalDogBreed1 = AnimalDogBreed.create('srd');
    const animalDogBreed2 = AnimalDogBreed.create(AnimalDogBreedEnum.CHIHUAHUA);
    expect(animalDogBreed1.equals(animalDogBreed2)).toBe(false);
  });
});
