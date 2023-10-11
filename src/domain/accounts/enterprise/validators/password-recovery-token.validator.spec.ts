import { PasswordRecoveryToken } from '../entities/password-recovery-token';
import { PasswordRecoveryTokenValidatorFactory } from './password-recovery-token.validator';

describe('PasswordRecoveryTokenValidator', () => {
  beforeAll(() => {
    vi.spyOn(PasswordRecoveryToken, 'validate').mockImplementation(() => true);
  });

  describe('create', () => {
    test('userId', () => {
      const arrange = [
        {
          data: { userId: undefined },
          expected: {
            userId: {
              errors: ['Required'],
            },
          },
        },
        {
          data: { userId: null },
          expected: {
            userId: {
              errors: ['Expected string, received null'],
            },
          },
        },
        {
          data: { userId: '' },
          expected: {
            userId: {
              errors: ['Invalid uuid'],
            },
          },
        },
        {
          data: { userId: 'some-invalid-uuid' },
          expected: {
            userId: {
              errors: ['Invalid uuid'],
            },
          },
        },
      ];

      arrange.forEach((arr) => {
        const sut = PasswordRecoveryToken.create(arr.data as any);
        const validator = PasswordRecoveryTokenValidatorFactory.create();
        validator.validate(sut);

        expect(validator.errors?.userId).toEqual(arr.expected.userId);
      });
    });

    test('token', () => {
      const arrange = [
        {
          data: { token: undefined },
          expected: {
            token: {
              errors: ['Required'],
            },
          },
        },
        {
          data: { token: null },
          expected: {
            token: {
              errors: ['Expected string, received null'],
            },
          },
        },
        {
          data: { token: '' },
          expected: {
            token: {
              errors: ['Invalid uuid'],
            },
          },
        },
        {
          data: { token: 'some-invalid-uuid' },
          expected: {
            token: {
              errors: ['Invalid uuid'],
            },
          },
        },
      ];

      arrange.forEach((arr) => {
        const sut = PasswordRecoveryToken.create(arr.data as any);
        const validator = PasswordRecoveryTokenValidatorFactory.create();
        validator.validate(sut);

        expect(validator.errors?.token).toEqual(arr.expected.token);
      });
    });

    test('expiresAt', () => {
      const arrange = [
        {
          data: { expiresAt: 'non date' },
          expected: {
            expiresAt: {
              errors: ['Expected date, received string'],
            },
          },
        },
        {
          data: { expiresAt: 123 },
          expected: {
            expiresAt: {
              errors: ['Expected date, received number'],
            },
          },
        },
      ];

      arrange.forEach((arr) => {
        const sut = PasswordRecoveryToken.create(arr.data as any);
        const validator = PasswordRecoveryTokenValidatorFactory.create();
        validator.validate(sut);

        expect(validator.errors?.expiresAt).toEqual(arr.expected.expiresAt);
      });
    });
  });
});
