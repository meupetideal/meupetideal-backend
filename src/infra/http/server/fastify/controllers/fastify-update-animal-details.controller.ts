import { container } from 'tsyringe';
import { FastifyReply, FastifyRequest } from 'fastify';
import { z } from 'zod';

import { UpdateAnimalDetailsUseCase } from '@domain/adoption/application/use-cases/update-animal-details.use-case';
import { HttpAnimalPresenter } from 'src/infra/http/presenters/http-animal.presenter';
import { Controller } from '@core/infra/controller';
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation.pipe';

const paramsSchema = z.object({
  animalId: z.string().uuid(),
});

type ParamsSchema = z.infer<typeof paramsSchema>;

const bodySchema = z.object({
  name: z.string(),
  gender: z.string(),
  approximateAge: z.number().positive(),
  approximateWeight: z.number().positive(),
  size: z.string(),
  temperaments: z.array(z.string()),
  coatColors: z.array(z.string()),
  isVaccinated: z.boolean(),
  isDewormed: z.boolean(),
  isNeutered: z.boolean(),
  isSpecialNeeds: z.boolean(),
  breed: z.string(),
});

type BodySchema = z.infer<typeof bodySchema>;

export class FastifyUpdateAnimalDetailsController implements Controller {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const ownerId = request.user.id;

    const paramsValidationPipe = new ZodValidationPipe<ParamsSchema>(
      paramsSchema,
    );
    const { animalId } = paramsValidationPipe.transform(request.params);

    const bodyValidationPipe = new ZodValidationPipe<BodySchema>(bodySchema);
    const {
      name,
      gender,
      approximateAge,
      approximateWeight,
      size,
      temperaments,
      coatColors,
      isVaccinated,
      isDewormed,
      isNeutered,
      isSpecialNeeds,
      breed,
    } = bodyValidationPipe.transform(request.body);

    const useCase = container.resolve(UpdateAnimalDetailsUseCase);

    const output = await useCase.execute({
      animalId,
      ownerId,
      name,
      gender,
      approximateAge,
      approximateWeight,
      size,
      temperaments,
      coatColors,
      isVaccinated,
      isDewormed,
      isNeutered,
      isSpecialNeeds,
      breed,
    });

    return reply.send({ animal: HttpAnimalPresenter.toHttp(output.animal) });
  }
}
