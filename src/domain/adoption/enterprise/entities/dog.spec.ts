import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { SpyInstance } from 'vitest';
import { Dog } from './dog';
import { Animal } from './animal';
import { AnimalGender } from './value-objects/animal-gender.vo';
import { AnimalSize } from './value-objects/animal-size.vo';
import { AnimalTemperament } from './value-objects/animal-temperament.vo';
import { AnimalCoatColor } from './value-objects/animal-coat-color.vo';
import { AnimalDogBreed } from './value-objects/animal-dog-breed.vo';

describe('Dog Unit Tests', () => {
  test('constructor', () => {
    const spyValidate = vi.spyOn(Animal, 'validate');

    const dog = Dog.create({
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
      breed: AnimalDogBreed.create('chihuahua'),
    });

    expect(dog).toBeDefined();
    expect(dog.id).toBeInstanceOf(UniqueEntityId);
    expect(dog.name).toBe('Rosita');

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
      const dog = Dog.create({
        breed: AnimalDogBreed.create('american-bully'),
      } as any);
      expect(dog.breed).toEqual(AnimalDogBreed.create('american-bully'));

      dog.breed = AnimalDogBreed.create('bulldog');
      expect(dog.breed).toEqual(AnimalDogBreed.create('bulldog'));

      expect(spyAnimalValidate).toHaveBeenCalled();
    });
  });
});
