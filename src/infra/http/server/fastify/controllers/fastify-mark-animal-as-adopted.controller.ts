import { container } from 'tsyringe';
import { FastifyReply, FastifyRequest } from 'fastify';

import { MarkAnimalAsAdoptedUseCase } from '@domain/adoption/application/use-cases/mark-animal-as-adopted.use-case';
import { HttpAnimalPresenter } from 'src/infra/http/presenters/http-animal.presenter';

export class FastifyMarkAnimalAsAdoptedController {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const ownerId = request.user.id;
    const { animalId } = request.params as any;

    const useCase = container.resolve(MarkAnimalAsAdoptedUseCase);

    const output = await useCase.execute({
      animalId,
      ownerId,
    });

    return reply.send({ animal: HttpAnimalPresenter.toHttp(output.animal) });
  }
}
