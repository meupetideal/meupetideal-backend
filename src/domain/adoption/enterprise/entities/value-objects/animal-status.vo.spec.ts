import { ValidationError } from '@core/enterprise/errors/validation.error';
import { AnimalStatus, AnimalStatusEnum } from './animal-status.vo';

describe('AnimalStatus', () => {
  it('should create AnimalStatus with valid string value', () => {
    const animalStatus = AnimalStatus.create('adopted');
    expect(animalStatus.value).toEqual(AnimalStatusEnum.ADOPTED);
    expect(AnimalStatus.create(undefined).value).toEqual(
      AnimalStatusEnum.AVAILABLE,
    );
  });

  it('should create AnimalStatus with valid enum value', () => {
    const animalStatus = AnimalStatus.create(AnimalStatusEnum.AVAILABLE);
    expect(animalStatus.value).toEqual(AnimalStatusEnum.AVAILABLE);
  });

  it('should compare two AnimalStatus instances with same value', () => {
    const animalStatus1 = AnimalStatus.create('adopted');
    const animalStatus2 = AnimalStatus.create(AnimalStatusEnum.ADOPTED);
    expect(animalStatus1.equals(animalStatus2)).toBe(true);
  });

  it('should throw ValidationError when creating AnimalStatus with invalid string value', () => {
    expect(() => {
      AnimalStatus.create('invalid');
    }).toThrow(ValidationError);
  });

  it('should compare two AnimalStatus instances with different values', () => {
    const animalStatus1 = AnimalStatus.create('adopted');
    const animalStatus2 = AnimalStatus.create(AnimalStatusEnum.AVAILABLE);
    expect(animalStatus1.equals(animalStatus2)).toBe(false);
  });
});
