import { Validator } from '@core/enterprise/validator';
import { z } from 'zod';

const userSchema = z.object({
  name: z.string().min(3).max(50),
  hashedPassword: z.string(),
});

type UserSchema = z.infer<typeof userSchema>;

class UserValidator extends Validator<UserSchema> {
  protected schema = userSchema;
}

export class UserValidatorFactory {
  static create() {
    return new UserValidator();
  }
}
