import { UseCaseError } from '@core/application/errors/use-case.error';

export class WrongCredentialsError extends Error implements UseCaseError {
  constructor() {
    super('Wrong credentials');
  }
}
