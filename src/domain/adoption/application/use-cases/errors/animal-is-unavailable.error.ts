import { UseCaseError } from '@core/application/errors/use-case.error';

export class AnimalIsUnavailableError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Animal "${identifier}" is unavailable`);
  }
}
