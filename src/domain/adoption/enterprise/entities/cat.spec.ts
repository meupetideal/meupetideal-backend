import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { SpyInstance } from 'vitest';
import { Cat } from './cat';
import { Animal } from './animal';
import { AnimalGender } from './value-objects/animal-gender.vo';
import { AnimalSize } from './value-objects/animal-size.vo';
import { AnimalTemperament } from './value-objects/animal-temperament.vo';
import { AnimalCoatColor } from './value-objects/animal-coat-color.vo';
import { AnimalCatBreed } from './value-objects/animal-cat-breed.vo';

describe('Cat Unit Tests', () => {
  test('constructor', () => {
    const spyValidate = vi.spyOn(Animal, 'validate');

    const cat = Cat.create({
      ownerId: UniqueEntityId.create(),
      name: 'Rosita',
      gender: AnimalGender.create('female'),
      approximateAge: 1,
      approximateWeight: 2,
      size: AnimalSize.create('extra-small'),
      temperaments: [
        AnimalTemperament.create('calm'),
        AnimalTemperament.create('child-friendly'),
      ],
      coatColors: [
        AnimalCoatColor.create('black'),
        AnimalCoatColor.create('white'),
      ],
      isVaccinated: true,
      isDewormed: true,
      isNeutered: true,
      isSpecialNeeds: false,
      breed: AnimalCatBreed.create('srd'),
    });

    expect(cat).toBeDefined();
    expect(cat.id).toBeInstanceOf(UniqueEntityId);
    expect(cat.name).toBe('Rosita');

    expect(spyValidate).toHaveBeenCalledOnce();
  });

  describe('getters and setters', () => {
    let spyAnimalValidate: SpyInstance;

    beforeEach(() => {
      spyAnimalValidate = vi
        .spyOn(Animal, 'validate')
        .mockImplementation(() => true);
    });

    test('breed getter and setter', () => {
      const cat = Cat.create({ breed: AnimalCatBreed.create('srd') } as any);
      expect(cat.breed).toEqual(AnimalCatBreed.create('srd'));

      cat.breed = AnimalCatBreed.create('persa');
      expect(cat.breed).toEqual(AnimalCatBreed.create('persa'));

      expect(spyAnimalValidate).toHaveBeenCalled();
    });
  });
});
