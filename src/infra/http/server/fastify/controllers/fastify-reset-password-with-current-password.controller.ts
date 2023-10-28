import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';
import { z } from 'zod';

import { Controller } from '@core/infra/controller';
import { ResetPasswordWithCurrentPasswordUseCase } from '@domain/accounts/application/use-cases/reset-password-with-current-password.use-case';
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation.pipe';

const bodySchema = z.object({
  oldPassword: z.string(),
  password: z.string(),
  passwordConfirmation: z.string(),
});

type BodySchema = z.infer<typeof bodySchema>;

export class FastifyResetPasswordWithCurrentPasswordController
  implements Controller
{
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.id;

    const validationPipe = new ZodValidationPipe<BodySchema>(bodySchema);
    const { oldPassword, password, passwordConfirmation } =
      validationPipe.transform(request.body);

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
