import { z } from 'zod';
import { container } from 'tsyringe';
import { FastifyReply, FastifyRequest } from 'fastify';

import { MarkAnimalAsAdoptedUseCase } from '@domain/adoption/application/use-cases/mark-animal-as-adopted.use-case';
import { HttpAnimalPresenter } from 'src/infra/http/presenters/http-animal.presenter';
import { Controller } from '@core/infra/controller';
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation.pipe';

const paramsSchema = z.object({
  animalId: z.string().uuid(),
});

type ParamsSchema = z.infer<typeof paramsSchema>;

export class FastifyMarkAnimalAsAdoptedController implements Controller {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const ownerId = request.user.id;

    const validationPipe = new ZodValidationPipe<ParamsSchema>(paramsSchema);
    const { animalId } = validationPipe.transform(request.params);

    const useCase = container.resolve(MarkAnimalAsAdoptedUseCase);

    const output = await useCase.execute({
      animalId,
      ownerId,
    });

    return reply.send({ animal: HttpAnimalPresenter.toHttp(output.animal) });
  }
}
