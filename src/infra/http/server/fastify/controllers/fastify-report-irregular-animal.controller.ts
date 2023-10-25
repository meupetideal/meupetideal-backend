import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';

import { ReportIrregularAnimalUseCase } from '@domain/adoption/application/use-cases/report-irregular-animal.use-case';

export class FastifyReportIrregularAnimalController {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.id;
    const { animalId } = request.params as any;
    const { reason } = request.body as any;

    const useCase = container.resolve(ReportIrregularAnimalUseCase);

    await useCase.execute({
      reporterId: userId,
      animalId,
      reason,
    });

    return reply.send();
  }
}
