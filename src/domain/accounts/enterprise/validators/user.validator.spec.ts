import { User } from '../entities/user';
import { UserValidatorFactory } from './user.validator';

describe('UserValidator', () => {
  beforeAll(() => {
    vi.spyOn(User, 'validate').mockImplementation(() => true);
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
        const sut = User.create(arr.data as any);
        const validator = UserValidatorFactory.create();
        validator.validate(sut);

        expect(validator.errors?.name).toEqual(arr.expected.name);
      });
    });

    test('hashedPassword', () => {
      const arrange = [
        {
          data: { hashedPassword: undefined },
          expected: {
            hashedPassword: {
              errors: ['Required'],
            },
          },
        },
        {
          data: { hashedPassword: null },
          expected: {
            hashedPassword: {
              errors: ['Expected string, received null'],
            },
          },
        },
      ];

      arrange.forEach((arr) => {
        const sut = User.create(arr.data as any);
        const validator = UserValidatorFactory.create();
        validator.validate(sut);

        expect(validator.errors?.hashedPassword).toEqual(
          arr.expected.hashedPassword,
        );
      });
    });
  });
});
