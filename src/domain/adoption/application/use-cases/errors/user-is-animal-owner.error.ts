import { UseCaseError } from '@core/application/errors/use-case.error';

export class UserIsAnimalOwnerError extends Error implements UseCaseError {
  constructor(userIdentifier: string, animalIdentifier: string) {
    super(
      `User "${userIdentifier}" is the owner of the animal "${animalIdentifier}"`,
    );
  }
}
