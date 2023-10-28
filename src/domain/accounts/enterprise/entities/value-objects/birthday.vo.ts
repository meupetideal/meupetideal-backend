import { ValidationError } from '@core/enterprise/errors/validation.error';
import { ValueObject } from '@core/enterprise/value-object';

export class Birthday extends ValueObject<Date> {
  public static create(value: Date): Birthday {
    Birthday.validate(value);
    return new Birthday(value);
  }

  public equals(vo: Birthday): boolean {
    return vo.value === this.value;
  }

  public static validate(value: Date): void {
    if (!(value instanceof Date)) {
      throw new ValidationError('Invalid Birthday');
    }

    const today = new Date();
    const birthday = new Date(value);
    const diff = today.getTime() - birthday.getTime();
    const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));

    if (age < 18) {
      throw new ValidationError('Invalid Birthday');
    }
  }
}
