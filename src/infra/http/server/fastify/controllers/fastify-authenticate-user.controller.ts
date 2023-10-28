import { z } from 'zod';
import { Controller } from '@core/infra/controller';
import { AuthenticateUserUseCase } from '@domain/accounts/application/use-cases/authenticate-user.use-case';
import { FastifyReply, FastifyRequest } from 'fastify';

import { container } from 'tsyringe';
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation.pipe';

const bodySchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type BodySchema = z.infer<typeof bodySchema>;

export class FastifyAuthenticateUserController implements Controller {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const validationPipe = new ZodValidationPipe<BodySchema>(bodySchema);
    const { email, password } = validationPipe.transform(request.body);

    const useCase = container.resolve(AuthenticateUserUseCase);

    const output = await useCase.execute({
      email,
      password,
    });

    return reply.send(output);
  }
}
