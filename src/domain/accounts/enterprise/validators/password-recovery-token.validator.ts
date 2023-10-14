import { Validator } from '@core/enterprise/validator';
import { z } from 'zod';

const passwordRecoveryTokenSchema = z.object({
  userId: z.string().uuid(),
  token: z.string().uuid(),
  expiresAt: z.date(),
});

type PasswordRecoveryTokenSchema = z.infer<typeof passwordRecoveryTokenSchema>;

class PasswordRecoveryTokenValidator extends Validator<PasswordRecoveryTokenSchema> {
  protected schema = passwordRecoveryTokenSchema;
}

export class PasswordRecoveryTokenValidatorFactory {
  static create() {
    return new PasswordRecoveryTokenValidator();
  }
}
