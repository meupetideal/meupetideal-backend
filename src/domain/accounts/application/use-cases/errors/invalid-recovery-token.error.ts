import { UseCaseError } from '@core/application/errors/use-case.error';

export class InvalidRecoveryTokenError extends UseCaseError {
  constructor() {
    super('Token are not valid', 400);
  }
}
