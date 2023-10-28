import { ValidationError } from '@core/enterprise/errors/validation.error';
import { ValueObject } from '@core/enterprise/value-object';

export class Email extends ValueObject<string> {
  public static create(value: string): Email {
    Email.validate(value);
    return new Email(value);
  }

  public equals(vo: Email): boolean {
    return vo.value === this.value;
  }

  public static validate(value: string): void {
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!emailRegex.test(value)) {
      throw new ValidationError('Invalid Email');
    }
  }
}
