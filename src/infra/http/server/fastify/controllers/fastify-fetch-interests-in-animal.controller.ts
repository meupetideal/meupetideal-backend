import { container } from 'tsyringe';
import { FastifyReply, FastifyRequest } from 'fastify';

import { FetchInterestsInAnimalUseCase } from '@domain/adoption/application/use-cases/fetch-interests-in-animal.use-case';
import { HttpInterestPresenter } from 'src/infra/http/presenters/http-interest.presenter';
import { Controller } from '@core/infra/controller';

export class FastifyFetchInterestsInAnimalController implements Controller {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.id;
    const { animalId } = request.params as any;

    const useCase = container.resolve(FetchInterestsInAnimalUseCase);

    const output = await useCase.execute({
      ownerId: userId,
      animalId,
    });

    return reply.send({
      interests: output.interests.map((interest) =>
        HttpInterestPresenter.toHttp(interest),
      ),
    });
  }
}
