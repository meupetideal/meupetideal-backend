import { ValidationError } from '@core/enterprise/errors/validation.error';
import { Controller } from '@core/infra/controller';
import { UpdateUserAvatarUseCase } from '@domain/accounts/application/use-cases/update-user-avatar.use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpStoragePresenter } from 'src/infra/http/presenters/http-storage.presenter';
import { container } from 'tsyringe';

export class FastifyUpdateUserAvatarController implements Controller {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.id;
    const file = await request.file();

    if (!file) {
      throw new ValidationError('File not found');
    }

    const useCase = container.resolve(UpdateUserAvatarUseCase);

    const output = await useCase.execute({
      userId,
      body: await file.toBuffer(),
      fileName: file.filename,
      fileType: file.mimetype,
    });

    return reply.send({
      avatarUrl: HttpStoragePresenter.toHttp(output.avatarUrl),
    });
  }
}
