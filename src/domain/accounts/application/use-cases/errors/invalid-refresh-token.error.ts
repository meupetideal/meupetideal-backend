import { UseCaseError } from '@core/application/errors/use-case.error';

export class InvalidRefreshTokenError extends UseCaseError {
  constructor() {
    super('Refresh Token are not valid', 400);
  }
}
