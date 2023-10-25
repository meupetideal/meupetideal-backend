import { SearchInput, SearchOutput } from '@core/application/pagination';
import { Repository } from '@core/application/repository';
import { Notification } from '@domain/notifications/enterprise/entities/notification';

type SearchByRecipientIdInput = SearchInput & {
  recipientId: string;
};

export abstract class NotificationsRepository extends Repository {
  abstract searchByRecipientId(
    data: SearchByRecipientIdInput,
  ): Promise<SearchOutput<Notification>>;
  abstract findById(id: string): Promise<Notification | undefined>;
  abstract insert(entity: Notification): Promise<void>;
  abstract save(entity: Notification): Promise<void>;
}
