import { UseCaseError } from '@core/application/errors/use-case.error';

export class UserNotFoundError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`User "${identifier}" was not found`);
  }
}
