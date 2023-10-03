import { z } from 'zod';

export type FieldsErrors = {
  [field: string]: {
    errors: string[];
  };
};

export interface ValidatorFields<PropsValidated> {
  errors: FieldsErrors | null;
  validatedData: PropsValidated | null;
  validate(data: unknown): boolean;
}

export abstract class Validator<PropsValidated>
  implements ValidatorFields<PropsValidated>
{
  protected abstract schema: z.Schema<PropsValidated>;

  errors: FieldsErrors | null = null;

  validatedData: PropsValidated | null = null;

  public validate(data: unknown): boolean {
    const parsedData = this.schema.safeParse(data);

    if (parsedData.success) {
      this.validatedData = parsedData.data;
      return true;
    }

    const zodErrors = parsedData.error.flatten().fieldErrors;

    this.errors = Object.keys(zodErrors).reduce((acc, key) => {
      const fieldErrors = zodErrors[key];
      return {
        ...acc,
        [key]: {
          errors: fieldErrors,
        },
      };
    }, {});

    return false;
  }
}
