import { UseCaseError } from '@core/application/errors/use-case.error';

export class InterestAlreadyDemonstratedError
  extends Error
  implements UseCaseError
{
  constructor(userIdentifier: string, animalIdentifier: string) {
    super(
      `User "${userIdentifier}" already demonstrated interest in the animal "${animalIdentifier}"`,
    );
  }
}
