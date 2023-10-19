import { Notification } from '../entities/notification';
import { NotificationValidatorFactory } from './notification.validator';

describe('NotificationValidator', () => {
  describe('create', () => {
    beforeEach(() => {
      vi.spyOn(Notification, 'validate').mockImplementation(() => true);
    });

    test('title', () => {
      const arrange = [
        {
          data: { title: undefined },
          expected: {
            title: {
              errors: ['Required'],
            },
          },
        },
        {
          data: { title: null },
          expected: {
            title: {
              errors: ['Expected string, received null'],
            },
          },
        },
        {
          data: { title: '' },
          expected: {
            title: {
              errors: ['String must contain at least 3 character(s)'],
            },
          },
        },
        {
          data: { title: 'ab' },
          expected: {
            title: {
              errors: ['String must contain at least 3 character(s)'],
            },
          },
        },
        {
          data: { title: 'a'.repeat(256) },
          expected: {
            title: {
              errors: ['String must contain at most 255 character(s)'],
            },
          },
        },
      ];

      arrange.forEach((arr) => {
        const sut = Notification.create(arr.data as any);
        const validator = NotificationValidatorFactory.create();
        validator.validate(sut);

        expect(validator.errors?.title).toEqual(arr.expected.title);
      });
    });

    test('redirectToUrl', () => {
      const arrange = [
        {
          data: { redirectToUrl: undefined },
          expected: {
            redirectToUrl: {
              errors: ['Required'],
            },
          },
        },
        {
          data: { redirectToUrl: null },
          expected: {
            redirectToUrl: {
              errors: ['Expected string, received null'],
            },
          },
        },
        {
          data: { redirectToUrl: '' },
          expected: {
            redirectToUrl: {
              errors: ['String must contain at least 3 character(s)'],
            },
          },
        },
        {
          data: { redirectToUrl: 'ab' },
          expected: {
            redirectToUrl: {
              errors: ['String must contain at least 3 character(s)'],
            },
          },
        },
        {
          data: { redirectToUrl: 'a'.repeat(256) },
          expected: {
            redirectToUrl: {
              errors: ['String must contain at most 255 character(s)'],
            },
          },
        },
      ];

      arrange.forEach((arr) => {
        const sut = Notification.create(arr.data as any);
        const validator = NotificationValidatorFactory.create();
        validator.validate(sut);

        expect(validator.errors?.redirectToUrl).toEqual(
          arr.expected.redirectToUrl,
        );
      });
    });

    test('sentAt', () => {
      const arrange = [
        {
          data: { sentAt: '' },
          expected: {
            sentAt: {
              errors: ['Expected date, received string'],
            },
          },
        },
        {
          data: { sentAt: 123 },
          expected: {
            sentAt: {
              errors: ['Expected date, received number'],
            },
          },
        },
        {
          data: { sentAt: true },
          expected: {
            sentAt: {
              errors: ['Expected date, received boolean'],
            },
          },
        },
      ];

      arrange.forEach((arr) => {
        const sut = Notification.create(arr.data as any);
        const validator = NotificationValidatorFactory.create();
        validator.validate(sut);

        expect(validator.errors?.sentAt).toEqual(arr.expected.sentAt);
      });
    });

    test('readedAt', () => {
      const arrange = [
        {
          data: { readedAt: '' },
          expected: {
            readedAt: {
              errors: ['Expected date, received string'],
            },
          },
        },
        {
          data: { readedAt: 123 },
          expected: {
            readedAt: {
              errors: ['Expected date, received number'],
            },
          },
        },
        {
          data: { readedAt: true },
          expected: {
            readedAt: {
              errors: ['Expected date, received boolean'],
            },
          },
        },
      ];

      arrange.forEach((arr) => {
        const sut = Notification.create(arr.data as any);
        const validator = NotificationValidatorFactory.create();
        validator.validate(sut);

        expect(validator.errors?.readedAt).toEqual(arr.expected.readedAt);
      });
    });
  });
});
