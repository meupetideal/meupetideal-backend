import { ValidationError } from '@core/enterprise/errors/validation.error';
import { AnimalCoatColor, AnimalCoatColorEnum } from './animal-coat-color.vo';

describe('AnimalCoatColor', () => {
  it('should create AnimalCoatColor with valid string value', () => {
    const animalCoatColor = AnimalCoatColor.create('black');
    expect(animalCoatColor.value).toEqual(AnimalCoatColorEnum.BLACK);
  });

  it('should create AnimalCoatColor with valid enum value', () => {
    const animalCoatColor = AnimalCoatColor.create(AnimalCoatColorEnum.WHITE);
    expect(animalCoatColor.value).toEqual(AnimalCoatColorEnum.WHITE);
  });

  it('should compare two AnimalCoatColor instances with same value', () => {
    const animalCoatColor1 = AnimalCoatColor.create('black');
    const animalCoatColor2 = AnimalCoatColor.create(AnimalCoatColorEnum.BLACK);
    expect(animalCoatColor1.equals(animalCoatColor2)).toBe(true);
  });

  it('should throw ValidationError when creating AnimalCoatColor with invalid string value', () => {
    expect(() => {
      AnimalCoatColor.create('invalid');
    }).toThrow(ValidationError);
  });

  it('should compare two AnimalCoatColor instances with different values', () => {
    const animalCoatColor1 = AnimalCoatColor.create('black');
    const animalCoatColor2 = AnimalCoatColor.create(AnimalCoatColorEnum.WHITE);
    expect(animalCoatColor1.equals(animalCoatColor2)).toBe(false);
  });
});
