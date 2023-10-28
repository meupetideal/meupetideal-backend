import { ValidationError } from '@core/enterprise/errors/validation.error';
import { ValueObject } from '@core/enterprise/value-object';

export class CPF extends ValueObject<string> {
  public static create(value: string): CPF {
    const cpf = CPF.validate(value);
    return new CPF(cpf);
  }

  public equals(cpf: CPF): boolean {
    return cpf.value === this.value;
  }

  public static validate(value: string): string {
    if (typeof value !== 'string') {
      throw new ValidationError('Invalid CPF');
    }
    const cpf = value.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || !!cpf.match(/(\d)\1{10}/)) {
      throw new ValidationError('Invalid CPF');
    }
    const cpfNumbers = cpf.split('').map((el) => +el);
    const rest = (count: number) =>
      ((cpfNumbers
        .slice(0, count - 12)
        .reduce((sum, el, index) => sum + el * (count - index), 0) *
        10) %
        11) %
      10;
    const isValid = rest(10) === cpfNumbers[9] && rest(11) === cpfNumbers[10];

    if (!isValid) {
      throw new ValidationError('Invalid CPF');
    }

    return cpf;
  }

  public format(): string {
    return this.value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  }
}
