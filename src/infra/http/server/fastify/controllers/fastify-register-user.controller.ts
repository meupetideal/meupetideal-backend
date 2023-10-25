import { Controller } from '@core/infra/controller';
import { RegisterUserUseCase } from '@domain/accounts/application/use-cases/register-user.use-case';
import { FastifyReply, FastifyRequest } from 'fastify';

import { HttpUserPresenter } from 'src/infra/http/presenters/http-user.presenter';
import { container } from 'tsyringe';

export class FastifyRegisterUserController implements Controller {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const { name, cpf, email, password, birthday, phoneNumber } =
      request.body as any;

    const useCase = container.resolve(RegisterUserUseCase);

    const output = await useCase.execute({
      name,
      cpf,
      email,
      password,
      birthday: new Date(birthday),
      phoneNumber,
    });

    return reply.send({
      user: HttpUserPresenter.toHttp(output.user),
    });
  }
}
