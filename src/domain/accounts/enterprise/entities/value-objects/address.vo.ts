import { ValidationError } from '@core/enterprise/errors/validation.error';
import { ValueObject } from '@core/enterprise/value-object';
import { Country } from './country.vo';

export interface AddressProps {
  neighborhood: string;
  city: string;
  state: string;
  country: Country;
}

export class Address extends ValueObject<AddressProps> {
  public static create(value: AddressProps): Address {
    this.validate(value);
    return new Address(value);
  }

  public equals(address: Address): boolean {
    return (
      this.value.neighborhood === address.value.neighborhood &&
      this.value.city === address.value.city &&
      this.value.state === address.value.state &&
      this.value.country.equals(address.value.country)
    );
  }

  public static validate(data: AddressProps): void {
    const validateFields = ['neighborhood', 'city', 'state'];
    validateFields.forEach((field) => {
      if (typeof data[field] !== 'string') {
        throw new ValidationError(`Invalid ${field}`);
      }
    });
  }
}
