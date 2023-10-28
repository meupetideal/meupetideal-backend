import { z } from 'zod';
import { container } from 'tsyringe';
import { FastifyReply, FastifyRequest } from 'fastify';

import { DemonstrateInterestInAnimalUseCase } from '@domain/adoption/application/use-cases/demonstrate-interest-in-animal.use-case';
import { HttpInterestPresenter } from 'src/infra/http/presenters/http-interest.presenter';
import { Controller } from '@core/infra/controller';
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation.pipe';

const paramsSchema = z.object({
  animalId: z.string().uuid(),
});

type ParamsSchema = z.infer<typeof paramsSchema>;

export class FastifyDemonstrateInterestInAnimalController
  implements Controller
{
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.id;

    const validationPipe = new ZodValidationPipe<ParamsSchema>(paramsSchema);
    const { animalId } = validationPipe.transform(request.params);

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
