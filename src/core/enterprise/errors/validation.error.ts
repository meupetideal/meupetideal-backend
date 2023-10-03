import { FieldsErrors } from '../validator';

export class ValidationError extends Error {}

export class EntityValidationError extends Error {
  constructor(
    public error: FieldsErrors | null,
    message = 'Validation Error',
  ) {
    super(message);
  }
}
