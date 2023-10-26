import { UseCaseError } from '@core/application/errors/use-case.error';

export class WrongCredentialsError extends UseCaseError {
  constructor() {
    super('Credentials are not valid', 401);
  }
}
