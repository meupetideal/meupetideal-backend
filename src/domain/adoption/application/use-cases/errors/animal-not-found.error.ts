import { UseCaseError } from '@core/application/errors/use-case.error';

export class AnimalNotFoundError extends Error implements UseCaseError {
  constructor(identifier: string) {
    super(`Animal "${identifier}" not found`);
  }
}
