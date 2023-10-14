import { Animal, AnimalProps } from '../entities/animal';
import { AnimalValidatorFactory } from './animal.validator';

class StubAnimal extends Animal {
  public static create(props: AnimalProps) {
    return new StubAnimal(props, {});
  }
}

describe('AnimalValidator', () => {
  beforeAll(() => {
    vi.spyOn(Animal, 'validate').mockImplementation(() => true);
  });

  describe('create', () => {
    test('name', () => {
      const arrange = [
        {
          data: { name: undefined },
          expected: {
            name: {
              errors: ['Required'],
            },
          },
        },
        {
          data: { name: null },
          expected: {
            name: {
              errors: ['Expected string, received null'],
            },
          },
        },
        {
          data: { name: '' },
          expected: {
            name: {
              errors: ['String must contain at least 3 character(s)'],
            },
          },
        },
        {
          data: { name: 'ab' },
          expected: {
            name: {
              errors: ['String must contain at least 3 character(s)'],
            },
          },
        },
        {
          data: { name: 'a'.repeat(51) },
          expected: {
            name: {
              errors: ['String must contain at most 50 character(s)'],
            },
          },
        },
      ];

      arrange.forEach((arr) => {
        const sut = StubAnimal.create(arr.data as any);
        const validator = AnimalValidatorFactory.create();
        validator.validate(sut);

        expect(validator.errors?.name).toEqual(arr.expected.name);
      });
    });
  });
});
