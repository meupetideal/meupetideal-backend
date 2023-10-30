import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { Notification } from '@domain/notifications/enterprise/entities/notification';
import { UseCase } from '@core/application/use-case';
import { inject, injectable } from 'tsyringe';
import { NotificationsRepository } from '../repositories/notifications.repository';

export type SendNotificationInput = {
  recipientId: string;
  title: string;
  redirectToUrl: string;
};

export type SendNotificationOutput = {
  notification: Notification;
};

@injectable()
export class SendNotificationUseCase
  implements UseCase<SendNotificationInput, SendNotificationOutput>
{
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: NotificationsRepository,
  ) {}

  async execute({
    recipientId,
    title,
    redirectToUrl,
  }: SendNotificationInput): Promise<SendNotificationOutput> {
    const notification = Notification.create({
      recipientId: UniqueEntityId.create(recipientId),
      title,
      redirectToUrl,
    });

    await this.notificationsRepository.insert(notification);

    return { notification };
  }
}
