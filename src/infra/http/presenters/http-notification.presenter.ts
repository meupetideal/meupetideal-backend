import { Notification } from '@domain/notifications/enterprise/entities/notification';

export class HttpNotificationPresenter {
  static toHttp(notification: Notification) {
    return {
      id: notification.id.value,
      recipientId: notification.recipientId.value,
      title: notification.title,
      redirectToUrl: notification.redirectToUrl,
      sentAt: notification.sentAt,
      readedAt: notification.readedAt,
    };
  }
}
