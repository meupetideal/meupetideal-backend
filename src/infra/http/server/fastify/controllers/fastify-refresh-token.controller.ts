import { z } from 'zod';
import { Controller } from '@core/infra/controller';
import { FastifyReply, FastifyRequest } from 'fastify';

import { container } from 'tsyringe';
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation.pipe';
import { RefreshTokenUseCase } from '@domain/accounts/application/use-cases/refresh-token.use-case';

const bodySchema = z.object({
  refreshToken: z.string(),
});

type BodySchema = z.infer<typeof bodySchema>;

export class FastifyRefreshTokenController implements Controller {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const validationPipe = new ZodValidationPipe<BodySchema>(bodySchema);
    const { refreshToken } = validationPipe.transform(request.body);

    const useCase = container.resolve(RefreshTokenUseCase);

    const output = await useCase.execute({
      refreshToken,
    });

    return reply.send(output);
  }
}
