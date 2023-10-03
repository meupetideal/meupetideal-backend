import { Validator } from '@core/enterprise/validator';
import { isCPF, isPhone } from 'brazilian-values';
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(3).max(50),
  cpf: z.string().refine((cpf) => isCPF(cpf), 'String must be a valid CPF'),
  email: z.string().email(),
  hashedPassword: z.string(),
  birthday: z.date().refine((date) => {
    const today = new Date();
    const age = today.getFullYear() - date.getFullYear();
    return age >= 18;
  }, 'User must be at least 18 years old'),
  phoneNumber: z
    .string()
    .length(14)
    .refine(
      (phoneNumber) => isPhone(phoneNumber),
      'String must be a valid phone number',
    ),
});

type UserSchema = z.infer<typeof userSchema>;

export class UserValidator extends Validator<UserSchema> {
  protected schema = userSchema;
}

export class UserValidatorFactory {
  static create() {
    return new UserValidator();
  }
}
