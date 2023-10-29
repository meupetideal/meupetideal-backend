import { z } from 'zod';
import { container } from 'tsyringe';
import { FastifyReply, FastifyRequest } from 'fastify';

import { Controller } from '@core/infra/controller';
import { RegisterUserUseCase } from '@domain/accounts/application/use-cases/register-user.use-case';
import { HttpUserPresenter } from 'src/infra/http/presenters/http-user.presenter';
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation.pipe';

const bodySchema = z.object({
  name: z.string(),
  cpf: z.string(),
  email: z.string(),
  password: z.string(),
  birthday: z.coerce.date(),
  phoneNumber: z.string(),
  neighborhood: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
});

type BodySchema = z.infer<typeof bodySchema>;

export class FastifyRegisterUserController implements Controller {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const validationPipe = new ZodValidationPipe<BodySchema>(bodySchema);
    const {
      name,
      cpf,
      email,
      password,
      birthday,
      phoneNumber,
      neighborhood,
      city,
      state,
      country,
    } = validationPipe.transform(request.body);

    const useCase = container.resolve(RegisterUserUseCase);

    const output = await useCase.execute({
      name,
      cpf,
      email,
      password,
      birthday,
      phoneNumber,
      neighborhood,
      city,
      state,
      country,
    });

    return reply.send({
      user: HttpUserPresenter.toHttp(output.user),
    });
  }
}
