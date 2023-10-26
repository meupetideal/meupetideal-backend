import { UseCaseError } from '@core/application/errors/use-case.error';

export class NotificationNotFoundError extends UseCaseError {
  constructor() {
    super(`Notification not found`, 404);
  }
}
