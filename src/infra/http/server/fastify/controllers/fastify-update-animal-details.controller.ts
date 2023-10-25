import { container } from 'tsyringe';
import { FastifyReply, FastifyRequest } from 'fastify';

import { UpdateAnimalDetailsUseCase } from '@domain/adoption/application/use-cases/update-animal-details.use-case';
import { HttpAnimalPresenter } from 'src/infra/http/presenters/http-animal.presenter';
import { Controller } from '@core/infra/controller';

export class FastifyUpdateAnimalDetailsController implements Controller {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const ownerId = request.user.id;
    const { animalId } = request.params as any;
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
    } = request.body as any;

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
