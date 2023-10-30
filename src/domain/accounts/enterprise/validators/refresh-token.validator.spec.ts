import { RefreshToken } from '../entities/refresh-token';
import { RefreshTokenValidatorFactory } from './refresh-token.validator';

describe('RefreshTokenValidator', () => {
  beforeAll(() => {
    vi.spyOn(RefreshToken, 'validate').mockImplementation(() => true);
  });

  describe('create', () => {
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
        const sut = RefreshToken.create(arr.data as any);
        const validator = RefreshTokenValidatorFactory.create();
        validator.validate(sut);

        expect(validator.errors?.expiresAt).toEqual(arr.expected.expiresAt);
      });
    });
  });
});
