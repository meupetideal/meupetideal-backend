import { UseCaseError } from '@core/application/errors/use-case.error';

export class UserAlreadyExistsError extends UseCaseError {
  constructor(identifier: string) {
    super(`User "${identifier}" already exists`, 409);
  }
}
