import { ValidationError } from '@core/enterprise/errors/validation.error';
import { AnimalSize, AnimalSizeEnum } from './animal-size.vo';

describe('AnimalSize', () => {
  it('should create AnimalSize with valid string value', () => {
    const animalSize = AnimalSize.create('small');
    expect(animalSize.value).toEqual(AnimalSizeEnum.SMALL);
  });

  it('should create AnimalSize with valid enum value', () => {
    const animalSize = AnimalSize.create(AnimalSizeEnum.LARGE);
    expect(animalSize.value).toEqual(AnimalSizeEnum.LARGE);
  });

  it('should compare two AnimalSize instances with same value', () => {
    const animalSize1 = AnimalSize.create('small');
    const animalSize2 = AnimalSize.create(AnimalSizeEnum.SMALL);
    expect(animalSize1.equals(animalSize2)).toBe(true);
  });

  it('should throw ValidationError when creating AnimalSize with invalid string value', () => {
    expect(() => {
      AnimalSize.create('invalid');
    }).toThrow(ValidationError);
  });

  it('should compare two AnimalSize instances with different values', () => {
    const animalSize1 = AnimalSize.create('small');
    const animalSize2 = AnimalSize.create(AnimalSizeEnum.LARGE);
    expect(animalSize1.equals(animalSize2)).toBe(false);
  });
});
