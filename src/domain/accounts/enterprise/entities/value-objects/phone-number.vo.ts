import { ValidationError } from '@core/enterprise/errors/validation.error';
import { ValueObject } from '@core/enterprise/value-object';

export class PhoneNumber extends ValueObject<string> {
  public static create(value: string): PhoneNumber {
    const phoneNumber = PhoneNumber.validate(value);
    return new PhoneNumber(phoneNumber);
  }

  public equals(vo: PhoneNumber): boolean {
    return vo.value === this.value;
  }

  public static validate(value: string): string {
    if (typeof value !== 'string') {
      throw new ValidationError('Invalid phone number');
    }

    const phoneNumber = value.replace(/\D/g, '');
    if (phoneNumber.length < 10 || phoneNumber.length > 11) {
      throw new ValidationError('Invalid phone number');
    }
    return phoneNumber;
  }

  public format(): string {
    if (this.value.length === 10) {
      return this.value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
    }
    return this.value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }
}
