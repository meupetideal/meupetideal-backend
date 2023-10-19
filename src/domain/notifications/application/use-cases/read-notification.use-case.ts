import { UseCase } from '@core/application/use-case';
import { NotAllowedError } from '@core/application/errors/not-allowed.error';
import { Notification } from '@domain/notifications/enterprise/entities/notification';
import { NotificationsRepository } from '../repositories/notifications.repository';
import { NotificationNotFoundError } from './errors/notification-not-found.error';

interface Input {
  recipientId: string;
  notificationId: string;
}

type Output = {
  notification: Notification;
};

export class ReadNotificationUseCase implements UseCase<Input, Output> {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute({ recipientId, notificationId }: Input): Promise<Output> {
    const notification =
      await this.notificationsRepository.findById(notificationId);

    if (!notification) {
      throw new NotificationNotFoundError();
    }

    if (recipientId !== notification.recipientId.toString()) {
      throw new NotAllowedError();
    }

    notification.markAsRead();

    await this.notificationsRepository.save(notification);

    return { notification };
  }
}
