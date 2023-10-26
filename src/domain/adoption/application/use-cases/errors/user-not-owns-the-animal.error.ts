import { UseCaseError } from '@core/application/errors/use-case.error';

export class UserNotOwnsTheAnimalError extends UseCaseError {
  constructor(userIdentifier: string, animalIdentifier: string) {
    super(
      `User "${userIdentifier}" does not own the animal "${animalIdentifier}"`,
      403,
    );
  }
}
