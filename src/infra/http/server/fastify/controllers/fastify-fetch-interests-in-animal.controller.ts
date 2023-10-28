import { z } from 'zod';
import { container } from 'tsyringe';
import { FastifyReply, FastifyRequest } from 'fastify';

import { FetchInterestsInAnimalUseCase } from '@domain/adoption/application/use-cases/fetch-interests-in-animal.use-case';
import { HttpInterestPresenter } from 'src/infra/http/presenters/http-interest.presenter';
import { Controller } from '@core/infra/controller';
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation.pipe';

const paramsSchema = z.object({
  animalId: z.string().uuid(),
});

type ParamsSchema = z.infer<typeof paramsSchema>;

export class FastifyFetchInterestsInAnimalController implements Controller {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.id;

    const validationPipe = new ZodValidationPipe<ParamsSchema>(paramsSchema);
    const { animalId } = validationPipe.transform(request.params);

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
