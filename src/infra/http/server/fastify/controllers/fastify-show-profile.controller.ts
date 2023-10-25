import { Controller } from '@core/infra/controller';
import { ShowProfileUseCase } from '@domain/accounts/application/use-cases/show-profile.use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpUserPresenter } from 'src/infra/http/presenters/http-user.presenter';
import { container } from 'tsyringe';

export class FastifyShowProfileController implements Controller {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.id;

    const useCase = container.resolve(ShowProfileUseCase);

    const output = await useCase.execute({
      userId,
    });

    return reply.send(HttpUserPresenter.toHttp(output.user));
  }
}
