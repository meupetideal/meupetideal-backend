import { AppError } from '@core/application/errors/app.error';

export class AuthenticationTokenExpiredError extends AppError {
  constructor() {
    super('Authentication token expired.', 401);
  }
}
