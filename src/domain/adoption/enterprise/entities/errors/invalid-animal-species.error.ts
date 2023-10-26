import { DomainError } from '@core/enterprise/errors/domain.error';

export class InvalidAnimalSpeciesError extends DomainError {
  constructor(identifier: string) {
    super(`Invalid animal species called "${identifier}"`, 422);
  }
}
