import { ValidationError } from '@core/enterprise/errors/validation.error';
import { Password } from './password.vo';

describe('Password ValueObject', () => {
  test('valid cases', () => {
    const arrange = [
      '123456asd',
      '123456789a',
      'asd3fghj21kl',
      '1234gf',
      '#@!asd$%3&4*()',
    ];

    arrange.forEach((arr) => {
      const password = Password.create(arr);
      expect(password.value).toBe(arr);
    });
  });

  test('invalid cases', () => {
    expect(() => Password.create(null as any)).toThrow(ValidationError);
    expect(() => Password.create(undefined as any)).toThrow(ValidationError);

    const arrange = ['', 12345678909, '12345', '123456', 'abcde', 'abcdef'];

    arrange.forEach((arr) => {
      expect(() => Password.create(arr as any)).toThrow(ValidationError);
    });
  });

  it('should return true when calling equals() method on one Password object with the other Password object as argument', () => {
    const passwordString = 'asd3fghj21kl';

    const password1 = Password.create(passwordString);
    const password2 = Password.create(passwordString);

    const result = password1.equals(password2);
    expect(result).toBe(true);
  });
});
