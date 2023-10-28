import { container } from 'tsyringe';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { FetchAvailableAnimalsUseCase } from '@domain/adoption/application/use-cases/fetch-available-animals.use-case';
import { HttpAnimalPresenter } from 'src/infra/http/presenters/http-animal.presenter';
import { Controller } from '@core/infra/controller';
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation.pipe';

const querysSchema = z.object({
  page: z.number().int().positive(),
  perPage: z.number().int().positive(),
});

type QuerysSchema = z.infer<typeof querysSchema>;

export class FastifyFetchAvailableAnimalsController implements Controller {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const validationPipe = new ZodValidationPipe<QuerysSchema>(querysSchema);
    const { page, perPage } = validationPipe.transform(request.query);

    const useCase = container.resolve(FetchAvailableAnimalsUseCase);

    const output = await useCase.execute({
      page,
      perPage,
    });

    return reply.send({
      ...output,
      items: output.items.map((animal) => HttpAnimalPresenter.toHttp(animal)),
    });
  }
}
