import { container } from 'tsyringe';
import { FastifyReply, FastifyRequest } from 'fastify';

import { FetchAvailableAnimalsUseCase } from '@domain/adoption/application/use-cases/fetch-available-animals.use-case';
import { HttpAnimalPresenter } from 'src/infra/http/presenters/http-animal.presenter';

export class FastifyFetchAvailableAnimalsController {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const { page, perPage } = request.query as any;

    const useCase = container.resolve(FetchAvailableAnimalsUseCase);

    const output = await useCase.execute({
      page: Number(page),
      perPage: Number(perPage),
    });

    return reply.send({
      ...output,
      items: output.items.map((animal) => HttpAnimalPresenter.toHttp(animal)),
    });
  }
}
