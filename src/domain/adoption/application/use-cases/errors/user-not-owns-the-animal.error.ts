import { UseCaseError } from '@core/application/errors/use-case.error';

export class UserNotOwnsTheAnimalError extends Error implements UseCaseError {
  constructor(userIdentifier: string, animalIdentifier: string) {
    super(
      `User "${userIdentifier}" does not own the animal "${animalIdentifier}"`,
    );
  }
}
