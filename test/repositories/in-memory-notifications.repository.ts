import { UniqueEntityId } from '@core/enterprise/unique-entity-id.vo';
import { NotificationsRepository } from '@domain/notifications/application/repositories/notifications.repository';
import { Notification } from '@domain/notifications/enterprise/entities/notification';

export class InMemoryNotificationsRepository
  implements NotificationsRepository
{
  items: Notification[] = [];

  public async findById(id: string): Promise<Notification | undefined> {
    return this.items.find((item) => item.id.equals(UniqueEntityId.create(id)));
  }

  public async insert(entity: Notification): Promise<void> {
    this.items.push(entity);
  }

  public async save(entity: Notification): Promise<void> {
    const index = this.items.findIndex((item) => item.id.equals(entity.id));

    this.items[index] = entity;
  }
}
