import { ValidationError } from '@core/enterprise/errors/validation.error';
import { CPF } from './cpf.vo';

describe('CPF ValueObject', () => {
  test('valid cases', () => {
    const arrange = [
      {
        value: '169.168.120-28',
        expected: '16916812028',
      },
      {
        value: '17122561062',
        expected: '17122561062',
      },
      {
        value: 'AB Q 17122561062 CD      ',
        expected: '17122561062',
      },
    ];

    arrange.forEach((arr) => {
      const cpf = CPF.create(arr.value);
      expect(cpf.value).toBe(arr.expected);
    });
  });

  test('invalid cases', () => {
    const arrange = [
      null,
      undefined,
      '',
      12345678909,
      '12345678',
      '11111111111',
      '12345678908',
    ];

    arrange.forEach((arr) => {
      expect(() => CPF.create(arr as any)).toThrow(ValidationError);
    });
  });

  it('should return a formatted string with the CPF number', () => {
    const cpfString = '12345678909';

    const cpf = CPF.create(cpfString);

    const formattedCpf = cpf.format();

    expect(formattedCpf).toBe('123.456.789-09');
  });

  it('should return true when calling equals() method on one CPF object with the other CPF object as argument', () => {
    const cpfString = '12345678909';

    const cpf1 = CPF.create(cpfString);
    const cpf2 = CPF.create(cpfString);

    const result = cpf1.equals(cpf2);

    expect(result).toBe(true);
  });
});
