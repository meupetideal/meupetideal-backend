import { UseCase } from '@core/application/use-case';
import { StorageGateway } from '@core/application/gateways/storage.gateway';
import { inject, injectable } from 'tsyringe';
import { UsersRepository } from '../repositories/users.repository';
import { InvalidAvatarTypeError } from './errors/invalid-avatar-type.error';
import { InvalidAvatarSizeError } from './errors/invalid-avatar-size.error';
import { UsersService } from '../services/users.service';

type Input = {
  userId: string;
  fileName: string;
  fileType: string;
  body: Buffer;
};

type Output = {
  avatarUrl: string;
};

@injectable()
export class UpdateUserAvatarUseCase implements UseCase<Input, Output> {
  private readonly MAX_FILE_SIZE = 1 * 1024 * 1024;

  constructor(
    @inject('StorageGateway')
    private storage: StorageGateway,
    @inject('UsersService')
    private usersService: UsersService,
    @inject('UsersRepository')
    private usersRepository: UsersRepository,
  ) {}

  public async execute({
    userId,
    fileName,
    fileType,
    body,
  }: Input): Promise<Output> {
    const user = await this.usersService.getUser(userId);

    if (!/^(image\/(jpeg|png))$/.test(fileType)) {
      throw new InvalidAvatarTypeError(fileType);
    }

    if (body.byteLength > this.MAX_FILE_SIZE) {
      throw new InvalidAvatarSizeError(body.byteLength, this.MAX_FILE_SIZE);
    }

    const { url: avatarUrl } = await this.storage.upload({
      fileName,
      fileType,
      body,
    });

    if (user.avatarUrl) {
      await this.storage.delete(user.avatarUrl);
    }

    user.avatarUrl = avatarUrl;

    await this.usersRepository.save(user);

    return {
      avatarUrl,
    };
  }
}
