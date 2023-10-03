import { z } from 'zod';
import { Validator } from './validator';

const stubSchema = z.object({
  name: z.string().min(3).max(255),
  email: z.string().email(),
});

type PropsValidated = z.infer<typeof stubSchema>;

class StubValidator extends Validator<PropsValidated> {
  protected schema = stubSchema;
}

describe('Validator', () => {
  let validator: StubValidator;

  beforeEach(() => {
    validator = new StubValidator();
  });

  it('should return true when data is valid', () => {
    const data = {
      name: 'John Doe',
      email: 'johndoe@example.com',
    };
    const result = validator.validate(data);
    expect(result).toBe(true);
  });

  it('should return false when data is invalid', () => {
    const data = {
      name: 'jo',
      email: 'not an email',
    };
    const result = validator.validate(data);
    expect(result).toBe(false);
  });

  it('should set validatedData property when data is valid', () => {
    const data = {
      name: 'John Doe',
      email: 'johndoe@example.com',
    };
    validator.validate(data);
    expect(validator.validatedData).toEqual(data);
    expect(validator.errors).toBeNull();
  });

  it('should set errors property when data is invalid', () => {
    const data = {
      name: 'Jo',
      email: 'not an email',
    };
    validator.validate(data);
    expect(validator.errors).toEqual({
      name: {
        errors: ['String must contain at least 3 character(s)'],
      },
      email: {
        errors: ['Invalid email'],
      },
    });
    expect(validator.validatedData).toBeNull();
  });
});
