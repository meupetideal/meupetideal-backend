import { ValidationError } from '@core/enterprise/errors/validation.error';
import { ValueObject } from '@core/enterprise/value-object';

export class Country extends ValueObject<string> {
  private static readonly validCountries = ['br', 'us'];

  public static create(value: string): Country {
    const country = Country.validate(value);
    return new Country(country);
  }

  public equals(valueObject: ValueObject<string>): boolean {
    return this.value === valueObject.value;
  }

  public static validate(value: string): string {
    if (typeof value !== 'string') {
      throw new ValidationError('Country is invalid');
    }

    const country = value.toLowerCase();
    if (!this.validCountries.includes(country)) {
      throw new ValidationError('Country is invalid');
    }

    return country;
  }

  public format(): string {
    return this.value.toUpperCase();
  }
}
