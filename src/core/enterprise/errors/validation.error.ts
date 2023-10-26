import { AppError } from '@core/application/errors/app.error';
import { FieldsErrors } from '../validator';

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400);
  }
}

export class EntityValidationError extends AppError {
  constructor(
    public error: FieldsErrors | null,
    message = 'Validation Error',
  ) {
    super(message, 400);
  }
}
