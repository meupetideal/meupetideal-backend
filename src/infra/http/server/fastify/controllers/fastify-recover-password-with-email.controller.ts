import { Controller } from '@core/infra/controller';
import { RecoverPasswordWithEmailUseCase } from '@domain/accounts/application/use-cases/recover-password-with-email.use-case';
import { FastifyReply, FastifyRequest } from 'fastify';

import { container } from 'tsyringe';

export class FastifyRecoverPasswordWithEmailController implements Controller {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const { email } = request.body as any;

    const useCase = container.resolve(RecoverPasswordWithEmailUseCase);

    const output = await useCase.execute({
      email,
    });

    return reply.send(output);
  }
}
