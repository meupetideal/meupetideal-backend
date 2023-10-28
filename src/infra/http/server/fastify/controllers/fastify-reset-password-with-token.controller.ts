import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';
import { z } from 'zod';

import { Controller } from '@core/infra/controller';
import { ResetPasswordWithTokenUseCase } from '@domain/accounts/application/use-cases/reset-password-with-token.use-case';
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation.pipe';

const bodySchema = z.object({
  token: z.string(),
  password: z.string(),
  passwordConfirmation: z.string(),
});

type BodySchema = z.infer<typeof bodySchema>;

export class FastifyResetPasswordWithTokenController implements Controller {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const validationPipe = new ZodValidationPipe<BodySchema>(bodySchema);
    const { token, password, passwordConfirmation } = validationPipe.transform(
      request.body,
    );

    const useCase = container.resolve(ResetPasswordWithTokenUseCase);

    await useCase.execute({
      token,
      password,
      passwordConfirmation,
    });

    return reply.send();
  }
}
