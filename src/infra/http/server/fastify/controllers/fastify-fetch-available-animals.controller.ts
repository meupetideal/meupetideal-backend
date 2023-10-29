import { container } from 'tsyringe';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { FetchAvailableAnimalsUseCase } from '@domain/adoption/application/use-cases/fetch-available-animals.use-case';
import { HttpAnimalPresenter } from 'src/infra/http/presenters/http-animal.presenter';
import { Controller } from '@core/infra/controller';
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation.pipe';

const querysSchema = z.object({
  page: z.coerce.number().int().positive(),
  perPage: z.coerce.number().int().positive(),
  age_min: z.coerce.number().min(0).optional(),
  age_max: z.coerce.number().min(0).optional(),
  weight_min: z.coerce.number().min(0).optional(),
  weight_max: z.coerce.number().min(0).optional(),
  gender: z.string().optional(),
  species: z.string().optional(),
  sizes: z
    .string()
    .transform((v) => v.split(','))
    .optional(),
  breeds: z
    .string()
    .transform((v) => v.split(','))
    .optional(),
  coatColors: z
    .string()
    .transform((v) => v.split(','))
    .optional(),
  temperaments: z
    .string()
    .transform((v) => v.split(','))
    .optional(),
});

type QuerysSchema = z.infer<typeof querysSchema>;

export class FastifyFetchAvailableAnimalsController implements Controller {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const validationPipe = new ZodValidationPipe<QuerysSchema>(
      querysSchema as any,
    );
    const {
      page,
      perPage,
      age_min,
      age_max,
      weight_min,
      weight_max,
      gender,
      species,
      sizes,
      breeds,
      coatColors,
      temperaments,
    } = validationPipe.transform(request.query);

    const useCase = container.resolve(FetchAvailableAnimalsUseCase);

    const output = await useCase.execute({
      page,
      perPage,
      filters: {
        age: {
          min: age_min,
          max: age_max,
        },
        weight: {
          min: weight_min,
          max: weight_max,
        },
        gender,
        species,
        sizes,
        breeds,
        coatColors,
        temperaments,
      },
    });

    return reply.send({
      ...output,
      items: output.items.map((animal) => HttpAnimalPresenter.toHttp(animal)),
    });
  }
}
