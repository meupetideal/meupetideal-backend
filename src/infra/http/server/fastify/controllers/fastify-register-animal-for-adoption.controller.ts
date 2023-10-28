import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';

import { Controller } from '@core/infra/controller';
import { RegisterAnimalForAdoptionUseCase } from '@domain/adoption/application/use-cases/register-animal-for-adoption.use-case';
import { HttpAnimalPresenter } from 'src/infra/http/presenters/http-animal.presenter';
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation.pipe';

const bodySchema = z.object({
  species: z.enum(['dog', 'cat']),
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

export class FastifyRegisterAnimalForAdoptionController implements Controller {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.id;

    const validationPipe = new ZodValidationPipe<BodySchema>(bodySchema);
    const {
      species,
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
    } = validationPipe.transform(request.body);

    const useCase = container.resolve(RegisterAnimalForAdoptionUseCase);

    const output = await useCase.execute({
      ownerId: userId,
      species,
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
