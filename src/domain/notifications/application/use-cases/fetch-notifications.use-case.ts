import { UseCase } from '@core/application/use-case';
import { Notification } from '@domain/notifications/enterprise/entities/notification';
import { SearchOutput } from '@core/application/pagination';
import { inject, injectable } from 'tsyringe';
import { NotificationsRepository } from '../repositories/notifications.repository';

interface Input {
  recipientId: string;
  page: number;
  perPage: number;
}

type Output = SearchOutput<Notification>;

@injectable()
export class FetchNotificationsUseCase implements UseCase<Input, Output> {
  constructor(
    @inject('NotificationsRepository')
    private notificationsRepository: NotificationsRepository,
  ) {}

  async execute({ recipientId, page, perPage }: Input): Promise<Output> {
    const output = await this.notificationsRepository.searchByRecipientId({
      page,
      perPage,
      recipientId,
    });

    return output;
  }
}
