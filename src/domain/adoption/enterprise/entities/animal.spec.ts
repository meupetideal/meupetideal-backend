import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { SpyInstance } from 'vitest';
import { EntityValidationError } from '@core/enterprise/errors/validation.error';
import { Animal, AnimalConstructor } from './animal';
import { AnimalGender } from './value-objects/animal-gender.vo';
import { AnimalSize } from './value-objects/animal-size.vo';
import { AnimalTemperament } from './value-objects/animal-temperament.vo';
import { AnimalCoatColor } from './value-objects/animal-coat-color.vo';
import { AnimalStatus } from './value-objects/animal-status.vo';

interface StubAnimalProps {
  test: string;
}

class StubAnimal extends Animal<StubAnimalProps> {
  public static create(
    props: StubAnimalProps & AnimalConstructor,
    id?: UniqueEntityId,
  ): StubAnimal {
    return new StubAnimal(props, id);
  }

  get test(): string {
    return this.props.test;
  }

  set test(test: string) {
    this.props.test = test;
  }
}

describe('Animal Unit Tests', () => {
  test('constructor', () => {
    const spyValidate = vi.spyOn(Animal, 'validate');

    const animal = StubAnimal.create({
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
      test: 'test',
    });

    expect(animal).toBeDefined();
    expect(animal.id).toBeInstanceOf(UniqueEntityId);
    expect(animal.name).toBe('Rosita');
    expect(animal.gender).toEqual(AnimalGender.create('female'));
    expect(animal.approximateAge).toBe(1);
    expect(animal.approximateWeight).toBe(2);
    expect(animal.size).toEqual(AnimalSize.create('extra-small'));
    expect(animal.temperaments).toEqual([
      AnimalTemperament.create('calm'),
      AnimalTemperament.create('child-friendly'),
    ]);
    expect(animal.coatColors).toEqual([
      AnimalCoatColor.create('black'),
      AnimalCoatColor.create('white'),
    ]);
    expect(animal.isVaccinated).toBe(true);
    expect(animal.isDewormed).toBe(true);
    expect(animal.isNeutered).toBe(true);
    expect(animal.isSpecialNeeds).toBe(false);
    expect(animal.status).toEqual(AnimalStatus.create('available'));
    expect(animal.test).toBe('test');
    expect(spyValidate).toHaveBeenCalledOnce();
  });

  test('validate', () => {
    expect(() => StubAnimal.validate({} as any)).toThrowError(
      EntityValidationError,
    );
  });

  describe('getters and setters', () => {
    let spyValidate: SpyInstance;

    beforeEach(() => {
      spyValidate = vi.spyOn(Animal, 'validate').mockImplementation(() => true);
    });

    afterEach(() => {
      spyValidate.mockClear();
    });

    test('ownerId getter and setter', () => {
      const ownerId = UniqueEntityId.create();
      const animal = StubAnimal.create({ ownerId } as any);
      expect(animal.ownerId).toBe(ownerId);

      const anotherUserId = UniqueEntityId.create();
      animal.ownerId = anotherUserId;
      expect(animal.ownerId).toBe(anotherUserId);

      expect(spyValidate).toHaveBeenCalledTimes(2);
    });

    test('name getter and setter', () => {
      const animal = StubAnimal.create({ name: 'John Doe' } as any);
      expect(animal.name).toBe('John Doe');

      animal.name = 'Jane Doe';
      expect(animal.name).toBe('Jane Doe');

      expect(spyValidate).toHaveBeenCalledTimes(2);
    });

    test('gender getter and setter', () => {
      const animal = StubAnimal.create({
        gender: AnimalGender.create('female'),
      } as any);
      expect(animal.gender).toEqual(AnimalGender.create('female'));

      animal.gender = AnimalGender.create('male');
      expect(animal.gender).toEqual(AnimalGender.create('male'));

      expect(spyValidate).toHaveBeenCalledTimes(2);
    });

    test('approximateAge getter and setter', () => {
      const animal = StubAnimal.create({ approximateAge: 1 } as any);
      expect(animal.approximateAge).toBe(1);

      animal.approximateAge = 3;
      expect(animal.approximateAge).toBe(3);

      expect(spyValidate).toHaveBeenCalledTimes(2);
    });

    test('approximateWeight getter and setter', () => {
      const animal = StubAnimal.create({ approximateWeight: 1 } as any);
      expect(animal.approximateWeight).toBe(1);

      animal.approximateWeight = 3;
      expect(animal.approximateWeight).toBe(3);

      expect(spyValidate).toHaveBeenCalledTimes(2);
    });

    test('size getter and setter', () => {
      const animal = StubAnimal.create({
        size: AnimalSize.create('small'),
      } as any);
      expect(animal.size).toEqual(AnimalSize.create('small'));

      animal.size = AnimalSize.create('medium');
      expect(animal.size).toEqual(AnimalSize.create('medium'));

      expect(spyValidate).toHaveBeenCalledTimes(2);
    });

    test('temperaments getter and setter', () => {
      const animal = StubAnimal.create({
        temperaments: [
          AnimalTemperament.create('adventurous'),
          AnimalTemperament.create('calm'),
        ],
      } as any);
      expect(animal.temperaments).toEqual([
        AnimalTemperament.create('adventurous'),
        AnimalTemperament.create('calm'),
      ]);

      animal.temperaments = [AnimalTemperament.create('adventurous')];
      expect(animal.temperaments).toEqual([
        AnimalTemperament.create('adventurous'),
      ]);

      expect(spyValidate).toHaveBeenCalledTimes(2);
    });

    test('coatColors getter and setter', () => {
      const animal = StubAnimal.create({
        coatColors: [
          AnimalCoatColor.create('black'),
          AnimalCoatColor.create('white'),
        ],
      } as any);
      expect(animal.coatColors).toEqual([
        AnimalCoatColor.create('black'),
        AnimalCoatColor.create('white'),
      ]);

      animal.coatColors = [AnimalCoatColor.create('black')];
      expect(animal.coatColors).toEqual([AnimalCoatColor.create('black')]);

      expect(spyValidate).toHaveBeenCalledTimes(2);
    });

    test('isVaccinated getter and setter', () => {
      const animal = StubAnimal.create({ isVaccinated: true } as any);
      expect(animal.isVaccinated).toBe(true);

      animal.isVaccinated = false;
      expect(animal.isVaccinated).toBe(false);

      expect(spyValidate).toHaveBeenCalledTimes(2);
    });

    test('isDewormed getter and setter', () => {
      const animal = StubAnimal.create({ isDewormed: true } as any);
      expect(animal.isDewormed).toBe(true);

      animal.isDewormed = false;
      expect(animal.isDewormed).toBe(false);

      expect(spyValidate).toHaveBeenCalledTimes(2);
    });

    test('isNeutered getter and setter', () => {
      const animal = StubAnimal.create({ isNeutered: true } as any);
      expect(animal.isNeutered).toBe(true);

      animal.isNeutered = false;
      expect(animal.isNeutered).toBe(false);

      expect(spyValidate).toHaveBeenCalledTimes(2);
    });

    test('isSpecialNeeds getter and setter', () => {
      const animal = StubAnimal.create({ isSpecialNeeds: true } as any);
      expect(animal.isSpecialNeeds).toBe(true);

      animal.isSpecialNeeds = false;
      expect(animal.isSpecialNeeds).toBe(false);

      expect(spyValidate).toHaveBeenCalledTimes(2);
    });

    test('status getter and setter', () => {
      const animal = StubAnimal.create({
        status: AnimalStatus.create('adopted'),
      } as any);
      expect(animal.status).toEqual(AnimalStatus.create('adopted'));

      animal.status = AnimalStatus.create('available');
      expect(animal.status).toEqual(AnimalStatus.create('available'));

      expect(spyValidate).toHaveBeenCalledTimes(2);
    });
  });
});
