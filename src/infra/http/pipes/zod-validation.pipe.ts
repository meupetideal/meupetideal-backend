import { EntityValidationError } from '@core/enterprise/errors/validation.error';
import { ZodSchema } from 'zod';

export class ZodValidationPipe<T> {
  constructor(private schema: ZodSchema<T>) {}

  transform(data: unknown): T {
    const output = this.schema.safeParse(data);

    if (output.success) {
      return output.data;
    }

    const zodErrors = output.error.flatten().fieldErrors;

    const errors = Object.keys(zodErrors).reduce((acc, key) => {
      const fieldErrors = zodErrors[key];
      return {
        ...acc,
        [key]: {
          errors: fieldErrors,
        },
      };
    }, {});

    throw new EntityValidationError(errors);
  }
}
