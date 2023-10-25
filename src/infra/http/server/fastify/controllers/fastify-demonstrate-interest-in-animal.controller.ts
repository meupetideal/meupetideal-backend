import { container } from 'tsyringe';
import { FastifyReply, FastifyRequest } from 'fastify';

import { DemonstrateInterestInAnimalUseCase } from '@domain/adoption/application/use-cases/demonstrate-interest-in-animal.use-case';
import { HttpInterestPresenter } from 'src/infra/http/presenters/http-interest.presenter';
import { Controller } from '@core/infra/controller';

export class FastifyDemonstrateInterestInAnimalController
  implements Controller
{
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.id;
    const { animalId } = request.params as any;

    const useCase = container.resolve(DemonstrateInterestInAnimalUseCase);

    const output = await useCase.execute({
      userId,
      animalId,
    });

    return reply.send({
      interest: HttpInterestPresenter.toHttp(output.interest),
    });
  }
}
