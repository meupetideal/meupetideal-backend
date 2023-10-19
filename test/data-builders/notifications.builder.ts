import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { Notification } from '@domain/notifications/enterprise/entities/notification';

export class NotificationBuilder {
  private id: string | undefined;

  private recipientId: string | undefined;

  private title: string = 'Some title';

  private redirectToUrl: string = '/some-url';

  private readedAt: Date | undefined;

  private sentAt: Date | undefined;

  private constructor() {}

  public static create(): NotificationBuilder {
    return new NotificationBuilder();
  }

  public build(): Notification {
    return Notification.create(
      {
        recipientId: UniqueEntityId.create(this.recipientId),
        title: this.title,
        redirectToUrl: this.redirectToUrl,
        readedAt: this.readedAt,
        sentAt: this.sentAt,
      },
      this.id ? UniqueEntityId.create(this.id) : undefined,
    );
  }
}
