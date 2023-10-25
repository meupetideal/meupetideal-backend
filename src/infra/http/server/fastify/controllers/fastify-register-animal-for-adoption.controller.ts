import { Controller } from '@core/infra/controller';
import { RegisterAnimalForAdoptionUseCase } from '@domain/adoption/application/use-cases/register-animal-for-adoption.use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpAnimalPresenter } from 'src/infra/http/presenters/http-animal.presenter';
import { container } from 'tsyringe';

export class FastifyRegisterAnimalForAdoptionController implements Controller {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.id;
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
    } = request.body as any;

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
