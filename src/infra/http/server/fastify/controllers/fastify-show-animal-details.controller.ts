import { container } from 'tsyringe';
import { FastifyReply, FastifyRequest } from 'fastify';

import { ShowAnimalDetailsUseCase } from '@domain/adoption/application/use-cases/show-animal-details.use-case';
import { HttpAnimalPresenter } from 'src/infra/http/presenters/http-animal.presenter';
import { Controller } from '@core/infra/controller';

export class FastifyShowAnimalDetailsController implements Controller {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const { animalId } = request.params as any;

    const useCase = container.resolve(ShowAnimalDetailsUseCase);

    const output = await useCase.execute({
      animalId,
    });

    return reply.send({ animal: HttpAnimalPresenter.toHttp(output.animal) });
  }
}
