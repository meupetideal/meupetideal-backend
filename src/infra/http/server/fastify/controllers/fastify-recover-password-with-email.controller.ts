import { z } from 'zod';
import { container } from 'tsyringe';

import { Controller } from '@core/infra/controller';
import { RecoverPasswordWithEmailUseCase } from '@domain/accounts/application/use-cases/recover-password-with-email.use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation.pipe';

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type BodySchema = z.infer<typeof bodySchema>;

export class FastifyRecoverPasswordWithEmailController implements Controller {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const validationPipe = new ZodValidationPipe<BodySchema>(bodySchema);
    const { email } = validationPipe.transform(request.body);

    const useCase = container.resolve(RecoverPasswordWithEmailUseCase);

    const output = await useCase.execute({
      email,
    });

    return reply.send(output);
  }
}
