import { ValidationError } from '@core/enterprise/errors/validation.error';
import { Country } from './country.vo';

describe('Country ValueObject', () => {
  test('valid cases', () => {
    const arrange = [
      {
        value: 'br',
        expected: 'br',
      },
      {
        value: 'us',
        expected: 'us',
      },
      {
        value: 'BR',
        expected: 'br',
      },
    ];

    arrange.forEach((arr) => {
      const country = Country.create(arr.value);
      expect(country.value).toBe(arr.expected);
    });
  });

  test('invalid cases', () => {
    const arrange = [null, undefined, 123, '', 'ar', 'brasil'];

    arrange.forEach((arr) => {
      expect(() => Country.create(arr as any)).toThrow(ValidationError);
    });
  });

  it('should return true when calling equals() method on one Country object with the other Country object as argument', () => {
    const countryString = 'br';

    const country1 = Country.create(countryString);
    const country2 = Country.create(countryString);

    const result = country1.equals(country2);
    expect(result).toBe(true);
  });
});
