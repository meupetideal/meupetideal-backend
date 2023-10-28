import { container } from 'tsyringe';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { ShowAnimalDetailsUseCase } from '@domain/adoption/application/use-cases/show-animal-details.use-case';
import { HttpAnimalPresenter } from 'src/infra/http/presenters/http-animal.presenter';
import { Controller } from '@core/infra/controller';
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation.pipe';

const paramsSchema = z.object({
  animalId: z.string().uuid(),
});

type ParamsSchema = z.infer<typeof paramsSchema>;

export class FastifyShowAnimalDetailsController implements Controller {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const validationPipe = new ZodValidationPipe<ParamsSchema>(paramsSchema);
    const { animalId } = validationPipe.transform(request.params);

    const useCase = container.resolve(ShowAnimalDetailsUseCase);

    const output = await useCase.execute({
      animalId,
    });

    return reply.send({ animal: HttpAnimalPresenter.toHttp(output.animal) });
  }
}
