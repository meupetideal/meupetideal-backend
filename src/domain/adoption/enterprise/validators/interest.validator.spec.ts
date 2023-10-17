import { Interest } from '../entities/interest';
import { InterestValidatorFactory } from './interest.validator';

describe('InterestValidator', () => {
  describe('create', () => {
    beforeEach(() => {
      vi.spyOn(Interest, 'validate').mockImplementation(() => true);
    });

    test('expressedAt', () => {
      const arrange = [
        {
          data: { expressedAt: undefined },
          expected: {
            expressedAt: {
              errors: ['Required'],
            },
          },
        },
        {
          data: { expressedAt: null },
          expected: {
            expressedAt: {
              errors: ['Expected date, received null'],
            },
          },
        },
        {
          data: { expressedAt: 'ab' },
          expected: {
            expressedAt: {
              errors: ['Expected date, received string'],
            },
          },
        },
      ];

      arrange.forEach((arr) => {
        const validator = InterestValidatorFactory.create();
        validator.validate(arr.data);

        expect(validator.errors?.expressedAt).toEqual(arr.expected.expressedAt);
      });
    });
  });
});
