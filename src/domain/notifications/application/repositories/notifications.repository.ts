import { Repository } from '@core/application/repository';
import { Notification } from '@domain/notifications/enterprise/entities/notification';

export abstract class NotificationsRepository extends Repository {
  abstract findById(id: string): Promise<Notification | undefined>;
  abstract insert(entity: Notification): Promise<void>;
  abstract save(entity: Notification): Promise<void>;
}
