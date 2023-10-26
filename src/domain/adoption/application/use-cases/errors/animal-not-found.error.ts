import { UseCaseError } from '@core/application/errors/use-case.error';

export class AnimalNotFoundError extends UseCaseError {
  constructor(identifier: string) {
    super(`Animal "${identifier}" not found`, 404);
  }
}
