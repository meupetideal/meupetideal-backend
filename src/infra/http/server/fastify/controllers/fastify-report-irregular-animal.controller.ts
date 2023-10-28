import { z } from 'zod';
import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';

import { ReportIrregularAnimalUseCase } from '@domain/adoption/application/use-cases/report-irregular-animal.use-case';
import { Controller } from '@core/infra/controller';
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation.pipe';

const bodySchema = z.object({
  reason: z.string(),
});

type BodySchema = z.infer<typeof bodySchema>;

const paramsSchema = z.object({
  animalId: z.string().uuid(),
});

type ParamsSchema = z.infer<typeof paramsSchema>;

export class FastifyReportIrregularAnimalController implements Controller {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.id;

    const paramsValidationPipe = new ZodValidationPipe<ParamsSchema>(
      paramsSchema,
    );
    const { animalId } = paramsValidationPipe.transform(request.params);

    const bodyValidationPipe = new ZodValidationPipe<BodySchema>(bodySchema);
    const { reason } = bodyValidationPipe.transform(request.body);

    const useCase = container.resolve(ReportIrregularAnimalUseCase);

    await useCase.execute({
      reporterId: userId,
      animalId,
      reason,
    });

    return reply.send();
  }
}
