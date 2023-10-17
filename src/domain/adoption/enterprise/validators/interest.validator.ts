import { z } from 'zod';
import { Validator } from '@core/enterprise/validator';

const interestSchema = z.object({
  expressedAt: z.date(),
});

type InterestSchema = z.infer<typeof interestSchema>;

class InterestValidator extends Validator<InterestSchema> {
  protected schema = interestSchema;
}

export class InterestValidatorFactory {
  static create() {
    return new InterestValidator();
  }
}
