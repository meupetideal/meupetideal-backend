import { DomainError } from '@core/enterprise/errors/domain.error';

export class InvalidAnimalSpeciesError extends Error implements DomainError {
  constructor(identifier: string) {
    super(`Invalid animal species called "${identifier}"`);
  }
}
