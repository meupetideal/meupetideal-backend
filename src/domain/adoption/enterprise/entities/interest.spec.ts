import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { SpyInstance } from 'vitest';
import { EntityValidationError } from '@core/enterprise/errors/validation.error';
import { Interest } from './interest';

describe('Interest Unit Tests', () => {
  test('constructor', () => {
    const spyValidate = vi.spyOn(Interest, 'validate');

    const interest = Interest.create({
      animalId: UniqueEntityId.create(),
      userId: UniqueEntityId.create(),
    });

    expect(interest).toBeDefined();
    expect(interest.id).toBeInstanceOf(UniqueEntityId);
    expect(interest.animalId).toBeInstanceOf(UniqueEntityId);
    expect(interest.userId).toBeInstanceOf(UniqueEntityId);
    expect(interest.expressedAt).toBeInstanceOf(Date);
    expect(spyValidate).toHaveBeenCalledOnce();
  });

  test('validate', () => {
    expect(() => Interest.validate({} as any)).toThrowError(
      EntityValidationError,
    );
  });

  describe('getters and setters', () => {
    let spyValidate: SpyInstance;

    beforeAll(() => {
      spyValidate = vi
        .spyOn(Interest, 'validate')
        .mockImplementation(() => true);
    });

    test('userId getter and setter', () => {
      const uniqueEntityId = UniqueEntityId.create(
        '879b18db-f2a8-4169-8c0c-d1388cb2a44b',
      );
      const interest = Interest.create({ userId: uniqueEntityId } as any);
      expect(interest.userId).toEqual(uniqueEntityId);

      const anotherUniqueEntityId = UniqueEntityId.create(
        '80b45af0-6aa8-49a4-af34-a5c3283c87f9',
      );
      interest.userId = anotherUniqueEntityId;
      expect(interest.userId).toBe(anotherUniqueEntityId);

      expect(spyValidate).toHaveBeenCalled();
    });

    test('animalId getter and setter', () => {
      const uniqueEntityId = UniqueEntityId.create(
        '879b18db-f2a8-4169-8c0c-d1388cb2a44b',
      );
      const interest = Interest.create({ animalId: uniqueEntityId } as any);
      expect(interest.animalId).toEqual(uniqueEntityId);

      const anotherUniqueEntityId = UniqueEntityId.create(
        '80b45af0-6aa8-49a4-af34-a5c3283c87f9',
      );
      interest.animalId = anotherUniqueEntityId;
      expect(interest.animalId).toBe(anotherUniqueEntityId);

      expect(spyValidate).toHaveBeenCalled();
    });

    test('expressedAt getter and setter', () => {
      const interest = Interest.create({
        expressedAt: new Date(2023, 7, 6),
      } as any);
      expect(interest.expressedAt).toEqual(new Date(2023, 7, 6));

      interest.expressedAt = new Date(2023, 7, 7);
      expect(interest.expressedAt).toEqual(new Date(2023, 7, 7));

      expect(spyValidate).toHaveBeenCalled();
    });
  });
});
