import { UpdateProfileUseCase } from '@domain/accounts/application/use-cases/update-profile.use-case';
import { FastifyReply, FastifyRequest } from 'fastify';
import { HttpUserPresenter } from 'src/infra/http/presenters/http-user.presenter';
import { container } from 'tsyringe';

export class FastifyUpdateProfileController {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.id;
    const { name, cpf, email, birthday, phoneNumber } = request.body as any;

    const useCase = container.resolve(UpdateProfileUseCase);

    const output = await useCase.execute({
      userId,
      name,
      cpf,
      email,
      birthday: new Date(birthday),
      phoneNumber,
    });

    return reply.send(HttpUserPresenter.toHttp(output.user));
  }
}
