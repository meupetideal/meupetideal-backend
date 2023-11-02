import { z } from 'zod';
import { container } from 'tsyringe';
import { FastifyReply, FastifyRequest } from 'fastify';

import { FetchNotificationsUseCase } from '@domain/notifications/application/use-cases/fetch-notifications.use-case';
import { HttpNotificationPresenter } from 'src/infra/http/presenters/http-notification.presenter';
import { Controller } from '@core/infra/controller';
import { ZodValidationPipe } from 'src/infra/http/pipes/zod-validation.pipe';

const querysSchema = z.object({
  page: z.coerce.number().int().positive(),
  perPage: z.coerce.number().int().positive(),
});

type QuerysSchema = z.infer<typeof querysSchema>;

export class FastifyFetchNotificationsController implements Controller {
  public async handle(request: FastifyRequest, reply: FastifyReply) {
    const userId = request.user.id;

    const validationPipe = new ZodValidationPipe<QuerysSchema>(querysSchema);
    const { page, perPage } = validationPipe.transform(request.query);

    const useCase = container.resolve(FetchNotificationsUseCase);

    const output = await useCase.execute({
      recipientId: userId,
      page,
      perPage,
    });

    return reply.send({
      ...output,

      items: output.items.map((notification) =>
        HttpNotificationPresenter.toHttp(notification),
      ),
    });
  }
}
