import { ResetPasswordWithTokenUseCase } from '@domain/accounts/application/use-cases/reset-password-with-token.use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';

export class FastifyResetPasswordWithTokenController {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const { token, password, passwordConfirmation } = request.body as any;

    const useCase = container.resolve(ResetPasswordWithTokenUseCase);

    await useCase.execute({
      token,
      password,
      passwordConfirmation,
    });

    return reply.send();
  }
}
