import { UseCaseError } from '@core/application/errors/use-case.error';

export class UnmatchedPasswordsError extends Error implements UseCaseError {
  constructor() {
    super('Passwords are not matched');
  }
}
