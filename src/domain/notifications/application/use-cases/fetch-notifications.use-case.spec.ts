import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications.repository';
import { NotificationBuilder } from 'test/data-builders/notifications.builder';
import { FetchNotificationsUseCase } from './fetch-notifications.use-case';

describe('FetchNotificationsUseCase', () => {
  let notificationsRepository: InMemoryNotificationsRepository;

  let sut: FetchNotificationsUseCase;

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();

    sut = new FetchNotificationsUseCase(notificationsRepository);
  });

  it('should be able to list notifications by recipientId', async () => {
    const spySearchByRecipientId = vi.spyOn(
      notificationsRepository,
      'searchByRecipientId',
    );

    const notification = NotificationBuilder.create().build();
    await notificationsRepository.insert(notification);

    const output = await sut.execute({
      recipientId: notification.recipientId.toString(),
      page: 1,
      perPage: 10,
    });

    expect(output.items).toEqual([notification]);
    expect(spySearchByRecipientId).toHaveBeenCalledTimes(1);
  });
});
