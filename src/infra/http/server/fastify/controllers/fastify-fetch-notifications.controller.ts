import { container } from 'tsyringe';
import { FastifyReply, FastifyRequest } from 'fastify';

import { FetchNotificationsUseCase } from '@domain/notifications/application/use-cases/fetch-notifications.use-case';
import { HttpNotificationPresenter } from 'src/infra/http/presenters/http-notification.presenter';
import { Controller } from '@core/infra/controller';

export class FastifyFetchNotificationsController implements Controller {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.id;
    const { page, perPage } = request.query as any;

    const useCase = container.resolve(FetchNotificationsUseCase);

    const output = await useCase.execute({
      recipientId: userId,
      page: Number(page),
      perPage: Number(perPage),
    });

    return reply.send({
      ...output,

      items: output.items.map((notification) =>
        HttpNotificationPresenter.toHttp(notification),
      ),
    });
  }
}
