import { UseCaseError } from '@core/application/errors/use-case.error';

export class InvalidAvatarTypeError extends Error implements UseCaseError {
  constructor(type: string) {
    super(`File type "${type}" is not valid.`);
  }
}
