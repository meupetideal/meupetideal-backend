import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { Notification } from '@domain/notifications/enterprise/entities/notification';
import { Prisma, Notification as PrismaNotification } from '@prisma/client';

export class PrismaNotificationMapper {
  static toDomain(raw: PrismaNotification): Notification {
    return Notification.create(
      {
        recipientId: UniqueEntityId.create(raw.recipientId),
        title: raw.title,
        sentAt: raw.sentAt,
        redirectToUrl: raw.redirectToUrl,
        readedAt: raw.readedAt,
      },
      UniqueEntityId.create(raw.id),
    );
  }

  static toPrisma(
    notification: Notification,
  ): Prisma.NotificationUncheckedCreateInput {
    return {
      id: notification.id.value,
      recipientId: notification.recipientId.value,
      title: notification.title,
      sentAt: notification.sentAt,
      redirectToUrl: notification.redirectToUrl,
      readedAt: notification.readedAt,
    };
  }
}
