import { FastifyReply, FastifyRequest } from 'fastify';
import { container } from 'tsyringe';
import { z } from 'zod';

import { Controller } from '@core/infra/controller';
import { UpdateProfileUseCase } from '@domain/accounts/application/use-cases/update-profile.use-case';
import { HttpUserPresenter } from 'src/infra/http/presenters/http-user.presenter';
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation.pipe';

const bodySchema = z.object({
  name: z.string(),
  cpf: z.string(),
  email: z.string(),
  birthday: z.coerce.date(),
  phoneNumber: z.string(),
});

type BodySchema = z.infer<typeof bodySchema>;

export class FastifyUpdateProfileController implements Controller {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.id;

    const validationPipe = new ZodValidationPipe<BodySchema>(bodySchema);
    const { name, cpf, email, birthday, phoneNumber } =
      validationPipe.transform(request.body);

    const useCase = container.resolve(UpdateProfileUseCase);

    const output = await useCase.execute({
      userId,
      name,
      cpf,
      email,
      birthday,
      phoneNumber,
    });

    return reply.send(HttpUserPresenter.toHttp(output.user));
  }
}
