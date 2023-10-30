import { UseCaseError } from '@core/application/errors/use-case.error';

export class RefreshTokenNotFoundError extends UseCaseError {
  constructor() {
    super('Refresh token not found', 404);
  }
}
