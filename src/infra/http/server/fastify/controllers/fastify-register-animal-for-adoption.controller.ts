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
  approximateAge: z.coerce.number().positive(),
  approximateWeight: z.coerce.number().positive(),
  size: z.string(),
  temperaments: z.string().transform((value) => value.split(',')),
  coatColors: z.string().transform((value) => value.split(',')),
  isVaccinated: z.coerce.boolean(),
  isDewormed: z.coerce.boolean(),
  isNeutered: z.coerce.boolean(),
  isSpecialNeeds: z.coerce.boolean(),
  breed: z.string(),
});

type BodySchema = z.infer<typeof bodySchema>;

export class FastifyRegisterAnimalForAdoptionController implements Controller {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.id;
    const parts = request.parts();
    const body = {
      photos: [],
    } as any;

    for await (const part of parts) {
      if (part.type === 'file') {
        body.photos.push({
          fileName: part.filename,
          fileType: part.mimetype,
          body: await part.toBuffer(),
        });
      } else {
        body[part.fieldname] = part.value;
      }
    }

    const validationPipe = new ZodValidationPipe<BodySchema>(bodySchema as any);
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
    } = validationPipe.transform(body);

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
      photos: body.photos,
    });

    return reply.send({ animal: HttpAnimalPresenter.toHttp(output.animal) });
  }
}
