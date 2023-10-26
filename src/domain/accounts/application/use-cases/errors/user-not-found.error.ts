import { UseCaseError } from '@core/application/errors/use-case.error';

export class UserNotFoundError extends UseCaseError {
  constructor(identifier: string) {
    super(`User "${identifier}" was not found`, 404);
  }
}
