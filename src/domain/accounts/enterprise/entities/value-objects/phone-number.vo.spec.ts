import { ValidationError } from '@core/enterprise/errors/validation.error';
import { PhoneNumber } from './phone-number.vo';

describe('PhoneNumber ValueObject', () => {
  test('valid cases', () => {
    const arrange = [
      {
        value: '21998462121',
        expected: '21998462121',
      },
      {
        value: '(21) 99846-2121',
        expected: '21998462121',
      },
      {
        value: 'AB Q 21998462121 CD      ',
        expected: '21998462121',
      },
      {
        value: '(24) 2465-1212',
        expected: '2424651212',
      },
    ];

    arrange.forEach((arr) => {
      const phoneNumber = PhoneNumber.create(arr.value);
      expect(phoneNumber.value).toBe(arr.expected);
    });
  });

  test('invalid cases', () => {
    const arrange = [
      null,
      undefined,
      '',
      12345678909,
      '12345678',
      '111111111111',
      '345678908',
    ];

    arrange.forEach((arr) => {
      expect(() => PhoneNumber.create(arr as any)).toThrow(ValidationError);
    });
  });

  it('should return a formatted string with the PhoneNumber number', () => {
    let phoneNumber = PhoneNumber.create('21998462121');
    let formattedPhoneNumber = phoneNumber.format();
    expect(formattedPhoneNumber).toBe('(21) 99846-2121');

    phoneNumber = PhoneNumber.create('2424651212');
    formattedPhoneNumber = phoneNumber.format();
    expect(formattedPhoneNumber).toBe('(24) 2465-1212');
  });

  it('should return true when calling equals() method on one PhoneNumber object with the other PhoneNumber object as argument', () => {
    const phoneNumberString = '21998462121';

    const phoneNumber1 = PhoneNumber.create(phoneNumberString);
    const phoneNumber2 = PhoneNumber.create(phoneNumberString);

    const result = phoneNumber1.equals(phoneNumber2);

    expect(result).toBe(true);
  });
});
