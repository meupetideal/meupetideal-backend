import { UseCaseError } from '@core/application/errors/use-case.error';

export class InvalidRecoveryTokenError extends Error implements UseCaseError {
  constructor() {
    super('Token are not valid');
  }
}
