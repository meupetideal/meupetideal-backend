import { z } from 'zod';
import { Validator } from '@core/enterprise/validator';

const reportSchema = z.object({
  reason: z.string().min(3).max(500),
});

type ReportSchema = z.infer<typeof reportSchema>;

class ReportValidator extends Validator<ReportSchema> {
  protected schema = reportSchema;
}

export class ReportValidatorFactory {
  static create() {
    return new ReportValidator();
  }
}
