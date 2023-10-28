import { ValidationError } from '@core/enterprise/errors/validation.error';
import { Birthday } from './birthday.vo';

describe('Birthday ValueObject', () => {
  beforeAll(() => {
    vi.spyOn(global.Date, 'now').mockImplementation(() =>
      new Date(2023, 7, 26, 15).getTime(),
    );
  });

  afterAll(() => {
    vi.restoreAllMocks();
  });

  test('valid cases', () => {
    const arrange = [
      new Date(2005, 7, 26, 14, 59, 59, 999),
      new Date(2004, 7, 26, 10),
      new Date(2003, 7, 26, 10),
    ];

    arrange.forEach((arr) => {
      const birthday = Birthday.create(arr);
      expect(birthday.value).toBe(arr);
    });
  });

  test('invalid cases', () => {
    const arrange = [
      null,
      undefined,
      '',
      12345678909,
      new Date(2023, 7, 26, 15),
      new Date(2005, 11, 26, 16),
      new Date(),
    ];

    arrange.forEach((arr) => {
      expect(() => Birthday.create(arr as any)).toThrow(ValidationError);
    });
  });

  it('should return true when calling equals() method on one Birthday object with the other Birthday object as argument', () => {
    const birthdayValue = new Date(2005, 7, 26, 14, 59, 59, 999);

    const birthday1 = Birthday.create(birthdayValue);
    const birthday2 = Birthday.create(birthdayValue);

    const result = birthday1.equals(birthday2);

    expect(result).toBe(true);
  });
});
