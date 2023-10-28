import { ValidationError } from '@core/enterprise/errors/validation.error';
import { Email } from './email.vo';

describe('Email ValueObject', () => {
  test('valid cases', () => {
    const arrange = [
      'email@example.com',
      'email@example.com.br',
      'email.sample@example.net',
    ];

    arrange.forEach((arr) => {
      const email = Email.create(arr);
      expect(email.value).toBe(arr);
    });
  });

  test('invalid cases', () => {
    const arrange = [
      null,
      undefined,
      '',
      12345678909,
      '12345678',
      '(*@!&$(*!@@!@#$.com',
      'email@.com',
      'email@.com.br',
      'email@com',
    ];

    arrange.forEach((arr) => {
      expect(() => Email.create(arr as any)).toThrow(ValidationError);
    });
  });

  it('should return true when calling equals() method on one Email object with the other Email object as argument', () => {
    const emailString = 'email@example.com';

    const email1 = Email.create(emailString);
    const email2 = Email.create(emailString);

    const result = email1.equals(email2);

    expect(result).toBe(true);
  });
});
