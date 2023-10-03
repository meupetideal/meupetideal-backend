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

    test('cpf', () => {
      const arrange = [
        {
          data: { cpf: undefined },
          expected: {
            cpf: {
              errors: ['Required'],
            },
          },
        },
        {
          data: { cpf: null },
          expected: {
            cpf: {
              errors: ['Expected string, received null'],
            },
          },
        },
        {
          data: { cpf: '12345678900' },
          expected: {
            cpf: {
              errors: ['String must be a valid CPF'],
            },
          },
        },
      ];

      arrange.forEach((arr) => {
        const sut = User.create(arr.data as any);
        const validator = UserValidatorFactory.create();
        validator.validate(sut);

        expect(validator.errors?.cpf).toEqual(arr.expected.cpf);
      });
    });

    test('email', () => {
      const arrange = [
        {
          data: { email: undefined },
          expected: {
            email: {
              errors: ['Required'],
            },
          },
        },
        {
          data: { email: null },
          expected: {
            email: {
              errors: ['Expected string, received null'],
            },
          },
        },
        {
          data: { email: 'non email' },
          expected: {
            email: {
              errors: ['Invalid email'],
            },
          },
        },
      ];

      arrange.forEach((arr) => {
        const sut = User.create(arr.data as any);
        const validator = UserValidatorFactory.create();
        validator.validate(sut);

        expect(validator.errors?.email).toEqual(arr.expected.email);
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

    test('birthday', () => {
      const arrange = [
        {
          data: { birthday: undefined },
          expected: {
            birthday: {
              errors: ['Required'],
            },
          },
        },
        {
          data: { birthday: null },
          expected: {
            birthday: {
              errors: ['Expected date, received null'],
            },
          },
        },
        {
          data: { birthday: new Date('2020-01-01') },
          expected: {
            birthday: {
              errors: ['User must be at least 18 years old'],
            },
          },
        },
      ];

      arrange.forEach((arr) => {
        const sut = User.create(arr.data as any);
        const validator = UserValidatorFactory.create();
        validator.validate(sut);

        expect(validator.errors?.birthday).toEqual(arr.expected.birthday);
      });
    });

    test('phoneNumber', () => {
      const arrange = [
        {
          data: { phoneNumber: undefined },
          expected: {
            phoneNumber: {
              errors: ['Required'],
            },
          },
        },
        {
          data: { phoneNumber: null },
          expected: {
            phoneNumber: {
              errors: ['Expected string, received null'],
            },
          },
        },
        {
          data: { phoneNumber: '9629613883' },
          expected: {
            phoneNumber: {
              errors: ['String must contain exactly 14 character(s)'],
            },
          },
        },
        {
          data: { phoneNumber: 'qweasdzxcrfvtg' },
          expected: {
            phoneNumber: {
              errors: ['String must be a valid phone number'],
            },
          },
        },
      ];

      arrange.forEach((arr) => {
        const sut = User.create(arr.data as any);
        const validator = UserValidatorFactory.create();
        validator.validate(sut);

        expect(validator.errors?.phoneNumber).toEqual(arr.expected.phoneNumber);
      });
    });
  });
});
