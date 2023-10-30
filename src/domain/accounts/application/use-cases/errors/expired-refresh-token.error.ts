import { UseCaseError } from '@core/application/errors/use-case.error';

export class ExpiredRefreshTokenError extends UseCaseError {
  constructor() {
    super('Refresh token has expired', 400);
  }
}
