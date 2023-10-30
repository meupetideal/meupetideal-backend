import { Validator } from '@core/enterprise/validator';
import { z } from 'zod';

const refreshTokenSchema = z.object({
  expiresAt: z.date(),
});

type RefreshTokenSchema = z.infer<typeof refreshTokenSchema>;

class RefreshTokenValidator extends Validator<RefreshTokenSchema> {
  protected schema = refreshTokenSchema;
}

export class RefreshTokenValidatorFactory {
  static create() {
    return new RefreshTokenValidator();
  }
}
