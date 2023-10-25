import { Controller } from '@core/infra/controller';
import { ResetPasswordWithCurrentPasswordUseCase } from '@domain/accounts/application/use-cases/reset-password-with-current-password.use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';

export class FastifyResetPasswordWithCurrentPasswordController
  implements Controller
{
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.id;
    const { oldPassword, password, passwordConfirmation } = request.body as any;

    const useCase = container.resolve(ResetPasswordWithCurrentPasswordUseCase);

    await useCase.execute({
      userId,
      oldPassword,
      password,
      passwordConfirmation,
    });

    return reply.send();
  }
}
