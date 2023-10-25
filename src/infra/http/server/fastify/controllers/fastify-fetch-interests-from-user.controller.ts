import { container } from 'tsyringe';
import { FastifyReply, FastifyRequest } from 'fastify';

import { FetchInterestsFromUserUseCase } from '@domain/adoption/application/use-cases/fetch-interests-from-user.use-case';
import { HttpInterestPresenter } from 'src/infra/http/presenters/http-interest.presenter';
import { Controller } from '@core/infra/controller';

export class FastifyFetchInterestsFromUserController implements Controller {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.id;

    const useCase = container.resolve(FetchInterestsFromUserUseCase);

    const output = await useCase.execute({
      userId,
    });

    return reply.send({
      interests: output.interests.map((interest) =>
        HttpInterestPresenter.toHttp(interest),
      ),
    });
  }
}
