import { Controller } from '@core/infra/controller';
import { UpdateUserAvatarUseCase } from '@domain/accounts/application/use-cases/update-user-avatar.use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';

export class FastifyUpdateUserAvatarController implements Controller {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.id;
    const file = await request.file({
      limits: {
        fileSize: 1024 * 1024 * 1,
        files: 1,
      },
    });

    if (!file) {
      return reply.status(400).send({
        message: 'File not found',
      });
    }

    const useCase = container.resolve(UpdateUserAvatarUseCase);

    const output = await useCase.execute({
      userId,
      body: await file.toBuffer(),
      fileName: file.filename,
      fileType: file.mimetype,
    });

    return reply.send(output);
  }
}