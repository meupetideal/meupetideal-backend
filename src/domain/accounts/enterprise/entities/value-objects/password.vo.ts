import { ValidationError } from '@core/enterprise/errors/validation.error';
import { ValueObject } from '@core/enterprise/value-object';

export class Password extends ValueObject<string> {
  public static create(value: string): Password {
    Password.validate(value);
    return new Password(value);
  }

  public equals(vo: Password): boolean {
    return vo.value === this.value;
  }

  public static validate(value: string): void {
    if (typeof value !== 'string') {
      throw new ValidationError('Invalid Password');
    }

    const hasNumbers = /\d/.test(value);
    const hasLetters = /[A-Za-z]/.test(value);
    const hasSixChars = value.length >= 6;

    if (!hasNumbers || !hasLetters || !hasSixChars) {
      throw new ValidationError('Weak Password');
    }
  }
}
