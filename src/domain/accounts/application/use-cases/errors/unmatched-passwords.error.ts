import { UseCaseError } from '@core/application/errors/use-case.error';

export class UnmatchedPasswordsError extends UseCaseError {
  constructor() {
    super('Passwords are not matched', 400);
  }
}
