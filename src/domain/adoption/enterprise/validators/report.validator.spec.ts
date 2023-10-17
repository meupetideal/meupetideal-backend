import { Report } from '../entities/report';
import { ReportValidatorFactory } from './report.validator';

describe('ReportValidator', () => {
  describe('create', () => {
    beforeEach(() => {
      vi.spyOn(Report, 'validate').mockImplementation(() => true);
    });

    test('reason', () => {
      const arrange = [
        {
          data: { reason: undefined },
          expected: {
            reason: {
              errors: ['Required'],
            },
          },
        },
        {
          data: { reason: null },
          expected: {
            reason: {
              errors: ['Expected string, received null'],
            },
          },
        },
        {
          data: { reason: '' },
          expected: {
            reason: {
              errors: ['String must contain at least 3 character(s)'],
            },
          },
        },
        {
          data: { reason: 'ab' },
          expected: {
            reason: {
              errors: ['String must contain at least 3 character(s)'],
            },
          },
        },
        {
          data: { reason: 'a'.repeat(551) },
          expected: {
            reason: {
              errors: ['String must contain at most 500 character(s)'],
            },
          },
        },
      ];

      arrange.forEach((arr) => {
        const sut = Report.create(arr.data as any);
        const validator = ReportValidatorFactory.create();
        validator.validate(sut);

        expect(validator.errors?.reason).toEqual(arr.expected.reason);
      });
    });
  });
});
