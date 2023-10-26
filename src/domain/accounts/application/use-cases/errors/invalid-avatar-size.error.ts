import { UseCaseError } from '@core/application/errors/use-case.error';

export class InvalidAvatarSizeError extends UseCaseError {
  constructor(fileSize: number, maxFileSize: number) {
    super(`File size "${fileSize}" is bigger than "${maxFileSize}".`, 400);
  }
}
