import { AuthenticateUserUseCase } from '@domain/accounts/application/use-cases/authenticate-user.use-case';
import { FastifyReply, FastifyRequest } from 'fastify';

import { container } from 'tsyringe';

export class FastifyAuthenticateUserController {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const { email, password } = request.body as any;

    const useCase = container.resolve(AuthenticateUserUseCase);

    const output = await useCase.execute({
      email,
      password,
    });

    return reply.send(output);
  }
}
