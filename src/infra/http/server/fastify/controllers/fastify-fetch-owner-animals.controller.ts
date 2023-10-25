import { container } from 'tsyringe';
import { FastifyReply, FastifyRequest } from 'fastify';

import { FetchOwnerAnimalsUseCase } from '@domain/adoption/application/use-cases/fetch-owner-animals.use-case';
import { HttpAnimalPresenter } from 'src/infra/http/presenters/http-animal.presenter';

export class FastifyFetchOwnerAnimalsController {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const ownerId = request.user.id;

    const useCase = container.resolve(FetchOwnerAnimalsUseCase);

    const output = await useCase.execute({
      ownerId,
    });

    return reply.send({
      animals: output.animals.map((animal) =>
        HttpAnimalPresenter.toHttp(animal),
      ),
    });
  }
}
