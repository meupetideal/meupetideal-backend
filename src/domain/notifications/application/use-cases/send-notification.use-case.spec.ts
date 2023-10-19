import { InMemoryNotificationsRepository } from 'test/repositories/in-memory-notifications.repository';
import { SendNotificationUseCase } from './send-notification.use-case';

describe('SendNotificationUseCase', () => {
  let notificationsRepository: InMemoryNotificationsRepository;
  let sut: SendNotificationUseCase;

  beforeEach(() => {
    notificationsRepository = new InMemoryNotificationsRepository();
    sut = new SendNotificationUseCase(notificationsRepository);
  });

  it('should be able to send a notification', async () => {
    const spyInsert = vi.spyOn(notificationsRepository, 'insert');

    const output = await sut.execute({
      recipientId: '1',
      title: 'Nova notificação',
      redirectToUrl: '/notifications/1',
    });

    expect(output.notification).toBeDefined();
    expect(output.notification.recipientId.toString()).toBe('1');
    expect(output.notification.title).toBe('Nova notificação');
    expect(output.notification.redirectToUrl).toBe('/notifications/1');
    expect(output.notification.sentAt).toBeDefined();
    expect(output.notification.readedAt).toBeNull();

    expect(spyInsert).toHaveBeenCalledWith(output.notification);
  });
});
